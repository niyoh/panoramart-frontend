/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {Menu, MenuItem, DataTable, TableHeader, Card, CardTitle, CardText, CardActions, IconButton, Button} from 'react-mdl';
import { WithContext as ReactTags } from 'react-tag-input';
import NumericInput from 'react-numeric-input';
import moment from 'moment';
import {DateField, Calendar} from 'react-date-picker';
import s from './styles.css';
import Layout from '../../components/Layout';

class PushNSellPage extends React.Component {

  static propTypes = {
  };

  arrayTagsToReactTags(arrayTags) {
    var tags = [];
    if (typeof arrayTags !== 'undefined') {
      for (var j = 0; j < arrayTags.length; j++) {
        tags.push({'id': j, 'text': arrayTags[j]});
      }
    }

    var obj = <ReactTags
      readOnly
      handleAddition={this.handleAddition}
      handleDelete={this.handleDelete}
      tags={tags}
    />;
    return obj;
  }

  productAttrsToProductUI(productName, productImg) {
    var productCardClass = classNames(s.productCard, 'mdl-card', 'mdl-shadow--2dp');
    var obj = <Card className={productCardClass}>
        <CardTitle className={s.productImage} style={{
                  'background': 'url(' + productImg + ') center / cover'
                  }}>
        </CardTitle>
        <CardText>
          {productName}
        </CardText>
      </Card>;
    return obj;
  }

  discountedPriceToReactNumericInput(productId, discountedPrice) {
    var obj = <NumericInput
      style={{'width':'50px'}}
      value={discountedPrice}
      onChange={this.handleDiscountChange.bind(this)}
    />
    return obj;
  }

  generateProductRows(filter) {
    var productDatabase = JSON.parse(localStorage.productDatabase);
    var rows = [];
    for (var i in productDatabase) {
      var product = productDatabase[i];

      if (typeof filter !== 'undefined' && filter !== null) {
        if (filter.isBefore(moment(product.batchExpiryDate))) {
          continue;
        }
      }

      rows.push({
        id: product.id,
        productList: this.productAttrsToProductUI(product.productName, product.productImg),
        productCategory: this.arrayTagsToReactTags(product.productCategory),
        batchExpiryDate: product.batchExpiryDate,
        batchQuantity: product.batchQuantity,
        retailPrice: product.retailPrice,
        discountedPrice: this.discountedPriceToReactNumericInput(product.id, product.discountedPrice)
      })
    }
    return rows;
  }

  constructor(props, context) {
    super(props, context);

    var productDatabase = [
      {
        id: '00001',
        productName: 'FourSeasons Sausage',
        productImg: 'http://g-search2.alicdn.com/bao/uploaded/i1/TB121bfJXXXXXXKXVXXXXXXXXXX_!!0-item_pic.jpg_240x240q50',
        productCategory: ['meat', 'pork'],
        batchExpiryDate: '2016/11/22',
        batchQuantity: 25,
        retailPrice: 36,
        discountedPrice: 36
      }, {
        id: '00002',
        productName: 'Lay\'s Orig Flavor (43g)',
        productImg: 'http://a.ecimg.tw/pic/v1/data/item/201609/D/B/A/C/0/2/DBAC02-19007HD18000_57c92fb00ae30.jpg',
        productCategory: ['snacks', 'chips'],
        batchExpiryDate: '2016/11/24',
        batchQuantity: 25,
        retailPrice: 36,
        discountedPrice: 36
      }, {
        id: '00003',
        productName: 'IKEA Meatball (1000g)',
        productImg: 'http://i.dailymail.co.uk/i/pix/2013/02/25/article-2284141-1846AE21000005DC-888_634x523.jpg',
        productCategory: ['meat', 'pork'],
        batchExpiryDate: '2016/11/28',
        batchQuantity: 25,
        retailPrice: 36,
        discountedPrice: 36
      }
    ];
    localStorage.productDatabase = JSON.stringify(productDatabase);

    this.state = {
      rows: this.generateProductRows(null)
    }
  }

  handleFilterChange(dateString, {dateMoment, timestamp}) {
    this.setState({rows: this.generateProductRows(dateMoment)});
  }

  handleDiscountChange(valueAsNumber, valueAsString) {}
  
  handlePushSelected() {
    debugger;
    var content = "FourSeasons Sausuage is at 50% discount now! Go get it at Science Park Walmart!";
    fetch(`https://www.hiltiesay.com/backend/gcmDiag?`, {
      method: 'POST',
      body: `content=${content}`
    })
      .then(function(response) {
        if (response.status >= 400) {
          alert('Push failed!');
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(posts) {
        alert('Notification message pushed!');
      })
  }

  handleClick(target) {}

  handleAddition() {}
  handleDelete() {}

  render() {
    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');

    return (
      <Layout className={s.content}>
        <h4>Push & Sell</h4>

        <Card className={cardClass}>
          <CardTitle style={{
              color: '#555',
              height: '176px',
              background: 'url(http://culturainteractive.com/wp-content/uploads/2014/02/sm-banner.jpg) center / cover'
            }}>
          </CardTitle>
          <CardText
            style={{
                'width': '100%',
                'padding': '0'
            }}>

            <div style={{'float':'left', 'padding':'12px'}}>
              <DateField
                forceValidDate
                defaultValue={"2016-11-21"}
                dateFormat="YYYY-MM-DD"
                onChange={this.handleFilterChange.bind(this)}
              />
            </div>

            <div style={{'float':'right', 'paddingTop':'0.5em'}}>
              <Button onClick={this.handlePushSelected.bind(this)} colored>Push Selected</Button>
            </div>

            <DataTable
              className={s.campaignTable}
              sortable
              selectable
              shadow={0}
              rows={this.state.rows}
            >
              <TableHeader numeric name="id">#</TableHeader>
              <TableHeader name="productCategory">Product Tags</TableHeader>
              <TableHeader className={s.productList} name="productList">Product</TableHeader>
              <TableHeader numeric name="batchQuantity">Quantity</TableHeader>
              <TableHeader name="batchExpiryDate">Expiry Date</TableHeader>
              <TableHeader numeric name="retailPrice">Retail $</TableHeader>
              <TableHeader numeric name="discountedPrice">Discounted $</TableHeader>
            </DataTable>
          </CardText>
        </Card>
      </Layout>
    );
  }

}

export default PushNSellPage;

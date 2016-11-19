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
import {Menu, MenuItem, Card, CardTitle, CardText, CardActions, IconButton, Button} from 'react-mdl';
import {RadioGroup, Radio} from 'react-mdl';
import FaTrophy from 'react-icons/lib/fa/trophy';
import {Textfield} from 'react-mdl';
import {DateField, DatePicker, Calendar} from 'react-date-picker';
import { WithContext as ReactTags } from 'react-tag-input';
import s from './styles.css';
import Layout from '../../components/Layout';

class PlaceBidPage extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);

    // query params
    var queryParams = function () {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;
          // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }
      return query_string;
    }();

    // initialize bids if empty
    if (typeof localStorage.bids === 'undefined' || localStorage.bids.length == 0) {
      localStorage.bids = "[]";
    }

    var productCategory = ["beverage", "coffee"];
    var quantity = 10000;
    var supplierName = "Nestle Company Limited";

    this.state = {
      'productCategory': productCategory,
      'quantity': quantity,
      'supplierName': supplierName
    };
  }

  handleClick(target) {}

  handleAddition() {}
  handleDelete() {}

  onProductNameChange(event) { this.setState({ productName: event.target.value }); };
  onSupplierNameChange(event) { this.setState({ supplierName: event.target.value }); };
  onProductDescriptionChange(event) { this.setState({ productDescription: event.target.value }); };
  onUnitPriceChange(event) { this.setState({ unitPrice: event.target.value }); };
  onSlottingFeeChange(event) { this.setState({ slottingFee: event.target.value }); };

  submitBid() {
    var bids = JSON.parse(localStorage.bids);
    bids.push({
      productCategory: this.state.productCategory,
      quantity: this.state.quantity,
      productName: this.state.productName,
      unitPrice: this.state.unitPrice,
      slottingFee: this.state.slottingFee,
      productDescription: this.state.productDescription
    });
    localStorage.bids = JSON.stringify(bids);
  }

  render() {
    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');

    // product category tags
    var productCategoryTags = [];
    for (var i = 0; i < this.state.productCategory.length; i++) {
      productCategoryTags.push({'id': i, 'text': this.state.productCategory[i]});
    }

    // retrieve relevant bids
    var bids = JSON.parse(localStorage.bids);
    var relevantBids = [];
    for (var i = 0; i < bids.length; i++) {
      if (JSON.stringify(this.state.productCategory) == JSON.stringify(bids[i].productCategory)) {
        relevantBids.push(bids[i]);
      }
    }

    // find best deals
    var lowestUnitPrice = 1000000;
    var highestSlottingFee = 0;
    for (var i = 0; i < relevantBids.length; i++) {
      if (isNaN(relevantBids[i].unitPrice) || isNaN(relevantBids[i].slottingFee)) continue;

      lowestUnitPrice = Math.min(lowestUnitPrice, relevantBids[i].unitPrice);
      highestSlottingFee = Math.max(highestSlottingFee, relevantBids[i].slottingFee);
    }

    var unitPriceLabel = "Unit Price (lowest now: $" + lowestUnitPrice + " / item)";
    var slottingFeeLabel = "Slotting Fee (highest now: $" + highestSlottingFee + ")";

    return (
      <Layout className={s.content}>
        <div className={s.menu}>
          <IconButton name="more_vert" id="menu-lower-right" />
          <Menu target="menu-lower-right" valign="bottom" align="right">
            <MenuItem onClick={this.handleClick.bind(this, 'sort_by_likes')}>Sort by likes</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'sort_by_comments')}>Sort by comments</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'sort_by_date')}>Sort by date</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'all_favorites')}>All favorites</MenuItem>
            <MenuItem onClick={this.handleClick.bind(this, 'all_videos')}>All videos</MenuItem>
          </Menu>
        </div>

        <h4>Bid For A Slot</h4>

        <Card className={cardClass}>
          <CardTitle style={{
              color: '#555',
              height: '176px',
              background: 'url(http://culturainteractive.com/wp-content/uploads/2014/02/sm-banner.jpg) center / cover'
            }}>
          </CardTitle>
          <CardText>
            <h4>Walmart wants to buy ...</h4>

            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={productCategoryTags}
            />

            <p></p>
            <p>Quantity: {this.state.quantity}</p>

            <p></p>

            <p><FaTrophy />&nbsp;Current Highest Slotting Fee: ${highestSlottingFee}</p>
            <p><FaTrophy />&nbsp;Current Lowest Unit Price: ${lowestUnitPrice} / item</p>

            <hr />
            <h4>You can supply ...</h4>

            <Textfield
              ref="productName"
              onChange={this.onProductNameChange.bind(this)}
              label="Product Name"
              rows={1}
              style={{'width': '100%'}}
            />

            <Textfield
              ref="supplierName"
              onChange={this.onSupplierNameChange.bind(this)}
              label="Supplier Name"
              rows={1}
              style={{'width': '100%'}}
            />

            <Textfield
              ref="unitPrice"
              onChange={this.onUnitPriceChange.bind(this)}
              label={unitPriceLabel}
              rows={1}
              style={{'width': '35%'}}
            />

            <span>&nbsp;&nbsp;&nbsp;</span>

            <Textfield
              ref="slottingFee"
              onChange={this.onSlottingFeeChange.bind(this)}
              label={slottingFeeLabel}
              rows={1}
              style={{'width': '35%'}}
            />

            <Textfield
              ref="productDescription"
              onChange={this.onProductDescriptionChange.bind(this)}
              label="Product Description / Remarks"
              rows={3}
              style={{'width': '100%'}}
            />

            <p>Privacy</p>
            <div>
              <RadioGroup name="type" value="public" container="ul" childContainer="li">
                <Radio value="">Disclose bid info</Radio>
                <Radio value="">Anonymous</Radio>
              </RadioGroup>
            </div>

            <p></p>
          </CardText>

          <CardActions border>
            <Button onClick={this.submitBid.bind(this)} colored>Save</Button>
            <Button colored>Cancel</Button>
          </CardActions>
        </Card>
      </Layout>
    );
  }

}

export default PlaceBidPage;
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
import { Line } from 'rc-progress';
import classNames from 'classnames';
import {Menu, MenuItem, DataTable, TableHeader, Card, CardTitle, CardText, CardActions, IconButton, Button} from 'react-mdl';
import {Textfield, Dialog, DialogTitle, DialogContent, DialogActions} from 'react-mdl';
import { WithContext as ReactTags } from 'react-tag-input';
import s from './styles.css';
import Layout from '../../components/Layout';
import config from '../../core/config';

class ListBidsPage extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: [],
      rows: []
    };

    var _this = this;
    fetch(`${config.API_ENDPOINT}/bids`)
      .then(function(response) {
        if (response.status >= 400) {
          alert('Retrieval failed!');
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(bids) {
        for (var i in bids) {
          bids[i].productCategory = JSON.parse(bids[i].productCategory);
        }
        _this.setState({'bids': bids});
      });
  }

  handleCreateAuctionDialogOpen() {
    this.setState({'openCreateAuctionDialog': true});
  }

  handleCloseDialog() {
    this.setState({'openCreateAuctionDialog': false});
  }

  handleAddition(newFilterItem) {
    console.log(newFilterItem);
    var filter = this.state.filter;
    filter.push(newFilterItem);

    // update filter & render
    this.setState({'filter': filter});
  }
  handleDelete(removedFilterItem) {
    var filter = this.state.filter;
    filter.splice(removedFilterItem, 1);

    // update filter & render
    this.setState({'filter': filter});
  }
  
  onQuantityChange(event) { this.setState({'quantity': event.target.value}); }

  createAuction() {
    var subject = '[Walmart] Your Slot Bidding Portal';
    var params = 'productCategory=' + encodeURIComponent(JSON.stringify(this.state.filter)) + '&' +
      'quantity=' + this.state.quantity;
    var body = `Dear supplier,\nPlease login through: ${config.WEB_ENDPOINT}/placeBid?' + params +
      '\n\nThanks,\nMerchandising Manager @ Walmart`;
    window.location.href = 'mailto:?body=' + encodeURIComponent(body);
  }

  render() {
    var bids = this.state.bids || [];
    var relevantBids = [];

    // retrieve relevant bids
    var filter = this.state.filter;
    if (filter !== null && filter.length !== 0) {
      for (var i = 0; i < bids.length; i++) {
        if (typeof bids[i].productCategory === 'undefined') continue;

        var matched = 0;
        for (var j = 0; j < bids[i].productCategory.length; j++) {
          for (var k = 0; k < filter.length; k++) {
            if (filter[k] === bids[i].productCategory[j]) {
              matched ++;
            }
          }
        }

        if (matched == filter.length) {
          relevantBids.push(bids[i]);
        }
      }

    } else {
      relevantBids = bids;
    }

    // display relevant bids
    var rows = [];
    var minCost = 1000000, maxCost = 0;
    for (var i = 0; i < relevantBids.length; i++) {
      var tags = [];
      if (typeof relevantBids[i].productCategory !== 'undefined') {
        for (var j = 0; j < relevantBids[i].productCategory.length; j++) {
          tags.push({'id': j, 'text': relevantBids[i].productCategory[j]});
        }
      }

      var cost = relevantBids[i].quantity * relevantBids[i].unitPrice - relevantBids[i].slottingFee;
      minCost = Math.min(minCost, cost);
      maxCost = Math.max(maxCost, cost);

      var row = {
        productName: relevantBids[i].productName,
        supplierName: relevantBids[i].supplierName,
        productDescription: relevantBids[i].productDescription,
        quantity: +relevantBids[i].quantity,
        unitPrice: +relevantBids[i].unitPrice,
        slottingFee: +relevantBids[i].slottingFee,
        productCategory:
          <ReactTags
            readOnly
            placeholder="Add Product Category"
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            tags={tags}
          />,
        cost: cost
      };
      rows.push(row);
    }
    for (var i = 0; i < relevantBids.length; i++) {
      // calculate possible purchase cost
      var cost = rows[i].cost;
      var percent = cost / maxCost * 100;
      if (cost == minCost) {
        rows[i].cost = <Line percent={percent} strokeWidth="25" strokeColor="#22EE22" trailWidth="18" />;
      } else {
        rows[i].cost = <Line percent={percent} strokeWidth="25" strokeColor="#FF0000" trailWidth="18" />;
      }
    }

    // filter tags
    var filterTags = [];
    if (typeof this.state.filter !== 'undefined') {
      for (var i = 0; i < this.state.filter.length; i++) {
        filterTags.push({'id': i, 'text': this.state.filter[i]});
      }
    }

    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');
    return (
      <Layout className={s.content}>
        <div className={s.menu}>
          <IconButton name="more_vert" id="menu-lower-right" />
          <Menu target="menu-lower-right" valign="bottom" align="right">
            <MenuItem onClick={this.handleCreateAuctionDialogOpen.bind(this)}>Create Auction</MenuItem>
          </Menu>
        </div>

        <h4>Auctions & Bids</h4>

        <Card className={cardClass}>
          <CardTitle style={{
              color: '#555',
              height: '176px',
              background: 'url(http://wrightmarshall.co.uk/wp-content/uploads/2014/03/banner_auction1.png) center / cover'
            }}>
          </CardTitle>
          <CardText
            style={{
                'width': '100%',
                'padding': '0'
            }}>

            <p></p>
            <div className={s.filterWrapper}>
              <ReactTags
                className={s.filter}
                placeholder="Add Product Category"
                handleAddition={this.handleAddition.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                tags={filterTags}
              />
            </div>
            <p></p>

            <DataTable
              className={s.bidsTable}
              sortable
              shadow={0}
              rows={rows}
            >
              <TableHeader name="productCategory">Category</TableHeader>
              <TableHeader className={s.productName} name="productName">Product</TableHeader>
              <TableHeader name="supplierName">Supplier</TableHeader>
              <TableHeader numeric name="unitPrice">Unit Price</TableHeader>
              <TableHeader numeric name="slottingFee">Slotting Fee</TableHeader>
              <TableHeader className={s.cost} name="cost">Cost</TableHeader>
            </DataTable>

            <Dialog open={this.state.openCreateAuctionDialog}
              style={{'width':'600px'}}>
              <DialogTitle>Create Auction</DialogTitle>
              <DialogContent>
                <ReactTags
                  readOnly
                  className={s.filter}
                  placeholder="Add Product Category"
                  handleAddition={this.handleAddition.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  tags={filterTags}
                />
                <Textfield
                  onChange={this.onQuantityChange.bind(this)}
                  label="Quantity"
                  rows={1}
                />
              </DialogContent>
              <DialogActions>
                <Button type='button' onClick={this.createAuction.bind(this)}>Create</Button>
                <Button type='button' onClick={this.handleCloseDialog.bind(this)}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </CardText>
        </Card>
      </Layout>
    );
  }

}

export default ListBidsPage;

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
import s from './styles.css';
import Layout from '../../components/Layout';

class ListShoppingBasketsPage extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);

    var productCardClass = classNames(s.productCard, 'mdl-card', 'mdl-shadow--2dp');
    this.state = {
      rows: [
        {
          id: '00001',
          productCategory:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'sausages'
                            }, {
                              'id': 2,
                              'text': 'meatballs'
                            }
                            ]}
            />,
          productList:
            <div style={{'width':'100%','display':'table-row'}}>
              <div style={{'display':'table-cell'}}>
                <Card className={productCardClass}>
                  <CardTitle className={s.productImage} style={{
                  'background': 'url(http://i.dailymail.co.uk/i/pix/2013/02/25/article-2284141-1846AE21000005DC-888_634x523.jpg) center / cover'
                  }}>
                  </CardTitle>
                  <CardText>
                    IKEA Kottbullar 1000g
                  </CardText>
                </Card>
              </div>
              <div style={{'display':'table-cell','padding-left':'12px'}}>
                <Card className={productCardClass}>
                  <CardTitle className={s.productImage} style={{
                  'background': 'url(http://g-search2.alicdn.com/bao/uploaded/i1/TB121bfJXXXXXXKXVXXXXXXXXXX_!!0-item_pic.jpg_240x240q50) center / cover'
                  }}>
                  </CardTitle>
                  <CardText>
                    FourSeas Sausage 200g
                  </CardText>
                </Card>
              </div>
            </div>
        }, {
          id: '00002',
          productCategory:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'snacks'
                            }
                            ]}
            />,
          productList:
            <Card className={productCardClass}>
              <CardTitle className={s.productImage} style={{
                'background': 'url(http://a.ecimg.tw/pic/v1/data/item/201609/D/B/A/C/0/2/DBAC02-19007HD18000_57c92fb00ae30.jpg) center / cover'
                }}>
              </CardTitle>
              <CardText>
                Lay's (OrigFlavor) 43g
              </CardText>
            </Card>
        }
      ]
    };
  }

  handleClick(target) {
  }

  handleAddition() {}
  handleDelete() {}

  render() {
    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');

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

        <h4>Shopping Basket Templates</h4>

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
            <DataTable
              className={s.campaignTable}
              sortable
              selectable
              shadow={0}
              rows={this.state.rows}
            >
              <TableHeader numeric name="id">#</TableHeader>
              <TableHeader name="productCategory">Product Tags</TableHeader>
              <TableHeader className={s.productList} name="productList">Product List</TableHeader>
            </DataTable>
          </CardText>
        </Card>
      </Layout>
    );
  }

}

export default ListShoppingBasketsPage;

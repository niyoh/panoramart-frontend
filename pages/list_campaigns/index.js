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

class CampaignerHomePage extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      rows: [
        {
          id: '00001',
          name: 'Hotpot Gathering',
          type: 'Personal Event',
          recurrence: '(user event)',
          targetCustomerTags:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'hotpot'
                            }, {
                              'id': 2,
                              'text': 'dinner'
                            }
                            ]}
            />,
          suggestedProductCategory:
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
            />
        }, {
          id: '00002',
          name: 'Macau Grand Prix',
          type: 'Public Event',
          recurrence: '2016/11/21',
          targetCustomerTags:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'car'
                            }, {
                              'id': 2,
                              'text': 'racing'
                            }, {
                              'id': 2,
                              'text': 'sports'
                            }]}
            />,
          suggestedProductCategory:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'snacks'
                            }, {
                              'id': 2,
                              'text': 'beer'
                            }
                            ]}
            />
        }, {
          id: '00003',
          name: 'Standard Chartered HK Marathon',
          type: 'Public Event',
          recurrence: '2016/11/23',
          targetCustomerTags:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'running'
                            }, {
                              'id': 2,
                              'text': 'sports'
                            }]}
            />,
          suggestedProductCategory:
            <ReactTags
              readOnly
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              tags={[
                            {
                              'id': 1,
                              'text': 'energy drinks'
                            }, {
                              'id': 2,
                              'text': 'milk'
                            }
                            ]}
            />
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

        <h4>Push Message Campaigns</h4>

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
              <TableHeader className={s.campaignName} name="name">Name</TableHeader>
              <TableHeader name="type">Type</TableHeader>
              <TableHeader name="recurrence">Date</TableHeader>
              <TableHeader name="targetCustomerTags">Customer Tags</TableHeader>
              <TableHeader name="suggestedProductCategory">Product Tags</TableHeader>
            </DataTable>
          </CardText>
        </Card>
      </Layout>
    );
  }

}

export default CampaignerHomePage;

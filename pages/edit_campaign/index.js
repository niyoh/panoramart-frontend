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
import {Textfield} from 'react-mdl';
import {DateField, DatePicker, Calendar} from 'react-date-picker';
import { WithContext as ReactTags } from 'react-tag-input';
import s from './styles.css';
import Layout from '../../components/Layout';

class EditCampaignPage extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      campaign: {
        id: '00002',
        name: 'Macau Grand Prix',
        type: 'Public Event',
        recurrence: '2016/11/21',
        targetCustomerTags:
          <ReactTags
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
      }
    };
  }

  handleClick(target) {
  }

  handleAddition() {}
  handleDelete() {}

  render() {
    var cardClass = classNames(s.card, 'mdl-card', 'mdl-shadow--2dp');
    var messageContent = "Excited about Grand Prix? \nLet Walmart prepare the greatest party for you! \nCheck it out here: http://tinyurl.com/{URL}";

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

        <h4>Edit Campaign</h4>

        <Card className={cardClass}>
          <CardTitle style={{
              color: '#555',
              height: '176px',
              background: 'url(http://culturainteractive.com/wp-content/uploads/2014/02/sm-banner.jpg) center / cover'
            }}>
            {this.state.campaign.name}
          </CardTitle>
          <CardText>
            <p>Type</p>
            <div>
              <RadioGroup name="type" value="public" container="ul" childContainer="li">
                <Radio value="">Public Event</Radio>
                <Radio value="">Personal Event</Radio>
              </RadioGroup>
            </div>

            <p></p>

            <p>Date</p>

            <DateField
              dateFormat="YYYY-MM-DD HH:mm:ss"
              forceValidDate={true}
              defaultValue={1478982406843}
            >
              <DatePicker
                navigation={true}
                locale="en"
                forceValidDate={true}
                highlightWeekends={true}
                highlightToday={true}
                weekNumbers={true}
                weekStartDay={0}
              />
            </DateField>

            <p></p>

            <p>Customer Tags</p>
            {this.state.campaign.targetCustomerTags}

            <p></p>

            <p>Product Tags</p>
            {this.state.campaign.suggestedProductCategory}

            <p></p>

            <p>Message Content</p>
            <Textfield
              label="Message Content"
              value={messageContent}
              rows={3}
              style={{'width': '100%'}}
            />
          </CardText>
          <CardActions border>
            <Button colored>Save</Button>
            <Button colored>Cancel</Button>
          </CardActions>
        </Card>
      </Layout>
    );
  }

}

export default EditCampaignPage;

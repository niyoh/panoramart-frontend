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
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import s from './styles.css';
import Layout from '../../components/Layout';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class EditCalendarPage extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      events: [
        {
          'title': 'Macau Grand Prix',
          'start':new Date(2016, 11-1, 21, 9, 0, 0, 0),
          'end': new Date(2016, 11-1, 21, 19, 0, 0, 0)
        },
        {
          'title': 'Standard Chartered HK Marathon',
          'start': new Date(2016, 11-1, 23, 6, 0, 0, 0),
          'end': new Date(2016, 11-1, 23, 17, 30, 0, 0),
          'desc': 'Most important meal of the day'
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

        <h4>Push Message Campaigns</h4>

        <Card className={cardClass}>
          <CardTitle style={{
              color: '#555',
              height: '176px',
              background: 'url(http://culturainteractive.com/wp-content/uploads/2014/02/sm-banner.jpg) center / cover'
            }}>
            Calendar View
          </CardTitle>
          <CardText
            style={{
                'width': '100%',
                'padding': '0',
                'padding-top': '24px'
            }}>
            <BigCalendar
              style={{'height':'500px', 'right':'50%'}}
              events={this.state.events}
              step={15}
              timeslots={8}
              defaultView='month'
              defaultDate={new Date(2016, 11-1, 11)}
            />
          </CardText>
        </Card>
      </Layout>
    );
  }

}

export default EditCalendarPage;

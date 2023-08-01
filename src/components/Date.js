import React from 'react';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';

const localeIna = require('moment/locale/id');
moment.updateLocale('id', localeIna);

const Date = props => {
  return <TimeAgo style={props.style} time={props.timestamp} />;
};

export default Date;

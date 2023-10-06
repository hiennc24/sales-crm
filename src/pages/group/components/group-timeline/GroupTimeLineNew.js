import React, { useState, useParams } from 'react';
import PropTypes from 'prop-types';

import TypeofPosts from '../../../social/components/new-post/TypeofPosts';
import DetailPosts from '../../../social/components/detail-posts/DetailPosts';
import './GroupTimeLine.scss'

const GroupTimeLineNew = ({ groupId, type }) => {
  return (
    <div style={{ width: '100%' }} className="group-time-line-new">
      <div className='new-post-container-social-new'>
        <TypeofPosts type={type} groupId={groupId} isRemoveTab={true} isGroupEvent={true}/>
      </div>
        <DetailPosts type={type} groupId={groupId} isGroupPage={true}/>
    </div>
  );
};

GroupTimeLineNew.propTypes = {
  groupId: PropTypes.groupId,
  type: PropTypes.type
};

export default GroupTimeLineNew;

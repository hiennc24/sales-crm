import React from 'react';
import emptyPost from '../../../../../../assets/new/empty-data/emptyPost.png'
import emptyTodo from '../../../../../../assets/new/empty-data/emptyData.png'
import emptyEvent from '../../../../../../assets/new/empty-data/emptyEvent.png'
import emptyVote from '../../../../../../assets/new/empty-data/emptyVote.png'
import emptyGroup from '../../../../../../assets/new/empty-data/emptyGroup.png'
import emptyNoti from '../../../../../../assets/new/empty-data/emptyNoti.png'
import emptyMedia from '../../../../../../assets/new/empty-data/emptyMedia.png'
import emptyMediaGroup from '../../../../../../assets/new/empty-data/emptyMediaGroup.png'

const EmptyData = (type) => {
  let emptyData = emptyPost;
  switch (type.type) {
    case 'todo':
      emptyData = emptyTodo;
      break;
    case 'event':
      emptyData = emptyEvent;
      break;
    case 'vote':
      emptyData = emptyVote;
      break;
    case 'group':
      emptyData = emptyGroup;
      break;
    case 'priority':
      emptyData = emptyPost;
      break;
    case 'notification':
      emptyData = emptyNoti;
      break;
    case 'media':
      emptyData = emptyMedia;
      break;
    case 'mediaGroup':
      emptyData = emptyMediaGroup;
      break;
    default:
      break;
  }

  return (
    <div style={{ justifyContent: 'center', display: 'flex', marginTop: 44 }}>
      <img src={emptyData} alt='emptyData' />
    </div>
  )
}

export default EmptyData;
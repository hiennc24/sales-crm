/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import EventImage from '../../../../assets/images/event-image.jpg';
import { Spin } from 'antd';
import eventListIcon from "../../../../assets/images/event-list-icon.svg";
import noData from "../../../../assets/images/no-data.svg";
import apis from "../../../../services/api";
import { getUrlImage } from "../../../../utils";
import "./EventList.scss";
import { useSelector } from "react-redux";
import { selectListPosts } from "../../../../stores/posts/posts.selector";
import { useHistory, useLocation } from "react-router-dom";

const EventList = () => {
  const history = useHistory();
  const posts = useSelector(selectListPosts);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    apis.posts.getListPosts({ groupId: 0, index: 1, pageSize: 20, type: 3 })
      .then(res => {
        setEventList(res.data);
        setLoading(false);
      });
  }, [posts.length, location.key]);

  const handleRoutingToEventList = () => {
    history.push('/event');
  };

  return (
    <div className="event-list">
      <div className="header">
        <img src={eventListIcon} alt="eventList" />
        <h4 style={{ cursor: 'pointer' }} onClick={handleRoutingToEventList}>Các sự kiện mới</h4>
      </div>
      <div className="content">
        {loading ? <Spin /> : <>
          {eventList.length == 0 ?
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><img src={noData} alt="noTask" /></div> :
            eventList.map((event, index) => (
              <div
                key={index}
                className="event-box"
                style={{
                  background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #022F96 100%), url(${event?.Files.length > 0 ? getUrlImage(200, 100, event?.Files[0]?.Files) : EventImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => history.push(`/event/${event.Id}`)}
              >
                {event.Title || event.Content}
              </div>
            ))}
        </>
        }
      </div>
    </div>
  );
};

export default EventList;

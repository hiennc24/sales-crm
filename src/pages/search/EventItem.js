/* eslint-disable react/prop-types */
import { Card, Image, Tooltip, Typography, Row, Col } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom';
import { getUrlImage, Icons } from '../../utils';
import eventImage from "../../assets/images/event-image.jpg";
import moment from 'moment';
import FormatText from './FormatText';
import { IconAccountCircle } from './icon';

const { Title, Text } = Typography;

const EventItem = ({ data, keySearch }) => {
  if (!data) return null;
  const { Details = {} } = data;
  const { Id, FromDate, FromTime, Participants } = Details;
  let CountJoin = 0;
  if (Participants) {
    try {
      let participantsArr = JSON.parse(Participants);
      if (participantsArr) CountJoin = participantsArr.length

    } catch (error) { console.log(error); }
  }

  const formatedTitle = FormatText(Details.Title, keySearch);
  return (
    <Card
      hoverable
      bodyStyle={{ padding: "0px" }}
      className="event-item"
    >
      <NavLink to={`/event/${Id}`}>
        <Row>
          <Col className="avt-group">
            <img
              className="group-avatar"
              draggable={false}
              src={data.Image ? getUrlImage(600, 1000, data.Image) : eventImage}
            />
          </Col>
          <Col className="group-content">
            <Title className='event-title' level={4} style={{ marginBottom: 14, fontSize: 18 }}>{<p dangerouslySetInnerHTML={{ __html: formatedTitle }} />}</Title>
            <div className='event-time'>
              <div className="IconText">
                <Image src={Icons.calendar} preview={false} width={18} height={18} />
                <Text className="IconText__text">{moment(FromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}</Text>
              </div>
              <div className="IconText">
                <Image src={Icons.clock} preview={false} width={18} height={18} />
                <Text className="IconText__text">{moment(FromTime, 'hh:mm:ss').format('hh:mm')}</Text>
              </div>
            </div>
            <div className="IconText">
              <Image src={Icons.group} preview={false} width={18} height={18} />
              <Text className="IconText__text">Tham gia: {CountJoin || 0} người |<IconAccountCircle style={{ margin: "0px", padding: "0px" }} /><IconAccountCircle style={{ margin: " 0px -5px", padding: "0px" }} /><IconAccountCircle style={{ margin: "0px", padding: "0px" }} /></Text>
            </div>
          </Col>
        </Row>
      </NavLink>
    </Card>
  )
}

export default EventItem;
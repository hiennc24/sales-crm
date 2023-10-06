import React from "react";
import PropTypes from "prop-types";
import DetailPost from "../social/components/detail-posts/post/DetailPost";
import { Empty } from "antd";
import emptyIcon from "./img/emptyIcon.png";
import GroupItem from "./GroupItem";
import EventItem from "./EventItem";
import Rectangle340 from '../../assets/images/Rectangle340.svg';

const ResultSearch = ({ dataResult, keySearch }) => {
  if (Array.isArray(dataResult) && dataResult.length)
    return (
      <div>
        {dataResult.map((post, index) => {
          if (typeof post === "object" && !Array.isArray(post)) {
            if (!post.Type) return <GroupItem keySearch={keySearch} key={index} data={post} />;
            if (post.Type == 3) {
              return <EventItem key={index} keySearch={keySearch} data={post} />;
            }
            return (
              <DetailPost
                isSearch={true}
                key={index}
                post={post}
                index={index}
                isGroupPage={false}
              />
            );
          }
          return null;
        })}
      </div>
    );
  if (keySearch && keySearch.trim())
    return (
      <div style={{ marginTop: "50px" }}>
        <Empty
          image={<img src={emptyIcon} alt="emptyIcon" />}
          description="Không thấy bài viết nào"
        />
      </div>
    );
  return <div style={{ marginTop: "50px" }}>
    <Empty
      image={<img src={Rectangle340} alt="" className="w--100 h--80" />}
      description={<div><p style={{ fontSize: "16px", fontWeight: "500" }}>Bạn đang muốn tìm gì?</p></div>}
    />
  </div>
};

ResultSearch.propTypes = {
  dataResult: PropTypes.array,
  keySearch: PropTypes.string,
};

export default ResultSearch;

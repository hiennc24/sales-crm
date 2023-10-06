import React from "react";
import PropTypes from "prop-types";
import { TODO_TYPE } from "../todoData";
import editIcon from "../img/editIcon.png";
import MoreOutlined from "../img/MoreOutlined.png";
import RectangleIcon from "../img/RectangleIcon.png";
import RectangleSmall from "../img/RectangleSmall.png";

const TableTodoItem = ({ data }) => {
  if (!data) return "";
  const { name, type, index } = data;
  return (
    <div className="todo-name">
      {type === TODO_TYPE.SUB ? (
        <span className={`sub-icon ${index ? "lv2" : ""}`}>
          {index ? (
            <img src={RectangleIcon} alt="RectangleIcon" />
          ) : (
            <img src={RectangleSmall} alt="RectangleSmall" />
          )}
        </span>
      ) : (
        <span className="parent-icon">
          <img src={MoreOutlined} alt="MoreOutlined" />
        </span>
      )}
      <span className="task-name">{name}</span>
      <span className="editIcon">
        <img src={editIcon} alt="editIcon" />
      </span>
    </div>
  );
};

TableTodoItem.propTypes = {
  data: PropTypes.object,
};

TableTodoItem.defaultProps = {
  data: {},
};

export default TableTodoItem;

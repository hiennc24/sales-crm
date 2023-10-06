import React from "react";
import PropTypes from "prop-types";

const HeaderListComponent = ({ data }) => {
  const path = "Task 3 > Subtask 2 > Todo list";
  return (
    <div className="header-todo-list">
      <span className="path">{path}</span>
      <span className="amout">6 in Task</span>
    </div>
  );
};

HeaderListComponent.propTypes = {
  data: PropTypes.object,
};

HeaderListComponent.defaultProps = {
  data: {},
};

export default HeaderListComponent;

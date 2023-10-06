import React from "react";
import { Table, Progress, Button } from "antd";
import { TODO_DATA, TODO_LIST_DATA } from "./todoData";
import flagIcon from "./img/flagIcon.png";
import personCIcon from "./img/personCIcon.png";
import TableTodoItem from "./component/TableTodoItem";
import HeaderListComponent from "./component/HeaderListComponent";
import { PlusOutlined } from "@ant-design/icons";
import TodoCard from "./component/TodoCard";
import "./todo.scss";

const Todo = () => {
  const subSelected = 3;
  const parentSelected = 1;

  const columns = [
    {
      title: <b>Nhiệm vụ chính</b>,
      dataIndex: "name",
      render: (text, record) => <TableTodoItem data={record} />,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      align: "center",
      render: (assignee) => <img src={personCIcon} alt="personCIcon" />,
    },
    {
      title: "Timeline",
      dataIndex: "timeline",
      align: "center",
      render: (timeline) => (
        <span>
          {timeline.from} - {timeline.to}
        </span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      align: "center",
      render: (priority) => <img src={flagIcon} alt="flagIcon" />,
    },
    {
      title: "Percentage_done",
      dataIndex: "percen_done",
      align: "center",
      render: (percen_done, record) => (
        <Progress
          type="circle"
          percent={percen_done}
          width={29}
          strokeColor={record.status.COLOR}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return (
          <span
            style={{
              backgroundColor: status.COLOR,
              color: "#fff",
              padding: "3px 6px",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            {status.STATUS}
          </span>
        );
      },
    },
  ];

  return (
    <div className="todo-container">
      <Table
        pagination={false}
        dataSource={TODO_DATA}
        columns={columns}
        rowKey="id"
        rowClassName={(record, index) =>
          record.id === subSelected
            ? "todo-row todo-row-selected sub"
            : record.id === parentSelected
            ? "todo-row todo-row-selected"
            : "todo-row"
        }
      />
      <div className="todo-list">
        <HeaderListComponent />
        {TODO_LIST_DATA.map((item, index) => (
          <TodoCard data={item} key={index} />
        ))}
        <div className="add-todo-area">
          <Button
            type="dashed"
            className="add-todo-btn"
            icon={<PlusOutlined />}
            size="large"
          >
            Thêm checklist mới
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

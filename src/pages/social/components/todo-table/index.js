import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table } from "antd";

const columns = [
  { title: "Title", dataIndex: "Title", key: "Title", fixed: "left", colSpan: 8 },
  { title: "Assignee", dataIndex: "Assignee", key: "Assignee", colSpan: 3 },
  { title: "Timeline", dataIndex: "Timeline", key: "Timeline", colSpan: 4 },
  { title: "Priority", dataIndex: "Priority", key: "Priority", colSpan: 3 },
  {
    title: "Percentage Done",
    dataIndex: "PercentageDone",
    key: "PercentageDone",
    colSpan: 3
  },
  { title: "Status", dataIndex: "Status", key: "Status", colSpan: 3 },

  //   {
  //     title: "Action",
  //     dataIndex: "",
  //     key: "x",
  //     render: () => <a>Delete</a>
  //   }
];

const data = [
  {
    id: 1,
    Title: "Task 1",
    Assignee: "Me",
    Priority: "normal",
    PercentageDone: 50,
    Status: "To do",
    SubTask: [
      {
        id: 12,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
      {
        id: 13,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
      {
        id: 14,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
      {
        id: 15,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
    ],
  },
  {
    id: 2,
    Title: "Task 2",
    Assignee: "Me",
    Priority: "normal",
    PercentageDone: 50,
    Status: "To do",
    SubTask: [
      {
        id: 22,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
      {
        id: 23,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
      {
        id: 24,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
      {
        id: 25,
        Title: "Sub task 1.1",
        Assignee: "Me",
        Priority: "normal",
        PercentageDone: 50,
        Status: "To do",
        SubTask: [],
      },
    ],
  },
];

const TodoTable = (props) => {
  return (
    <Table
      footer={() => <div>ádasd</div>}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <>
            <Table
              showHeader={false}
              columns={columns}
              dataSource={record.SubTask}
              pagination={false}

            //   scroll={{ y: 490 }}
            />
          </>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    //   scroll={{ y: 500 }}

      expandRowByClick
    />
  );
};

export default TodoTable;

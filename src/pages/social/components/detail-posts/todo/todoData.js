import moment from "moment";

export const STATUS = {
  PENDING: {
    STATUS: "Pending",
    COLOR: "#FEA800",
  },
  TODO: {
    STATUS: "Todo",
    COLOR: "#32A1C8",
  },
  DONE: {
    STATUS: "Done",
    COLOR: "#2FCE00",
  },
  FIX: {
    STATUS: "Fix",
    COLOR: "#FF494E",
  },
};

export const TODO_TYPE = {
  SUB: "SUB",
  PARENT: "PARENT",
};

export const TODO_DATA = [
  {
    id: 1,
    name: "Tên task 3",
    assignee: "Leo",
    timeline: {
      from: moment().subtract(1, "day").format("DD/MM/YYYY"),
      to: moment().format("DD/MM/YYYY"),
    },
    priority: true,
    percen_done: 50,
    status: STATUS.TODO,
    sub: [
      {
        name: "Sub task 1",
        assignee: "Leo",
        timeline: {
          from: moment().subtract(1, "day").format("DD/MM/YYYY"),
          to: moment().format("DD/MM/YYYY"),
        },
        priority: true,
        percen_done: 50,
        status: STATUS.FIX,
        type: TODO_TYPE.SUB,
      },
      {
        name: "Sub task 2",
        assignee: "Leo",
        timeline: {
          from: moment().subtract(1, "day").format("DD/MM/YYYY"),
          to: moment().format("DD/MM/YYYY"),
        },
        priority: true,
        percen_done: 100,
        status: STATUS.DONE,
        type: TODO_TYPE.SUB,
      },
      {
        name: "Sub task 3",
        assignee: "Leo",
        timeline: {
          from: moment().subtract(1, "day").format("DD/MM/YYYY"),
          to: moment().format("DD/MM/YYYY"),
        },
        priority: true,
        percen_done: 25,
        status: STATUS.PENDING,
        type: TODO_TYPE.SUB,
      },
    ],
  },
  {
    id: 2,
    name: "Sub task 1",
    assignee: "Leo",
    timeline: {
      from: moment().subtract(1, "day").format("DD/MM/YYYY"),
      to: moment().format("DD/MM/YYYY"),
    },
    priority: true,
    percen_done: 50,
    status: STATUS.FIX,
    type: TODO_TYPE.SUB,
    index: 0,
  },
  {
    id: 3,
    name: "Sub task 2",
    assignee: "Leo",
    timeline: {
      from: moment().subtract(1, "day").format("DD/MM/YYYY"),
      to: moment().format("DD/MM/YYYY"),
    },
    priority: true,
    percen_done: 100,
    status: STATUS.DONE,
    type: TODO_TYPE.SUB,
    index: 1,
  },
  {
    id: 4,
    name: "Sub task 3",
    assignee: "Leo",
    timeline: {
      from: moment().subtract(1, "day").format("DD/MM/YYYY"),
      to: moment().format("DD/MM/YYYY"),
    },
    priority: true,
    percen_done: 25,
    status: STATUS.PENDING,
    type: TODO_TYPE.SUB,
    index: 2,
  },
  {
    id: 5,
    name: "Tên task 8",
    assignee: "Leo",
    timeline: {
      from: moment().subtract(1, "day").format("DD/MM/YYYY"),
      to: moment().format("DD/MM/YYYY"),
    },
    priority: true,
    percen_done: 50,
    status: STATUS.TODO,
    sub: [
      {
        name: "Sub task 1",
        assignee: "Leo",
        timeline: {
          from: moment().subtract(1, "day").format("DD/MM/YYYY"),
          to: moment().format("DD/MM/YYYY"),
        },
        priority: true,
        percen_done: 50,
        status: STATUS.FIX,
        type: TODO_TYPE.SUB,
      },
      {
        name: "Sub task 2",
        assignee: "Leo",
        timeline: {
          from: moment().subtract(1, "day").format("DD/MM/YYYY"),
          to: moment().format("DD/MM/YYYY"),
        },
        priority: true,
        percen_done: 100,
        status: STATUS.DONE,
        type: TODO_TYPE.SUB,
      },
      {
        name: "Sub task 3",
        assignee: "Leo",
        timeline: {
          from: moment().subtract(1, "day").format("DD/MM/YYYY"),
          to: moment().format("DD/MM/YYYY"),
        },
        priority: true,
        percen_done: 25,
        status: STATUS.PENDING,
        type: TODO_TYPE.SUB,
      },
    ],
  },
];

export const TODO_LIST_DATA = [
  {
    type: 1,
    name: "Check list 1",
    rank: "500.000.000đ",
    price: "10.000.000đ",
    time: "23/12/2021",
  },
  {
    type: 2,
    name: "Checklist về ogsm biso24 design giao diện theo mô tả note",
    rank: 4,
    price: "5.000.000đ",
    time: "23/12/2021",
  },
  {
    type: 3,
    name: "Checklist về ogsm biso24 design giao diện theo mô tả note",
    rank: "N/A",
    price: "-",
    time: "23/12/2021",
  },
];

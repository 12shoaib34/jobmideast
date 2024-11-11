import { Tooltip } from "antd";
import React, { Component } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const columns = [
  {
    title: "Permission",
    dataIndex: "permission",
    key: "permission",
    render: (text) => <a>{text}</a>,
    width: 200,
  },
  {
    title: "Main Admin",
    dataIndex: "main",
    key: "main",
    width: 110,
  },
  {
    title: "Admin",
    dataIndex: "admin",
    key: "admin",
    width: 80,
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    width: 80,
  },
];

export const data = [
  {
    key: "1",
    permission: "Edit Main company page",
    main: <FaCheckCircle className="check-icon" />,
    admin: <FaTimesCircle className="cross-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "2",
    permission: "Manage all accounts",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaTimesCircle className="cross-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "3",
    permission: "Invite users",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "4",
    permission: "Manage branch account",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "5",
    permission: "Manage payments",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "6",
    permission: "Contact all team member",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "7",
    permission: "Contact other admins",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaTimesCircle className="cross-icon" />,
  },
  {
    key: "8",
    permission: "Contact branch admin",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaCheckCircle className="check-icon" />,
  },
  {
    key: "9",
    permission: "Post jobs",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaCheckCircle className="check-icon" />,
  },
  {
    key: "10",
    permission: "Contact job seekers",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaCheckCircle className="check-icon" />,
  },
  {
    key: "11",
    permission: "View job seekers note",
    main: <FaCheckCircle className="check-icon" />,

    admin: <FaCheckCircle className="check-icon" />,
    user: <FaCheckCircle className="check-icon" />,
  },
];

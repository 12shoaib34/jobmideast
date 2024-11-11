import React, { useEffect, useState } from "react";

import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { ImCalendar } from "react-icons/im";
import { HiOutlineX } from "react-icons/hi";
import { DatePicker, Divider, Input, Checkbox, Form, Empty, Modal } from "antd";

import moment from "moment";
import Button from "../../shared-ui/Button/Button";
import TaskItem from "../../shared-ui/TaskItem/TaskItem";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { checkDisabledDate, setTimeToZero } from "../../utils/helper";
import { showSuccessMessage, showWarningMessage } from "../../utils/message";
import {
  selectTasks,
  selectCreateTaskSuccess,
  selectUpdateTaskSuccess,
  selectDeleteTaskSuccess,
  selectStatus,
  selectCompletedTaskSuccess,
} from "../../features/dashboard/slice";
import {
  deleteTasks,
  editTask,
  getTasks,
  createTask,
  completeTask,
} from "../../features/dashboard/thunk";

const { TextArea } = Input;

const CTaskList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus);
  const tasks = useAppSelector(selectTasks);
  const taskCreatedSuccess = useAppSelector(selectCreateTaskSuccess);
  const taskUpdateSuccess = useAppSelector(selectUpdateTaskSuccess);
  const taskDeletedSuccess = useAppSelector(selectDeleteTaskSuccess);
  const taskCompletedSuccessfully = useAppSelector(selectCompletedTaskSuccess);
  const [selectedTaskId, setSelectedTaskId] = useState([]);
  const [taskData, setTaskData] = useState({});
  const [showTaskForm, setshowTaskForm] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [tempCompleted, setTempCompleted] = useState(null);
  const [form] = Form.useForm();
  const [selectedCompletedTasks, setSelectedCompletedTasks] = useState([]);
  const [datePickerPopover, setDatePickerPopover] = useState(false);
  var newArrayToHandleSelectdTasksState = [];
  const queryString = require("query-string");

  const { confirm } = Modal;

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    tasks.map((item, index) => {
      if (selectedTaskId.length === 0) {
        newArrayToHandleSelectdTasksState = [];
        setSelectedCompletedTasks([]);
        setTempCompleted(null);
      }
      if (
        item.status === "completed" &&
        selectedTaskId.includes(String(item.id))
      ) {
        setSelectedCompletedTasks(newArrayToHandleSelectdTasksState);
        setTempCompleted("completed");
      }
      if (
        item.status === "Pending" &&
        selectedTaskId.includes(String(item.id))
      ) {
        // all tasks having status pending and matches the selectedTasks with id
        newArrayToHandleSelectdTasksState.push(item.id);
        setSelectedCompletedTasks(newArrayToHandleSelectdTasksState);
        if (selectedTaskId?.length === 1) {
          setTempCompleted(null);
        }
      }
    });
  }, [selectedTaskId]);

  useEffect(() => {
    if (tempCompleted === "completed");
  }, [tempCompleted]);

  useEffect(() => {
    if (
      taskCreatedSuccess === true ||
      taskUpdateSuccess === true ||
      taskDeletedSuccess === true
    ) {
      setshowTaskForm(false);
      dispatch(getTasks());
      if (taskCreatedSuccess === true) {
        showSuccessMessage("Task Created Successfully");
      }
      if (taskUpdateSuccess === true) {
        showSuccessMessage("Task Updated Successfully");
      }
      if (taskDeletedSuccess === true) {
        showSuccessMessage("Task Deleted Successfully");
      }
      // if (taskCompletedSuccessfully === true) {
      //   showSuccessMessage("Selected task completed Successfully");
      // }
    }
  }, [taskCreatedSuccess, taskUpdateSuccess, taskDeletedSuccess]);

  useEffect(() => {
    setTaskData(taskData);
  }, [taskData]);

  useEffect(() => {
    if (selectedTaskId.length === 1) {
      form.resetFields();
      const id = selectedTaskId[0];
      const updateTaskObject = tasks.find((t) => t.id == id);
      if (updateTaskObject.status == "completed") {
        return;
      }

      const deadLine = moment(updateTaskObject.deadLine);
      form.setFieldsValue({ ...updateTaskObject, deadLine });
    }
  }, [selectedTaskId]);

  const deleteTask = () => {
    if (selectedTaskId) {
      const id = selectedTaskId;
      const payload = { id };
      dispatch(deleteTasks({ payload }));
      setSelectedTaskId([]);
    }
  };

  const getTaskForEditFunction = () => {
    if (selectedTaskId.length === 1) {
      const id = selectedTaskId[0];
      const updateTaskObject = tasks.find((t) => t.id == id);
      if (updateTaskObject.status == "completed") {
        return showWarningMessage("Cannot edit completed task");
      }
      const deadLine = moment(updateTaskObject.deadLine);
      form.setFieldsValue({ ...updateTaskObject, deadLine });
      setshowTaskForm(true);
    } else {
      showWarningMessage("only one task can be edited at a time");
      setshowTaskForm(false);
    }
  };

  const completeSelectedTask = () => {
    const arr = selectedCompletedTasks;
    const body = { id: arr };
    dispatch(completeTask({ body }));
  };

  const isComplete = () => {
    if (selectedTaskId.length === 1) {
      const id = selectedTaskId[0];
      const markCompltedTask = tasks.find((t) => t.id == id);
      if (markCompltedTask.status == "completed") {
        return true;
      } else {
        return false;
      }
    }
  };

  const onFinish = (values) => {
    console.log("FINISHED CALLED!!!!");
    if (values.task && values.deadLine) {
      // const deadLine = setTimeToZero(values.deadLine);
      const payload = { ...values, deadLine: values.deadLine };
      if (selectedTaskId.length == 1) {
        const id = selectedTaskId[0];
        const updateTaskObject = tasks.find((t) => t.id == id);
        if (updateTaskObject.status == "completed") {
          return showWarningMessage("Cannot edit completed task");
        }
        const newTask = { id: selectedTaskId[0], task: payload };
        dispatch(editTask(newTask));
        setSelectedTaskId([]);
      } else {
        dispatch(createTask({ payload }));
      }
    } else {
      showWarningMessage("Both fields are required while creating a task");
    }
  };

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete the task?",
      onOk() {
        deleteTask();
      },
    });
  };

  const handleSelectAll = (e) => {
    console.log("FUNCTION CREATING");
    if (e.target.checked) {
      const selectedForDelete = tasks.map((task) => String(task.id));
      setSelectedTaskId(selectedForDelete);
      setDeleteAll(true);
    } else {
      setSelectedTaskId([]);
      setDeleteAll(false);
    }
  };

  return (
    <div className="task-list">
      <div className="task-header">
        <div className="task-header-left">
          {!isLoading && (
            <>
              <Checkbox
                disabled={tasks.length > 0 ? false : true}
                onChange={handleSelectAll}
              />
              <h3 className="task-header-heading">Tasks</h3>
              <Button
                onClick={() => {
                  form.resetFields();
                  setshowTaskForm(true);
                }}
                themecolor="rounded-small"
                className="primary add-task-btn ">
                <PlusOutlined />
                {/* {showTaskForm && <CloseOutlined />} */}
              </Button>
            </>
          )}
        </div>
        {!!tasks.length && (
          <div className="task-header-right">
            {selectedTaskId.length >= 1 ? (
              <>
                {!deleteAll && selectedCompletedTasks?.length === 1 && (
                  <a
                    className="edit"
                    onClick={() => {
                      getTaskForEditFunction();
                    }}>
                    {tempCompleted === "completed" ? null : "Edit"}
                  </a>
                )}
                <a onClick={showConfirm} className="delete">
                  Delete
                </a>
                {selectedCompletedTasks?.length >= 1 ? (
                  <a className="done" onClick={completeSelectedTask}>
                    Complete
                  </a>
                ) : (
                  <a className="completed">Completed</a>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>

      <Divider className="task-list-item-divider" />

      <div className="scroll-task-list">
        {showTaskForm ? (
          <div className="c-task-edit">
            <Form form={form} classname="c-form" onFinish={onFinish}>
              <Form.Item name="task" className="c-text-box">
                <TextArea
                  rows={6}
                  onChange={(e) => setTaskData({ task: e.target.value })}
                  className="w-100 c-text-area"
                  placeholder="This is your task list, edit this text and press save"
                />
              </Form.Item>

              <div className="date-save-div">
                <Form.Item required name="deadLine" className="c-date-picker">
                  <DatePicker
                    getPopupContainer={(node) => node.parentElement}
                    size="small"
                    dropdownClassName="date-picker-class-name"
                    open={datePickerPopover}
                    onOpenChange={() => {
                      setDatePickerPopover(true);
                    }}
                    onChange={() => {
                      setDatePickerPopover(true);
                    }}
                    onOk={() => setDatePickerPopover(false)}
                    style={{ cursor: "pointer" }}
                    suffixIcon={<ImCalendar fontSize="17px" />}
                    className="ant-picker-md"
                    disabledDate={checkDisabledDate}
                    allowClear={false}
                    showToday={true}
                    showTime="true"
                    format="DD-MM-YYYY HH:mm"
                    renderExtraFooter={() => (
                      <button
                        type="button"
                        onClick={() => setDatePickerPopover(false)}
                        className="datePicker-close">
                        <HiOutlineX />
                      </button>
                    )}

                    // showToday
                  />
                </Form.Item>
                <Button
                  loading={isLoading}
                  htmlType="button"
                  themecolor="grey"
                  className="float-right ml-2"
                  onClick={() => setshowTaskForm(false)}>
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  htmlType="submit"
                  themecolor="blue"
                  className="float-right ml-2">
                  Save
                </Button>
              </div>
            </Form>
            <Divider className="task-list-item-divider" />
          </div>
        ) : null}

        {/* {!tasks.length && !isLoading && (
          <Empty
            className="columns-center"
            style={{ fontFamily: "Gordita-Regular", fontSize: "12px" }}
            // image={require("../../assets/images/icons/white-back.svg")}
            imageStyle={{ display: "none" }}
            description={
              "You currently have no tasks. To add a task click on the plus sign."
            }
          />
          // <div className="center">
          //   You currently have no tasks. To add a task click on the plus sign.
          // </div>
        )} */}

        <Form className="c-form tasks-list-wrapper">
          {!isLoading &&
            tasks?.map((task, index) => (
              <TaskItem
                key={index}
                id={task?.id}
                status={task?.status}
                tagName={task?.deadLine}
                taskDescription={task?.task}
                selectedTaskId={selectedTaskId}
                setSelectedTaskId={setSelectedTaskId}
              />
            ))}
        </Form>
      </div>
    </div>
  );
};

export default React.memo(CTaskList);

import React, { useEffect, useState } from "react";

import { Checkbox, Divider } from "antd";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import Tag from "../../shared-ui/Tag/Tag";
import { dayTimeLeftFromNow } from "../../utils/helper";

const TaskItem = ({
  id,
  selectedTaskId,
  setSelectedTaskId,
  status = "complete",
  tagName = "default",
  taskDescription = "failed to load task",
}) => {
  const [TaskExpand, setTaskExpand] = useState(true);
  const [value, setValue] = useState(false);
  const [newSelectedTaskId, setNewSelectedTaskId] = useState(selectedTaskId);
  const [isChecked, setIsChecked] = useState(null);

  const addIDToSelectedArray = (e) => {
    const value = e.target.value;
    if (e.target.checked && !selectedTaskId.includes(id)) {
      // selectedTaskId.push(String(id));
      // console.log("checked butn wrks");
      setSelectedTaskId([...selectedTaskId, String(id)]);
      // setIsChecked(true);
    } else {
      const index = selectedTaskId.indexOf(String(id));

      if (index > -1) {
        const newARR = [...selectedTaskId];
        newARR.splice(index, 1);

        setSelectedTaskId(newARR);
      }
    }
  };

  useEffect(() => {
    setIsChecked(selectedTaskId.includes(`${id}`));
  }, [selectedTaskId]);

  return (
    <>
      <div className="task-div">
        <div className="d-flex desc-section">
          <Checkbox
            checked={isChecked}
            onChange={(e) => {
              addIDToSelectedArray(e);
            }}
          />
          <p
          style={{ whiteSpace: "pre-line" }}
            className={`task-description ${!TaskExpand ? `expanded` : ``}`}
            onClick={() => setTaskExpand(!TaskExpand)}>
            {taskDescription}
          </p>
          {!TaskExpand ? (
            <MdExpandLess
              className="expand"
              onClick={() => setTaskExpand(!TaskExpand)}
            />
          ) : (
            <MdExpandMore
              className="expand"
              onClick={() => setTaskExpand(!TaskExpand)}
            />
          )}
          {TaskExpand && (
            <Tag
              status={status || "default"}
              tagName={
                status === "completed"
                  ? "Completed"
                  : dayTimeLeftFromNow(tagName) || "default"
              }
            />
          )}
        </div>
      </div>

      <Divider className="task-list-item-divider" />
    </>
  );
};

export default TaskItem;

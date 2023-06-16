import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import DragAndDropBoard from "./DragAndDrop";
import TaskDetailModal from "./TaskDetailModal";
import CreateTicketModal from "./Modal";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../DB/firebase";
import "./TaskBoard.css";
import MenuBoard from "./Menu/MenuBoard";

const initialData = {
  tasks: {
    // ...existing tasks
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Blocked",
      taskIds: [], // populate with initial task ids
    },
    "column-2": {
      id: "column-2",
      title: "Backlog",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "In development",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Development done",
      taskIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "Testing",
      taskIds: [],
    },
    "column-6": {
      id: "column-6",
      title: "Ready for production",
      taskIds: [],
    },
  },
  columnOrder: [
    "column-1",
    "column-2",
    "column-3",
    "column-4",
    "column-5",
    "column-6",
  ],
};

const TaskBoard = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTicketSubmit = (formData) => {
    const newTaskId = uuid();
    const newTask = {
      id: newTaskId,
      content: formData.summary,
      type: formData.issueType,
    };

    setData((prevData) => ({
      ...prevData,
      tasks: {
        ...prevData.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...prevData.columns,
        "column-2": {
          ...prevData.columns["column-2"],
          taskIds: [...prevData.columns["column-2"].taskIds, newTaskId],
        },
      },
    }));

    closeModal();
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask(data.tasks[taskId]);
    openModal();
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Tickets"), (snapshot) => {
      let tasks = {};
      let taskIds = [];

      snapshot.docs.forEach((doc) => {
        const taskData = doc.data();
        const taskId = doc.id;
        tasks[taskId] = {
          id: taskId,
          content: taskData.summary,
          type: taskData.issueType,
        };
        taskIds.push(taskId);
      });

      setData((prevData) => ({
        ...prevData,
        tasks,
        columns: {
          ...prevData.columns,
          "column-2": {
            ...prevData.columns["column-2"],
            taskIds,
          },
        },
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <MenuBoard />
      <button type="button" onClick={openModal}>
        Create
      </button>
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTicketSubmit}
      />
      <div className="task-board-container">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <div className="task-column" key={column.id}>
              <h2 className="task-column-title">{column.title}</h2>
              {tasks.map((task) => (
                <div
                  className="task-item"
                  key={task.id}
                  onClick={() => handleTaskClick(task.id)}
                >
                  <div className="task-item-title">{task.content}</div>
                  <div className="task-item-type">{task.type}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TaskBoard;

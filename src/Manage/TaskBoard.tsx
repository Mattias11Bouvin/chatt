import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import TaskDetailModal from "./TaskDetailModal";
import CreateTicketModal from "./Modal";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../DB/firebase";
import "./TaskBoard.css";
import MenuBoard from "./Menu/MenuBoard";

const initialData = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Blocked",
      taskIds: [],
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
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

    closeCreateModal();
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask(data.tasks[taskId]);
    openDetailModal();
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check for valid destination
    if (!destination) return;

    // Check if task was dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the source column for the task
    const sourceColumn = data.columns[source.droppableId];

    // Get the destination column for the task
    const destinationColumn = data.columns[destination.droppableId];

    // Create new arrays for taskIds in the columns
    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);

    // Remove the taskId from the source column
    newSourceTaskIds.splice(source.index, 1);

    // Add the taskId to the new position in the destination column
    newDestinationTaskIds.splice(destination.index, 0, draggableId);

    // Update the data with the new order of taskIds
    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          taskIds: newSourceTaskIds,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          taskIds: newDestinationTaskIds,
        },
      },
    }));
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
      <Link to="/Chat">
          <button>Back</button>
        </Link>
      <button type="button" onClick={openCreateModal}>
        Create
      </button>
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleTicketSubmit}
      />
      {selectedTask && (
        <TaskDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          task={selectedTask}
        />
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-board-container">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId, index) => data.tasks[taskId]
            );

            return (
              <div className="task-column" key={column.id}>
                <h2 className="task-column-title">{column.title}</h2>
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                    <div
                      className="task-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="task-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskClick(task.id)}
                            >
                              <div className="task-item-title">
                                {task.content}
                              </div>
                              <div className="task-item-type">{task.type}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;

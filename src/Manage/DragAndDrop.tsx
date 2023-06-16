import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

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

const DragAndDropBoard = ({ data, setData }) => {
  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      };
      setData(newData);
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = { ...start, taskIds: startTaskIds };

      const endTaskIds = Array.from(end.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEnd = { ...end, taskIds: endTaskIds };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd,
        },
      };
      setData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2>{column.title}</h2>
                {tasks.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {task.content} ({task.type})
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </DragDropContext>
  );
};

export default DragAndDropBoard;

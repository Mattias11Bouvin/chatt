import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd-next";

const DragAndDropBoard = () => {
  const [columns, setColumns] = useState({
    "column-1": {
      name: "Column 1",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      name: "Column 2",
      taskIds: [],
    },
  });

  const tasks = {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
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

    // Get the source and destination column IDs
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    // Get the source and destination column from the state
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];

    // Create a new array of task IDs for the source column without the dragged task
    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    newSourceTaskIds.splice(source.index, 1);

    // Create a new array of task IDs for the destination column with the dragged task
    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
    newDestinationTaskIds.splice(destination.index, 0, draggableId);

    // Update the state with the new column task IDs
    setColumns((prevColumns) => ({
      ...prevColumns,
      [sourceColumnId]: { ...sourceColumn, taskIds: newSourceTaskIds },
      [destinationColumnId]: {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      },
    }));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.keys(columns).map((columnId) => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <div key={columnId} className="task-column">
              <h2>{column.name}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="task-list"
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-item"
                          >
                            {task.content}
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
      </DragDropContext>
    </div>
  );
};

export default DragAndDropBoard;

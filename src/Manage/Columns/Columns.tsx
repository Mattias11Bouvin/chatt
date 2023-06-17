import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Column = ({ tasks, handleTaskClick }) => {
  return tasks.map((task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => handleTaskClick(task.id)}
        >
          <div className="task-item-title">{task.content}</div>
          <div className="task-item-type">{task.type}</div>
        </div>
      )}
    </Draggable>
  ));
};

export default Column;

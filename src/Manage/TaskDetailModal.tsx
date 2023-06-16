import React from "react";
import Modal from 'react-modal';

const TaskDetailModal = ({ isOpen, onClose, task }) => (
  <Modal 
    isOpen={isOpen} 
    onRequestClose={onClose}
    contentLabel="Task Detail Modal"
  >
    <h2>{task.content}</h2>
    <p>Type: {task.type}</p>

    {/* Add any additional task details here */}

    <button onClick={onClose}>Close</button>
  </Modal>
);

export default TaskDetailModal;

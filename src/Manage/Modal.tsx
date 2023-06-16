import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Modal.css";
import { addTicket } from "../DB/Ticket";

const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
  const [project, setProject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [summary, setSummary] = useState("");
  const [components, setComponents] = useState("");
  const [description, setDescription] = useState("");
  const [reporter, setReporter] = useState("");
  const [priority, setPriority] = useState("");
  const [labels, setLabels] = useState("");
  const [attachments, setAttachments] = useState("");
  const [linkedIssues, setLinkedIssues] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [epicLink, setEpicLink] = useState("");
  const [appElement, setAppElement] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      project,
      issueType,
      summary,
      components,
      description,
      reporter,
      priority,
      labels,
      attachments,
      linkedIssues,
      assignedTo,
      epicLink,
    };

    await addTicket(formData); // Använd addTicket funktionen här

    onSubmit(formData);
  };

  useEffect(() => {
    setAppElement(document.getElementById("root")); // Replace "root" with the ID of your root element
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} appElement={appElement}>
      <h2 className="h2">Create JIRA Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="project">Project:</label>
        <select
          id="project"
          name="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value=""> ()</option>
          {/* Add other project options */}
        </select>

        <label htmlFor="issueType">Issue Type:</label>
        <select
          id="issueType"
          name="issueType"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
        >
          <option value="Task">Task</option>
          <option value="Bug">Bug</option>
          <option value="Story">Story</option>
          {/* Add other issue type options */}
        </select>

        <label htmlFor="summary">Summary:</label>
        <input
          type="text"
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <label htmlFor="components">Components:</label>
        <input
          type="text"
          id="components"
          value={components}
          onChange={(e) => setComponents(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="reporter">Reporter:</label>
        <input
          type="text"
          id="reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
        />

        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Minor">Minor</option>
          {/* Add other priority options */}
        </select>

        <label htmlFor="labels">Labels:</label>
        <input
          type="text"
          id="labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
        />

        <label htmlFor="attachments">Attachments:</label>
        <input
          type="file"
          id="attachments"
          value={attachments}
          onChange={(e) => setAttachments(e.target.value)}
        />

        <label htmlFor="linkedIssues">Linked Issues:</label>
        <input
          type="text"
          id="linkedIssues"
          value={linkedIssues}
          onChange={(e) => setLinkedIssues(e.target.value)}
        />

        <label htmlFor="assignedTo">Assigned To:</label>
        <input
          type="text"
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <label htmlFor="epicLink">Epic Link:</label>
        <input
          type="text"
          id="epicLink"
          value={epicLink}
          onChange={(e) => setEpicLink(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
};

export default CreateTicketModal;

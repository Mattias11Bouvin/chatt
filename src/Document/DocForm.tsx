import React from "react";

interface MyFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  newDocument: {
    title: string;
    content: string;
    createdBy: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const MyForm: React.FC<MyFormProps> = ({
  handleSubmit,
  newDocument,
  handleChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newDocument.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Content:
        <textarea
          name="content"
          value={newDocument.content}
          onChange={handleChange}
        />
      </label>
      <label>
        Created By:
        <input
          type="text"
          name="createdBy"
          value={newDocument.createdBy}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Document</button>
    </form>
  );
};

export default MyForm;

import React from "react";

const FaqForm = ({
  onSubmit,
  faq,
  onChange,
  selectedFaq,
  updatedFaq,
  onSubmitUpdate,
  onCancelUpdate,
}) => {
  const isUpdateMode = selectedFaq !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      onSubmitUpdate(e);
    } else {
      onSubmit(e);
    }
  };

  const handleCancel = () => {
    onCancelUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input
          type="text"
          name="Question"
          value={isUpdateMode ? updatedFaq.Question : faq.Question || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Answer:
        <input
          type="text"
          name="Answer"
          value={isUpdateMode ? updatedFaq.Answer : faq.Answer || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="Category"
          value={isUpdateMode ? updatedFaq.Category : faq.Category || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Image:
        <input type="file" name="Image" onChange={onChange} />
      </label>
      <input type="submit" value={isUpdateMode ? "Update" : "Submit"} />
      {isUpdateMode && <button onClick={handleCancel}>Cancel</button>}
    </form>
  );
};

export default FaqForm;

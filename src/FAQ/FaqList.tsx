import React from "react";
import FaqForm from "./FaqForm";

const FaqList = ({
  faqList,
  onDelete,
  onUpdate,
  selectedFaq,
  onSubmitUpdate,
  updatedFaq,
  handleChange,
  onCancelUpdate,
}) => {
  return (
    <ul>
      {faqList.map((faq) => (
        <li key={faq.id}>
          {selectedFaq === faq.id ? (
            <FaqForm
              faq={updatedFaq}
              onSubmit={onSubmitUpdate}
              onChange={handleChange}
              selectedFaq={selectedFaq}
              updatedFaq={updatedFaq}
              onSubmitUpdate={onSubmitUpdate}
              onCancelUpdate={onCancelUpdate}
            />
          ) : (
            <>
              <div>
                <strong>Question:</strong> {faq.Question}
              </div>
              <div>
                <strong>Answer:</strong> {faq.Answer}
              </div>
              <div>
                <strong>Category:</strong> {faq.Category}
              </div>
              <div>
                <strong>Image:</strong> {faq.Image}
              </div>
              <div>
                <button onClick={() => onDelete(faq.id)}>Delete</button>
                <button onClick={() => onUpdate(faq.id, faq)}>Update</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FaqList;

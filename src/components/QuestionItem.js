import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChange(e) {
    const newIndex = parseInt(e.target.value, 10); 

    // Update the correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Update failed');
        }
      })
      .then(data => {
        onUpdate(data);
      })
      .catch(err => {
        console.error('Could not reach server:', err);
      });
  }
  function handleDelete() {
    onDelete(id); // Notify parent component to delete the question
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex}
         onChange={handleChange}>
          {options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

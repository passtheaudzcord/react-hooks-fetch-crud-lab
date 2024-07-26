import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const url = "https://localhost:4000/questions";
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

useEffect(() => {
  fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error("GET request failed ;(")
    }
  })
  .then((data) => setQuestions(data))
  .catch((err) => console.error("Could not reach server"))
}, [])

const handleDeleteQuestion = (id) => {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (res.ok) {
        setQuestions(questions.filter(question => question.id !== id));
      } else {
        throw new Error('Delete request failed');
      }
    })
    .catch(err => console.error('Could not reach server:', err));
};

const handleUpdateQuestion = (updateQuestion) => {
  setQuestions(questions.map(question =>
    question.id === updateQuestion.id ? updateQuestion : question
  ));
};

const handleAddQuestion = (newQuestion) => {
  setQuestions([...questions, newQuestion]);
};


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={handleDeleteQuestion} onUpdate={handleUpdateQuestion} />
      )}
    </main>
  );
}

export default App;

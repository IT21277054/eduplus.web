import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Checkbox } from '@mui/material';

interface QuizFormProps {
  courseId: string;
}

interface Question {
  text: string;
  answers: string[];
  correct: boolean[];
}

const QuizForm: React.FC<QuizFormProps> = ({ courseId }) => {
  const [quizId, setQuizId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{ text: '', answers: ['', ''], correct: [false, false] }]);

  const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(">>>>>>>>>onchange", e, index)
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectChange = (questionIndex: number, answerIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correct[answerIndex] = checked;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', answers: ['', ''], correct: [false, false] }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8085/api/quiz/course/${courseId}`, {
        quizId,
        title,
        description,
        questions: questions.map(question => ({
          text: question.text,
          answers: question.answers,
          correct: question.correct,
        })),
      });
      console.log(response.data); // Log success message or handle appropriately
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Quiz ID"
        variant="outlined"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <Typography variant="h6">Question {questionIndex + 1}</Typography>
          <TextField
            label="Question Text"
            variant="outlined"
            value={question.text}
            //onChange={(e) => handleQuestionChange(questionIndex, e)}
            fullWidth
            margin="normal"
          />
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <TextField
                label={`Answer ${answerIndex + 1}`}
                variant="outlined"
                value={answer}
                //onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                fullWidth
                margin="normal"
              />
              <Checkbox
                checked={question.correct[answerIndex]}
                onChange={(e) => handleCorrectChange(questionIndex, answerIndex, e)}
                color="primary"
              />
              <Typography variant="body2">{question.correct[answerIndex] ? 'Correct' : 'Incorrect'}</Typography>
            </div>
          ))}
        </div>
      ))}
      <Button onClick={addQuestion} variant="contained" color="secondary">
        Add Question
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Add Quiz
      </Button>
    </form>
  );
};

export default QuizForm;

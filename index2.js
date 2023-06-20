const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 8989;

let questions = [];
let currentQuestion;

function readCSVFile() {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream('GeneralKnowledge.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log('CSV file successfully processed.');
        console.log(results);
        resolve(results);
      })
      .on('error', reject);
  });
}

async function populateQuestions() {
  try {
    const csvData = await readCSVFile();
    questions = csvData.map((data) => ({
      question: data['question'],
      answer: data['answer']
    }));
    console.log('Questions populated:', questions);
    currentQuestion = getRandomQuestion();
    console.log('Current question:', currentQuestion);
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
}

function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

app.use(async (req, res, next) => {
  if (questions.length === 0) {
    await populateQuestions();
  }
  next();
});

app.get('/', (req, res) => {
  if (questions.length === 0) {
    res.send('No questions available.');
    return;
  }

  const questionText = currentQuestion.question;
  res.send(`
    <h1>${questionText}</h1>
    <form action="/answer" method="POST">
      <input type="text" name="userAnswer" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/answer', express.urlencoded({ extended: true }), (req, res) => {
  const userAnswer = req.body.userAnswer;
  const correctAnswer = currentQuestion.answer;

  if (userAnswer === correctAnswer) {
    res.redirect('/site');
  } else {
    currentQuestion = getRandomQuestion();
    const questionText = currentQuestion.question;
    res.send(`
      <h1>${questionText}</h1>
      <form action="/answer" method="POST">
        <input type="text" name="userAnswer" required>
        <button type="submit">Submit</button>
      </form>
      <p>Incorrect answer. Try again.</p>
    `);
  }
});

app.get('/site', (req, res) => {
  res.send('Welcome to the site!');
});

populateQuestions().then(() => {
  app.listen(port, () => {
    console.log('Server up and running.');
  });
});

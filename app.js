// Load questions from JSON
let questions = [];
fetch('data/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    populateTopics();
  });

function populateTopics() {
  const topics = [...new Set(questions.map(q => q.topic))];
  const topicSelect = document.getElementById('topic');
  topics.forEach(t => {
    const option = document.createElement('option');
    option.value = t;
    option.textContent = t;
    topicSelect.appendChild(option);
  });
  topicSelect.addEventListener('change', () => showQuestion(topicSelect.value));
}

function showQuestion(topic) {
  const q = questions.find(q => q.topic === topic);
  document.getElementById('question').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(q, i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(q, i) {
  const feedback = document.getElementById('feedback');
  if (i === q.answerIndex) {
    feedback.textContent = "✅ Correct! " + q.explanation;
  } else {
    feedback.textContent = "❌ Incorrect. " + q.explanation;
  }
}

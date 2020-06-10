google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Fetches codeforces ratings data and uses it to create a chart. */
function drawChart() {
  fetch('/codeforces-ratings').then(response => response.json())
  .then((ratings) => {
    console.log(ratings);

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Contest');
    data.addColumn('number', 'Ratings');
    Object.keys(ratings).forEach((contest_number) => {
      data.addRow([contest_number, ratings[contest_number]]);
    });

    const options = {
      'title': 'Codeforces Ratings',
      'width':800,
      'height':500
    };

    const chart = new google.visualization.LineChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}


function addRandomFact() {
  const greetings =
      ['I either binge watch a web series or do not watch them at all', 'I am a Grammar Nazi', 'I have a weird obsession for candy crush', 'My all time favourite book series is Harry Potter'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}




/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}


function getcomments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('history');
    comments.forEach((comment) => {
      commentListElement.appendChild(createTaskElement(comment));
    })
  });
}

/** Creates an element that represents a comment including its delete button. */
function createTaskElement(comment) {
  const taskElement = document.createElement('li');
  taskElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.title;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(comment);

    // Remove the comment from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

/** Tells the server to delete the comment. */
function deleteTask(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}


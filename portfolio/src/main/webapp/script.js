// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


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

/** Creates an element that represents a task, including its delete button. */
function createTaskElement(comment) {
  const taskElement = document.createElement('li');
  taskElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.title;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(comment);

    // Remove the task from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

/** Tells the server to delete the task. */
function deleteTask(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}


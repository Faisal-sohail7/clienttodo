const BACKEND_ROOT_URL = 'http://127.0.0.1:10000';
import { Todos } from './class/Todos.js';

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = true

const renderTask = (task) => {
  const li = document.createElement('li')
  li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center')
  
  const span = document.createElement('span')
  span.innerHTML = task.getText()
  
  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm')
  deleteBtn.innerHTML = 'Delete'
  deleteBtn.addEventListener('click', () => {
    todos.removeTask(task.getId()).then(() => {
      li.remove()
    }).catch((error) => {
      alert('Error deleting task: ' + error)
    })
  })
  
  li.append(span)
  li.append(deleteBtn)
  list.append(li)
}

const getTasks = () => {
  console.log("Getting tasks");
  todos.getTasks().then((tasks) => {
    console.log("Rendering tasks");
    tasks.forEach(task => {
      renderTask(task)
    });
    console.log("Rednered tasks");
    input.disabled = false
  }).catch((error) => {
    console.log(error)
  })
}

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    const task = input.value.trim()
    if (task !== '') {
      todos.addTask(task).then((task) => {
        renderTask(task)
        input.value = ''
        input.focus()
      })
    }
  }
})

getTasks()
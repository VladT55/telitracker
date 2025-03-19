let form_value = document.querySelector("#task-input");
let button_add = document.querySelector("#button-add");
let task_list = document.querySelector(".to-do-list");
let done_task = document.querySelector(".tasks-done-list");
let form = document.querySelector("#add-task");
let copy_task;

function add_task() {
  button_add.addEventListener("click", () => {
    if (form_value.value.trim()) {
      let new_task = add_block_task();
      let task_text = document.createElement("p");
      task_text.classList.add("task-text");
      task_text.textContent = form_value.value;
      new_task.appendChild(task_text);
      add_button_done(new_task);
      add_button_del(new_task);
      form_value.value = "";
    }
  });
}

// Добавление блока куда добавляется текст задачи и кнопки
function add_block_task() {
  let new_task = document.createElement("div");
  new_task.classList.add("task-item");
  task_list.appendChild(new_task);
  return new_task;
}

// Добавление кнопки и удаления задачи
function add_button_del(task_element) {
  if (task_element) {
    let button_del = document.createElement("button");
    button_del.classList.add("button_delet");
    task_element.appendChild(button_del);

    button_del.addEventListener("click", () => {
      task_element.remove();
      save_tasks();
    });
  }
}

// Добавление кнопки и перенос в список выполнено
function add_button_done(task_element) {
  let button_done = document.createElement("button");
  button_done.classList.add("button_done");
  task_element.appendChild(button_done);

  // Копирование элементов и удаление/добавление кнопки
  button_done.addEventListener("click", () => {
    copy_task = task_element.cloneNode(true);
    let remove_button_done = copy_task.querySelector(".button_done");
    let remove_button_del = copy_task.querySelector(".button_delet");
    if (remove_button_done && remove_button_del) {
      remove_button_done.remove();
      remove_button_del.remove();
    }
    add_button_del(copy_task);
    done_task.appendChild(copy_task);
    task_element.remove();
    save_tasks();
  });
}

// Функция для сохранения задача в localStorage
function save_tasks() {
  let tasks = [];

  // Задача из списка задач
  task_list.querySelectorAll(".task-item").forEach((task) => {
    tasks.push({
      text: task.querySelector(".task-text").textContent,
      completed: false,
    });
  });

  // Задачи из списка выполнены
  done_task.querySelectorAll(".task-item").forEach((task) => {
    tasks.push({
      text: task.querySelector(".task-text").textContent,
      completed: true,
    });
  });

  // Сохраняем в задаче в localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    if (task.completed) {
      // Добавляем в задачу в списко выполненных
      addTaskToDoneList(task.text);
    } else {
      // Добавляем задачу в список задач
      addTaskToDoList(task.text);
    }
  });
}

// Добавление в список текущий
function addTaskToDoList(text) {
  let new_task = add_block_task();
  let task_text = document.createElement("p");
  task_text.classList.add("task-text");
  task_text.textContent = text;
  new_task.appendChild(task_text);
  add_button_done(new_task);
  add_button_del(new_task);
}

// Добавление в список выполненных
function addTaskToDoneList(text) {
  let new_task = add_block_task();
  let task_text = document.createElement("p");
  task_text.classList.add("task-text");
  task_text.textContent = text;
  new_task.appendChild(task_text);
  add_button_del(new_task);
  done_task.appendChild(new_task);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  add_task();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    add_task();
  });
});

const getToDos = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();
  drawTodos(data);
};
getToDos();

const todosTemplate = document.getElementById("todos");
const drawTodos = (todos) => {
  if (!todos.length) {
    return (todosTemplate.innerHTML = `<p>У вас нет todo!</p>`);
  }
  todos.map((item) => {
    const checked = item.isDone ? "checked" : ""; //todo_task_complete
    todosTemplate.innerHTML += `
    <div class="todo_task ${item.isDone ? "todo_task_complete" : ""}">
        ${
          !checked
            ? `<label class="todo_checkbox">
            <input type="checkbox" onclick="completeTodo(${item.id})" ${checked}/>
            <div></div>
        </label>`
            : ""
        }
        
        <div class="todos_item">

        ${item.title}

        </div>
        <input class="input_edit" />

        ${
          !checked
            ? `<button class="btn_todo_edit" onclick="editTodo(${item.id})">
							    <img src="./img/edit.png" width="18" height="18">
              </button>`
            : ""
        }
        <button  class="btn_todo_save" onclick="saveTodo(${item.id})">
							Save
				</button>
        <button  id="btn_todo_del" onclick="deleteTodo(${item.id})">
							<img src="./img/del.svg" width="18" height="18">
				</button>
    </div>
    `;
  });
};

//Изменение input
const editTodo = (id) => {
  const inputEdit = document.getElementsByClassName("input_edit")[id - 1];
  const textItem = document.getElementsByClassName("todos_item")[id - 1];
  const btnSave = document.getElementsByClassName("btn_todo_save")[id - 1];
  const btnEdit = document.getElementsByClassName("btn_todo_edit")[id - 1];

  btnEdit.style.display = "none";
  btnSave.style.display = "block";
  inputEdit.style.display = "block";
  textItem.style.display = "none";

  inputEdit.value = textItem.textContent.trim();
};

//Редактирование
const saveTodo = async (id) => {
  const editTodo = document.getElementsByClassName("input_edit")[id - 1];

  const todo = {
    title: editTodo.value,
    isDone: false,
  };
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

//Удаление
const deleteTodo = async (id) => {
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

//check
const completeTodo = async (id) => {
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isDone: true,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

//Добавление
const btnTodo = document.getElementById("btn_todo");
btnTodo.onclick = async () => {
  const inputTodo = document.getElementById("input_todo");

  if (!inputTodo.value) {
    return alert("Вы ничего не ввели");
  }
  const todo = {
    title: inputTodo.value,
    isDone: false,
  };
  await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8", // с этим будет работать
    },
  });
};

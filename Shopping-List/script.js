const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")
const alert = document.querySelector(".alert")
//functions
const addToDo = (event) => {
    //prevents form from submitting
    event.preventDefault()
    //empty strings are falsie
    if (!todoInput.value) {

        alert.innerText = "Please enter a valid input"
        alert.classList.add("error")
        alert.style.visibility = "visible"
        setTimeout(() => {
            alert.style.visibility = "hiddden"
            alert.classList.remove = "alert"
        }, 2000); 

    } else {
        
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo-div")

    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    saveLocalTodo(todoInput.value)

    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>"
    deleteButton.classList.add("delete-btn")
    todoDiv.appendChild(deleteButton)

    todoList.appendChild(todoDiv)

    todoInput.value = ""

    alert.innerText = "Item successfully added!"
        alert.classList.add("success")
        alert.style.visibility = "visible"
        setTimeout(() => {
            alert.style.visibility = "hiddden"
            alert.classList.remove = "success"
        }, 2000); 

    }

}

const deleteComplete = (event) => {
    const item = event.target;
    if (item.classList.contains("delete-btn")) {
        const todo =item.parentElement;
        todo.classList.add("fall")
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    } else if (item.classList.contains("completed-btn")) {
        const todo =item.parentElement;
        todo.classList.toggle("completed")
    }
}

const filterTodo = (event) => {
    const todos = todoList.childNodes; //All divs in ul
    todos.forEach(todo => {
        switch (event.target.value) {
            case ("all"):
                todo.style.display = "flex";
                break;
            case ("completed"):
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case ("uncompleted"): 
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

const saveLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo-div")

        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)


        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("completed-btn")
        todoDiv.appendChild(completedButton)

        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>"
        deleteButton.classList.add("delete-btn")
        todoDiv.appendChild(deleteButton)

        todoList.appendChild(todoDiv)
    })
}

const removeLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const text = todo.children[0].innerText
    const index = todos.indexOf(text) 
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}


//event-listeners

todoButton.addEventListener("click", addToDo)
todoList.addEventListener("click", deleteComplete)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)
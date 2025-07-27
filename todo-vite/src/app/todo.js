let todos = loadTodos();

export function addTodo(text) {
  const todo = {
    id: Date.now(),
    text,
    completed: false
  };
  todos.push(todo);
  saveTodos();
  return todo;
}

export function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
}

export function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
}

export function getTodos(filter = "all") {
  switch (filter) {
    case "active":
      return todos.filter(t => !t.completed);
    case "completed":
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
}

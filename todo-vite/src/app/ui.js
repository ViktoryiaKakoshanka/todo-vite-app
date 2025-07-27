import { addTodo, removeTodo, toggleTodo, getTodos } from "./todo.js";
import { createTodoElement } from "./dom.js";

let currentFilter = "all";

export function initUI() {
  const form = document.querySelector("#todo-form");
  const input = document.querySelector("#todo-input");
  const list = document.querySelector("#todo-list");
  const filterButtons = document.querySelectorAll("[data-filter]");

  function render() {
    list.innerHTML = "";
    getTodos(currentFilter).forEach(todo => {
      const li = createTodoElement(todo, {
        onDelete: handleDelete,
        onToggle: handleToggle
      });
      list.appendChild(li);
    });
  }

  function handleDelete(id) {
    removeTodo(id);
    render();
  }

  function handleToggle(id) {
    toggleTodo(id);
    render();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = "";
      render();
    }
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  render();
}

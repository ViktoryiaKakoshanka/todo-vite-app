export function createTodoElement(todo, { onDelete, onToggle }) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const label = document.createElement("span");
  label.textContent = todo.text;
  if (todo.completed) label.classList.add("text-decoration-line-through");

  label.style.cursor = "pointer";
  label.addEventListener("click", () => onToggle(todo.id));

  const btn = document.createElement("button");
  btn.className = "btn btn-sm btn-danger";
  btn.textContent = "Delete";
  btn.addEventListener("click", () => onDelete(todo.id));

  li.appendChild(label);
  li.appendChild(btn);

  return li;
}

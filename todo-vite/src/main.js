$(document).ready(function () {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let filter = "all";

  function saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderList() {
    $("#todo-list").empty();

    const filtered = todos.filter(todo =>
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.done
        : !todo.done
    );

    filtered.forEach((todo, index) => {
      const li = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="${todo.done ? 'completed' : ''}">${todo.text}</span>
          <div>
            <button class="btn btn-sm btn-success me-2 toggle-btn">✔</button>
            <button class="btn btn-sm btn-danger delete-btn">✖</button>
          </div>
        </li>
      `);

      li.find(".toggle-btn").on("click", () => {
        todos[index].done = !todos[index].done;
        saveToStorage();
        renderList();
      });

      li.find(".delete-btn").on("click", () => {
        todos.splice(index, 1);
        saveToStorage();
        renderList();
      });

      $("#todo-list").append(li);
    });
  }

  $("#add-btn").on("click", () => {
    const text = $("#todo-input").val().trim();
    if (!text) return;

    todos.push({ text, done: false });
    saveToStorage();
    $("#todo-input").val("");
    renderList();
  });

  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    filter = $(this).data("filter");
    renderList();
  });

  renderList();
});

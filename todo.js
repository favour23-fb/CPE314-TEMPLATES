let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach(function(taskObj, index) {
        let li = document.createElement("li");
        if (taskObj.completed) {
            li.classList.add("completed");
        }

        let span = document.createElement("span");
        span.textContent = taskObj.text;
        span.addEventListener("click", function() {
            toggleComplete(index);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("task");
    let task = input.value;
    if (task) {
        tasks.push({ text: task, completed: false });
        saveTasks();
        renderTasks();
        input.value = "";
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();

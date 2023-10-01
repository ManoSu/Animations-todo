// Retrieve tasks from local storage on page load
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${i})">
            <span>${task.text} (Deadline: ${task.deadline})</span>
            <button class="delete" onclick="deleteTask(${i})">Delete</button>
            <button class="edit" onclick="editTask(${i})">Edit</button>
        `;
        li.className = task.completed ? 'completed' : '';
        taskList.appendChild(li);
    }
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const text = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (text === '') {
        alert('Please enter a task.');
        return;
    }

    const newTask = { text, deadline, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    deadlineInput.value = '';
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to edit a task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Initial render
renderTasks();

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Fetch tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks in the UI
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = { text: taskText };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = ''; // Clear the input
        renderTasks(); // Update the task list
    } else {
        alert('Please enter a task');
    }
}

// Edit a task
function editTask(index) {
    const updatedText = prompt('Edit Task:', tasks[index].text);
    if (updatedText !== null) {
        tasks[index].text = updatedText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();
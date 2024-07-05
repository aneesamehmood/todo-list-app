document.addEventListener('DOMContentLoaded', function() { // It runs only after the HTML doc has been loaded and parsed.
    // Selecting elements from the HTML doc by their IDs
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    // Add event listener to the form to handle task submission
    taskForm.addEventListener('submit', function(e) {
        // Prevent the default form submission behavior (refreshing the page)
        e.preventDefault();

        // Get the value from the input field
        const task = taskInput.value;

        // Add the task to the list if it's not empty
        if (task !== '') {
            addTask(task);
            // Clear the input field after adding the task
            taskInput.value = '';
            saveTask(task);
        }
    });

    // Function to add a task to the list
    function addTask(task) {
        // Create a new list item (li) element
        const li = document.createElement('li');

        // Set the text content of the list item to the task
        li.textContent = task;

        // Create a delete button for the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'; // Sets the text of the button to "Delete"

        // Add an event listener to the delete button to remove the task when clicked
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTask(task);
        });

        // Append the delete button to the list item
        li.appendChild(deleteButton);

        // Append the list item to the task list
        taskList.appendChild(li);
    }

    function saveTask(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task) {
            addTask(task);
        });
    }

    function removeTask(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

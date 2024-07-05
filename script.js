document.addEventListener('DOMContentLoaded', function() { // It runs only after the HTML doc has been loaded and parsed.
    // Selecting elements from the HTML doc by their IDs
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskPriority = document.getElementById('task-priority');
    const taskCategory = document.getElementById('task-category');

    loadTasks();

    // Add event listener to the form to handle task submission
    taskForm.addEventListener('submit', function(e) {
        // Prevent the default form submission behavior (refreshing the page)
        e.preventDefault();

        // Get the value from the input field
        const task = taskInput.value;
        const category = taskCategory.value;
        const priority = taskPriority.value;

        // Add the task to the list if it's not empty
        if (task !== '') {
            addTask(task, category, priority);
            // Clear the input field after adding the task
            taskInput.value = '';
            saveTask(task, category, priority);
        }
    });

    // Function to add a task to the list
    function addTask(task, category, priority) {
        // Create a new list item (li) element
        const li = document.createElement('li');
        li.classList.add(priority.toLowerCase());

        const taskContainer = document.createElement('div'); // Container for task text
        taskContainer.classList.add('task-container');

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const categorySpan = document.createElement('span');
        categorySpan.textContent = ` [${category}]`;
        categorySpan.classList.add('category-span');

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = ` [${priority}]`;
        prioritySpan.classList.add('priority-span');

        li.appendChild(taskText);
        li.appendChild(categorySpan);
        li.appendChild(prioritySpan);

        li.appendChild(taskContainer);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTask(task, category, priority);
        });

        li.appendChild(deleteButton);

        insertTaskInOrder(li, priority.toLowerCase());
    }

    function insertTaskInOrder(taskElement, priority) {
        const items = taskList.children;
        let inserted = false;
        for (let i = 0; i < items.length; i++) {
            const itemPriority = items[i].classList[0];
            if (getPriorityValue(priority) < getPriorityValue(itemPriority)) {
                taskList.insertBefore(taskElement, items[i]);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            taskList.appendChild(taskElement);
        }
    }

    function getPriorityValue(priority) {
        switch(priority) {
            case 'high': return 1;
            case 'medium': return 2;
            case 'low': return 3;
            default: return 4;
        }
    }

    function saveTask(task, category, priority) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push({task, category, priority });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(taskObj) {
            addTask(taskObj.task, taskObj.category, taskObj.priority);
        });
    }

    function removeTask(task, category, priority) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks = tasks.filter(t => t.task !== task || t.category !== category || t.priority !== priority);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

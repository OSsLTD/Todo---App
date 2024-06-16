document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const categorySelect = document.getElementById('categorySelect');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const category = categorySelect.value;
    
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        
        const li = document.createElement('li');
        const taskId = `task-${Date.now()}`; // Generate a unique ID based on the current time
        li.id = taskId;
        li.innerHTML = `<span>${taskText} (Due: ${dueDate}, Category: ${category})</span>`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit your task:', taskText);
            const newDueDate = prompt('Edit due date:', dueDate);
            const newCategory = prompt('Edit category:', category);
            if (newTaskText !== null) {
                li.querySelector('span').textContent = `${newTaskText} (Due: ${newDueDate}, Category: ${newCategory})`;
                saveTasks();
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.style.textDecoration = 'line-through';
            } else {
                li.style.textDecoration = 'none';
            }
            saveTasks();
        });
        
        li.prepend(checkbox);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        
        taskInput.value = '';
        dueDateInput.value = '';
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const taskParts = li.querySelector('span').textContent.split(' (Due: ');
        const taskText = taskParts[0];
        const dueDateCategory = taskParts[1].split(', Category: ');
        const dueDate = dueDateCategory[0];
        const category = dueDateCategory[1].slice(0, -1);
        const completed = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, dueDate, category, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        
        const li = document.createElement('li');
        const taskId = `task-${Date.now()}`; // Generate a unique ID based on the current time
        li.id = taskId;
        li.innerHTML = `<span>${task.text} (Due: ${task.dueDate}, Category: ${task.category})</span>`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit your task:', task.text);
            const newDueDate = prompt('Edit due date:', task.dueDate);
            const newCategory = prompt('Edit category:', task.category);
            if (newTaskText !== null) {
                li.querySelector('span').textContent = `${newTaskText} (Due: ${newDueDate}, Category: ${newCategory})`;
                saveTasks();
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        if (task.completed) {
            li.style.textDecoration = 'line-through';
        }
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.style.textDecoration = 'line-through';
            } else {
                li.style.textDecoration = 'none';
            }
            saveTasks();
        });
        
        li.prepend(checkbox);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

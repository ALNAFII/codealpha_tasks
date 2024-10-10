document.addEventListener('DOMContentLoaded', function () {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('priority');
    const taskList = document.getElementById('taskList');
    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (taskText !== "") {
            const newTask = document.createElement('li');
            newTask.classList.add(priority);
            newTask.textContent = taskText;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () 
            {
                taskList.removeChild(newTask);
            });
            newTask.appendChild(deleteButton);
            taskList.appendChild(newTask);
            taskInput.value = "";
        }
    });
    taskList.addEventListener('click', function (e) 
    {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
        }
    });
});

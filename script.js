document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const taskPriority = document.getElementById('taskPriority').value;
    const taskText = taskInput.value;

    const li = document.createElement('li');
    li.className = `list-group-item task-item ${taskPriority}`;
    li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${taskText}</span>
            <div>
                <button class="btn btn-success btn-sm ml-2" onclick="toggleComplete(this)">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-edit btn-sm ml-2" data-toggle="modal" data-target="#editModal" onclick="editTask(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-remove btn-sm ml-2" onclick="confirmRemoveTask(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';
});

// Edit task functionality
let taskToEdit = null;

function editTask(button) {
    taskToEdit = button.closest('.task-item');
    document.getElementById('editTaskInput').value = taskToEdit.querySelector('span').textContent;
}

document.getElementById('saveEditBtn').addEventListener('click', function() {
    const updatedText = document.getElementById('editTaskInput').value;
    taskToEdit.querySelector('span').textContent = updatedText;
    $('#editModal').modal('hide');
});

function toggleComplete(button) {
    const taskItem = button.closest('.task-item');
    taskItem.classList.toggle('completed');
}

function confirmRemoveTask(button) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        removeTask(button);
    }
}

function removeTask(button) {
    const taskItem = button.closest('.task-item');
    taskItem.remove();
}

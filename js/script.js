// Data
let database = JSON.parse(localStorage.getItem('tasks'));

// Variables
let todo = document.querySelector('.todo');
let todoList = document.querySelector('.todo__body-list');
let modal = document.querySelector('.modals');
let clickedElem;


// Start
if (database == null) {
    database = [];
}
showTasks(database);

todo.addEventListener('click', event => {
    let currentTarget = event.target;

    if (currentTarget.classList.contains('todo__body-btn')) {
        showNewTaskModal();
    }

    if (currentTarget.classList.contains('todo__body-item') || currentTarget.classList.contains('todo__body-text')) {
        showTaskModal();
        fillTaskModal(currentTarget, database);

        clickedElem = currentTarget;
    }

    if (currentTarget.classList.contains('todo-delete')) {
        let task = currentTarget.closest('.todo__body-item');
        deleteTask(task, database);
    }
});

modal.addEventListener('click', event => {
    let currentTarget = event.target;

    if (currentTarget.classList.contains('modal-btn__close')) {
        let modalWrapper = currentTarget.closest('.modal__wrapper');
        modalWrapper.classList.add('hidden');
    }

    if (currentTarget.classList.contains('modals__create-btn')) {
        createNewTask(database);
    }

    if (currentTarget.classList.contains('modal__edit-btn')) {
        let modalWrapper = currentTarget.closest('.modal__wrapper');
        modalWrapper.classList.add('hidden');
        fillEditModal(clickedElem, database);
    }

    if (currentTarget.classList.contains('modal-btn__save')) {
        editTaskValues(clickedElem, database);
    }
});

// Functions
function showTasks(arr) {
    if (arr.length != 0) {
        let taskList = document.createDocumentFragment();
        for (let task of arr) {
            let li = document.createElement('li');
            li.classList.add('todo__body-item');

            let p = document.createElement('p');
            p.classList.add('todo__body-text');
            p.textContent = task.name;

            let i = document.createElement('i');
            i.classList.add('todo-delete', 'fa-solid', 'fa-trash-can');

            li.appendChild(p);
            li.appendChild(i);
            taskList.appendChild(li); 
        }
        todoList.appendChild(taskList);
    } else {
        showEmptyMsg();
    }
    
}

function showNewTaskModal() {
    modal.querySelector('.modal__wrapper').classList.remove('hidden');
}

function createNewTask(arr) {
    // Check if obj is empty
    if (arr.length == 0) {
        todoList.innerHTML = '';
    }

    let taskName = document.querySelector('#create-input');
    let taskDesc = document.querySelector('#create-textarea');

    if (taskName.value != '' && taskDesc.value != '') {
        arr.push({
            name: taskName.value,
            desc: taskDesc.value
        },);
    
        let li = document.createElement('li');
        li.classList.add('todo__body-item');

        let p = document.createElement('p');
        p.classList.add('todo__body-text');
        p.textContent = taskName.value;
    
        let i = document.createElement('i');
        i.classList.add('todo-delete', 'fa-solid', 'fa-trash-can');
    
        li.appendChild(p);
        li.appendChild(i);
        todoList.appendChild(li);
    
        // Clear Fields
        taskName.value = '';
        taskDesc.value = '';
    
        // Close Modal
        document.querySelector('.modals__create').closest('.modal__wrapper').classList.add('hidden');
    
        // Update localStorage
        localStorage.setItem('tasks', JSON.stringify(database));
    } else if (taskName.value == '' && taskDesc.value != '') {
        taskName.classList.add('red');

        setTimeout(() => {
            taskName.classList.remove('red');
        }, 1000);
    } else if (taskDesc.value == '' && taskName.value != '') {
        taskDesc.classList.add('red');

        setTimeout(() => {
            taskDesc.classList.remove('red');
        }, 1000);
    } else {
        console.log(3);
        taskName.classList.add('red');
        taskDesc.classList.add('red');

        setTimeout(() => {
            taskName.classList.remove('red');
            taskDesc.classList.remove('red');
        }, 1000);
    }
}

function showTaskModal() {
    document.querySelector('.modals__view').closest('.modal__wrapper').classList.remove('hidden');
}

function fillTaskModal(elem, arr) {
    let modalTitle = document.querySelector('.modals__view-title');
    let modalDesc = document.querySelector('.modal__view-desc');

    for (let task of arr) {
        if (task.name == elem.textContent) {
           modalTitle.textContent = task.name;
           modalDesc.textContent = task.desc;
        }
    }
}

function deleteTask(elem, arr) {
    arr.forEach((task, index) => {
        if (task.name == elem.textContent) {
            arr.splice(index, 1);
         }
    });
    todoList.removeChild(elem);

    // Check if obj is empty
    if (arr.length == 0 || arr == null) {
        showEmptyMsg();
    }

    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(database));
}

function showEmptyMsg() {
    let div = document.createElement('div');
    div.classList.add('center');
    div.textContent = 'No tasks! Create some';

    todoList.appendChild(div);
}

function fillEditModal(elem, arr) {
    document.querySelector('.modals__edit')
        .closest('.modal__wrapper')
        .classList.remove('hidden');

    let taskName = document.querySelector('#edit-input');
    let taskDesc = document.querySelector('#edit-textarea');

    // Clear Fields
    taskName.value = '';
    taskDesc.value = '';

    for (let task of arr) {
        if (task.name == elem.textContent) {
            taskName.value = task.name;
            taskDesc.value = task.desc;
        }
    }
}

function editTaskValues(elem, arr) {
    let taskName = document.querySelector('#edit-input');
    let taskDesc = document.querySelector('#edit-textarea');

    for (let task of arr) {
        if (task.name == elem.textContent) {
            task.name = taskName.value;
            task.desc = taskDesc.value;
        }
    }

    // Clear TodoList
    todoList.innerHTML = '';

    // Fill TodoList
    showTasks(arr);

    // Close Modal
    document.querySelector('.modals__edit')
        .closest('.modal__wrapper')
        .classList.add('hidden');

    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(database));
}
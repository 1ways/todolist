// Data
let database = {
    'asdasdasd': {
        desc: 'asdasdasd',
    },
}; 

// Variables
let todo = document.querySelector('.todo');
let todoList = document.querySelector('.todo__body-list');
let modal = document.querySelector('.modals');
let deleteElem = '';


// Start
showTask(database);

todo.addEventListener('click', event => {
    let currentTarget = event.target;

    if (currentTarget.classList.contains('todo__body-btn')) {
        showNewTaskModal();
    }

    if (currentTarget.classList.contains('todo__body-item')) {
        showTaskModal();
        fillTaskModal(currentTarget, database);

        deleteElem = currentTarget;
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

    if (currentTarget.classList.contains('modal__delete-btn')) {
        deleteTask(deleteElem, database);
    }
});

// Functions
function showTask(obj) {
    if (Object.keys(obj).length != 0) {
        let taskList = document.createDocumentFragment();
        for (let task of Object.keys(obj)) {
            let li = document.createElement('li');
            li.classList.add('todo__body-item');
            li.textContent = task; 
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

function createNewTask(obj) {
    // Check if obj is empty
    if (Object.keys(obj) == 0) {
        todoList.innerHTML = '';
    }

    let taskName = document.querySelector('#create-input');
    let taskDesc = document.querySelector('#create-textarea');

    obj[taskName.value] = {
        desc: taskDesc.value,
    };

    let li = document.createElement('li');
    li.classList.add('todo__body-item');
    li.textContent = taskName.value; 
    todoList.appendChild(li);

    // Clear Fields
    taskName.value = '';
    taskDesc.value = '';

    // Close Modal
    document.querySelector('.modals__create').closest('.modal__wrapper').classList.add('hidden');
}

function showTaskModal() {
    document.querySelector('.modals__view').closest('.modal__wrapper').classList.remove('hidden');
}

function fillTaskModal(elem, obj) {
    let modalTitle = document.querySelector('.modals__view-title');
    let modalDesc = document.querySelector('.modal__view-desc');

    modalTitle.textContent = elem.textContent;
    modalDesc.textContent = obj[elem.textContent].desc;
}

function deleteTask(elem, obj) {
    delete obj[elem.textContent];
    todoList.removeChild(elem);

    // Close Modal
    document.querySelector('.modals__view').closest('.modal__wrapper').classList.add('hidden');

    // Check if obj is empty
    if (Object.keys(obj) == 0) {
        showEmptyMsg();
    }
}

function showEmptyMsg() {
    let div = document.createElement('div');
    div.classList.add('center');
    div.textContent = 'No tasks! Create some';

    todoList.appendChild(div);
}
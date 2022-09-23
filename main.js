let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksdiv = document.querySelector(".tasks");
let deletbutton = document.querySelector('button')


//Empty array
let arrayofTasks = [];

if (localStorage.getItem('tasks')) {
    arrayofTasks = JSON.parse(localStorage.getItem('tasks'));
}

getDataFromLocalStorage();


if (localStorage["tasks"] == null) {
    deletbutton.style.opacity = '0.5';
}


//add task
submit.onclick = function () {
    if (input.value !== '') {
        addTaskToArray(input.value);
        input.value = '';
    }
}

//click on task element
tasksdiv.addEventListener('click', (e) => {
    //delete button
    if (e.target.classList.contains('del')) {
        deleteTask(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
    }
    //task elemnt
    if (e.target.classList.contains('task')) {
        toggleleStatusTask(e.target.getAttribute('data-id'))
        e.target.classList.toggle('done');
    }
})


function addTaskToArray(taskText) {
    //task data
    const task = {
        id: Date.now(),
        title: taskText,
        comoleted: false,
    };

    //push task to array
    arrayofTasks.push(task);

    //add tasks to page
    addElementsToPageFrom(arrayofTasks);

    //add to local storage
    addDataToLocalStorageFromArray(arrayofTasks);
}


function addElementsToPageFrom(arrayofTasks) {
    //empty task div
    tasksdiv.innerHTML = '';
    //looping on array
    arrayofTasks.forEach((task) => {
        let div = document.createElement('div');
        div.className = "task";
        //chech if the task is done
        if (task.comoleted) {
            div.className = 'task done';
        }

        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title));
        //create delete
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('Delete'));
        div.appendChild(span);

        //Add task div to task container
        tasksdiv.appendChild(div)

    });

}

function addDataToLocalStorageFromArray(arrayofTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrayofTasks));
}


function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }

}

function deleteTask(taskId) {
    arrayofTasks = arrayofTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFromArray(arrayofTasks);
}


function toggleleStatusTask(taskId) {
    for (let i = 0; i < arrayofTasks.length; i++) {
        if (arrayofTasks[i].id == taskId) {
            arrayofTasks[i].comoleted == false ? (arrayofTasks[i].comoleted = true) : (arrayofTasks[i].comoleted = false);
        }
    }
    addDataToLocalStorageFromArray(arrayofTasks);
}



deletbutton.onclick = function () {
    window.localStorage.removeItem('tasks');
    tasksdiv.innerHTML = '';
}
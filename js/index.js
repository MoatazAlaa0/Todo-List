
let userTask = document.querySelector("#userTask");
let dateTask = document.querySelector("#taskDate");
let allTasks = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    displayAllTasks();
});

document.querySelector("button.btn-info").addEventListener("click", addTasks);

function addTasks() {
    let taskObj = {
        task: userTask.value.trim(),
        date: dateTask.value.trim(),
        completed: false
    };

    if (!taskObj.task || !taskObj.date) {
        const alertElement = document.querySelector(".alert-info");
    
       
        alertElement.classList.remove("d-none"); 
        alertElement.style.top = "10px"; 
    
        setTimeout(() => {
            alertElement.style.top = "-100%"; 
            setTimeout(() => {
                alertElement.classList.add("d-none"); 
            }, 1000); 
        }, 2000);
    }



    else {
        allTasks.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        displayAllTasks();
        clearValue();
    }


}




function clearValue() {
    userTask.value = '';
    dateTask.value = '';
}

function displayAllTasks() {
    let cartona = "";

    allTasks.forEach((task, index) => {
        cartona += `

              <div class="bg-white shadow-lg rounded-3 text-start py-5 px-5   task-item d-flex align-items-center justify-content-between border-bottom py-2 mb-3 ${task.completed ? 'completed-task' : ''}">
                <div class="task-info">
                    <span class="task-text">${task.task}</span>
                    <span class="task-date text-muted">Due Date: ${task.date}</span>
                </div>
                <div class="task-actions">
                    <button class="btn btn-success btn-sm mx-1" title="Mark as Completed" onclick="toggleTaskCompletion(${index})">
                        ${task.completed ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-regular fa-square-check"></i>'}
                    </button>
                    <button class="btn btn-warning btn-sm mx-1" title="Edit Task" onclick="editTask(${index})">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm mx-1" title="Delete Task" onclick="deleteTask(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        
          `;
    });

    document.querySelector(".tasks").innerHTML = cartona;
}

function deleteTask(index) {
    allTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    displayAllTasks();
clearValue()
document.getElementById('updateButton').style.display = 'none';
document.querySelector("button.btn-info").style.display = 'block';
    document.querySelector(".alert-success").classList.remove("d-none"); 
    document.querySelector(".alert-success").style.top = "10px";
    
   
    setTimeout(() => {
        document.querySelector(".alert-success").style.top = "-100%"; 
        setTimeout(() => {
            document.querySelector(".alert-success").classList.add("d-none");
        }, 1000);
    }, 2000);
}

function loadTasksFromLocalStorage() {
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        allTasks = JSON.parse(storedTasks);
    }
}

function toggleTaskCompletion(index) {
    allTasks[index].completed = !allTasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    displayAllTasks();
}

function editTask(index) {
    userTask.value = allTasks[index].task;
    dateTask.value = allTasks[index].date;

    document.getElementById('updateButton').onclick = function () {
        updateTask(index);
    };

    document.getElementById('updateButton').style.display = 'block';
    document.querySelector("button.btn-info").style.display = 'none';
}

function updateTask(index) {
    let updatedTask = userTask.value.trim();
    let updatedDate = dateTask.value.trim();

    if (updatedTask === '' || updatedDate === '') {
        alert('Please enter both a task and a date.');
        return;
    }

    allTasks[index].task = updatedTask;
    allTasks[index].date = updatedDate;

    localStorage.setItem('tasks', JSON.stringify(allTasks));
    displayAllTasks();
    clearValue();

    document.getElementById('updateButton').style.display = 'none';
    document.querySelector("button.btn-info").style.display = 'block';
}


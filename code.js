let todoArr = JSON.parse(localStorage.getItem("todoArr"))
  ? JSON.parse(localStorage.getItem("todoArr"))
  : [];
let arrComp = JSON.parse(localStorage.getItem('arrComp')) ? JSON.parse(localStorage.getItem('arrComp')) : []
let completeTask = document.querySelector('#completeTask')
let displayTask = document.querySelector("#tasks");
let inputTask = document.querySelector("#input-task");
let addBtn = document.querySelector("#addTask");
let msg = document.querySelector('#msg')
let compMsg = document.querySelector("#compMsg");
let taskName = document.getElementsByClassName("taskName");

if (todoArr.length === 0) {
  msg.innerHTML = "No tasks found";
  console.log("test");
}

if(arrComp.length === 0){
  compMsg.innerHTML = "No completed tasks"
}

// Math.round(Math.random() * 100);

addBtn.addEventListener('click', addTask)

function addTask() {
    if (!inputTask.value) {
      alert("Input cannot be empty");
    } else{
      let newtask = {
        taskID: Date.now(),
        name: inputTask.value,
        complete: false,
      };
      todoArr.push(newtask);
      localStorage.setItem("todoArr", JSON.stringify(todoArr));
      inputTask.value = "";
      location.reload()
    }
    
}


function displaytasks() {
displayTask.innerHTML = "";
  todoArr.forEach((item) => {
    displayTask.innerHTML += `
        <td>${item.taskID}</td>
        <td>${item.name}</td>
        <td>${item.complete}</td>
        <td>
            <button class="btn btn-danger" onclick='delTask(${JSON.stringify(item)})'>Delete</button>
            <button class="btn btn-primary" onclick='editTask(${JSON.stringify(item)})'>Edit</button>
            <button class="btn btn-success" onclick='compTask(${JSON.stringify(item)})'>Done</button>
        </td>
    `;
  });
}

displaytasks();

function delTask(item){

    let taskIndex = todoArr.findIndex(i => i.taskID === item.taskID);

    if (taskIndex !== -1) {
      todoArr.splice(taskIndex, 1)
      localStorage.setItem('todoArr', JSON.stringify(todoArr))
      location.reload()
    } else {
      console.log("Task not found");
    }
}

function editTask(item){
  let taskIndex = todoArr.findIndex((i) => i.taskID === item.taskID);
  let newName = prompt("Edit task: " + item.name)

  if(newName !== null){
    todoArr[taskIndex].name = newName;
  }

  localStorage.setItem('todoArr', JSON.stringify(todoArr))
  displaytasks()
}

let ascOrder = true

function sort(){
  if(ascOrder){
    todoArr.sort((a,b) => a.name.localeCompare(b.name))
    displaytasks()
  } else {
    todoArr.sort((a,b) => b.name.localeCompare(a.name))
    displaytasks()
  }

  ascOrder = !ascOrder
}

function compTask(item){
  let compID = todoArr.findIndex(i => i.taskID === item.taskID)

  if (compID !== -1) {
    todoArr.splice(compID, 1);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    location.reload();
  } else {
      console.log("Task not found");
    }
    arrComp.push({
      taskID: item.taskID,
      name: item.name,
      complete: true
    });
    console.log(item);
    localStorage.setItem("arrComp", JSON.stringify(arrComp));
}

function displayComp(){
  completeTask.innerHTML = ''
  arrComp.forEach(item => {
    completeTask.innerHTML += `
      <td>${item.taskID}</td>
      <td>${item.name}</td>
      <td>${item.complete}</td>
      <td>
        <button class="btn btn-danger" onclick='compDel(${JSON.stringify(item)})'>Delete</button>
      </td>
    `
  }) 
}

displayComp()

function compDel(item){
  let compID = arrComp.findIndex(i => i.taskID === item.taskID)

  if(compID !== -1){
    arrComp.splice(compID, 1)
    localStorage.setItem('arrComp', JSON.stringify(arrComp))
    location.reload()
  } else{
    alert('Task not found')
  }
}

const TASKS = [
    [],[],[],[],[]
];

function addTask(){
    let inserionIndex = Number(document.getElementById("taskPriority").value);
    validate(null, "taskPriority", "Please Select Valid Priority");
    let taskName = document.getElementById("taskName").value;
    if(!validate(taskName, "taskName")) return;
    document.getElementById("taskName").value = "";
    TASKS[inserionIndex].push(taskName);
    buildTasks();
}
function validate(text, formId, message){
    const ERROR = document.getElementById("error");
    if(text && !text.match(/^ *$/)) {
        ERROR.style.display = 'none';
        return true;
    }
    ERROR.style.display = "block";
    ERROR.innerHTML = message || "Please Enter a valid task name";
    ERROR.htmlFor = formId;

    return false;
}

function buildTasks(){
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML="";
    let task = document.createElement("tr");
    task.setAttribute("class", "mt-1");
    let counter = 1;
    for(let priority = 0; priority < TASKS.length; priority++){
        if(TASKS[priority].length == 0) continue;
        for(let index = 0 ; index < TASKS[priority].length; index++){
            task.appendChild(getTableDetail(counter));
            task.appendChild(getTableDetail(TASKS[priority][index]));
            task.appendChild(getTableDetail(getPriority(priority)));
            task.appendChild(buildRemoveButton(priority, index));
            tableBody.append(task);
            task = document.createElement("tr");
            counter++;
        }

    }
}

function getTableDetail(content){
    let td = document.createElement("td");
    td.innerHTML = content;
    return td;
}

function buildRemoveButton(priority, index){
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-danger pt-1 pb-1 removeBtn");
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fa-regular fa-trash-can');
   // icon.style.color = "#851911";
    icon.style.fontSize= "1.2rem";
    removeButton.appendChild(icon);
    //removeButton.innerHTML = "Remove";
    removeButton.setAttribute("onclick", `removeTask(${priority}, ${index})`);
   // removeButton.style.backgroundColor = "#851911";
    let td = document.createElement("td");
    return td.appendChild(removeButton);
}

function removeTask(priority, index){
    let message = `Are you sure you want to delete the task ${TASKS[priority][index]}?`;
    if(confirm(message)){
        TASKS[priority].splice(index, 1);
        buildTasks();
    }
}

function getPriority(index){
    if(index == 0) return "Very High";
    if(index == 1) return "High";
    if(index == 2) return "Medium";
    if(index == 3) return "Low";
    if(index == 4) return "Very Low"
    else return "-";
}
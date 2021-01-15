const taskTable=document.getElementsByTagName("tbody")[0];
const taskForm=document.querySelector('#task-form');
let tasks;

//New task button
taskForm.addEventListener('submit', function(){
    var taskInfo=document.getElementById('task-input').value;
    if(taskInfo==''){
        return alert('please enter a task');
    }
    addTask({"info":taskInfo, "status":false});
    document.getElementById('task-input').value='';
});

//Fetch original tasks from api
var getTasks=function(){
    return fetch('http://discoveryvip.com/shared/json.php?f=list')
    .then(response=>{
        console.log(response);
        if(response.status!=200){
            throw new Error('Could not retrieve data.');
        }
        return response.json();
    })
    .catch(err=>new Error(err));
}

//Check for sessionStorage
window.onload=function(){
    if(sessionStorage['data']){
        tasks=JSON.parse(sessionStorage['data']);
        renderTasks(tasks);
    }
    else{
        getTasks()
            .then(info=>{
                tasks=info;
                renderTasks(tasks);
                saveSession(tasks);
            });
    }
}

//Task table building
const buildTask=function(key, task){
    const tr=document.createElement('tr');
    const tdComplete=document.createElement('td');
    const tdInfo=document.createElement('td');
    const tdDelete=document.createElement('td');
    const statusInput=document.createElement('input');
    const deleteInput=document.createElement('input');
    const textInside=document.createTextNode(task.info);
    statusInput.name='complete';
    statusInput.type='checkbox';
    statusInput.checked=task.status;
    statusInput.value=key;
    statusInput.onchange=updateData;
    deleteInput.name='delete';
    deleteInput.type='checkbox';
    deleteInput.value=key;
    deleteInput.onchange=deleteData;
    tdComplete.appendChild(statusInput);
    tdInfo.appendChild(textInside);
    tdDelete.appendChild(deleteInput);
    tr.appendChild(tdComplete);
    tr.appendChild(tdInfo);
    tr.appendChild(tdDelete);
    taskTable.appendChild(tr);
}

//Build multiple tasks (on initial load, on task delete)
const renderTasks=function(tasks){

    for(var key in tasks){
        buildTask(key, tasks[key]);
    };
}

//Add and build single task from input field
const addTask=function(taskInfo){
    buildTask(tasks.length, taskInfo);
    tasks.push(taskInfo);
    saveSession(tasks);
}

//Save to sessionStorage
const saveSession=function(tasks){
    let data=JSON.stringify(tasks);
    sessionStorage.setItem('data', data);
}

//When status checked/unchecked
const updateData=function(event){
    var key=event.target.value;
    tasks[key].status=event.target.checked;
    saveSession(tasks);
}

//When task deleted
const deleteData=function(event){
    var key=event.target.value;
    tasks.splice(key,1);
    saveSession(tasks);
    taskTable.innerHTML='';
    renderTasks(tasks);
}



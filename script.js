const taskTable=document.getElementsByTagName("tbody")[0];
let tasks;
const taskForm=document.querySelector('#task-form');

taskForm.addEventListener('submit', function(){
    var taskInfo=document.getElementById('task-input').value;
    if(taskInfo==''){
        return alert('please enter a task');
    }
    addTask(taskInfo);
});


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
    /*.then(data=>{
        tasks=data;
        console.log(tasks);
        //tasks.forEach((el)=>{
            //tasks[el.key]=el.value;
        //})
        return tasks;
    })*/
    //.catch(err=>console.log(err));
}

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
                let data=JSON.stringify(tasks);
                saveSession(data);
            });
    }
}

const renderTasks=function(tasks){
    let html='';

    for(var key in tasks){
        html+=`
            <tr>
                <td><input name="complete" type="checkbox" value="${key}" ${tasks[key].status?'checked':''}></td>
                <td>${tasks[key].info}</td>
                <td><input name="delete" value="${key}" type="checkbox"></td>
            </tr>
        `
    };
    taskTable.innerHTML=html;
    addChangeEvent();
}

const saveSession=function(data){
    sessionStorage.setItem('data', data);
}

const addChangeEvent=function(){
    var completeBoxes=document.querySelectorAll("input[name='complete']");
    var deleteBoxes=document.querySelectorAll("input[name='delete']");
    completeBoxes.forEach(el=>{
        el.onchange=updateData;
    })
    deleteBoxes.forEach(el=>{
        el.onchange=deleteData;
    })
}

const updateData=function(event){
    var key=event.target.value;
    tasks[key].status=event.target.checked;
    let data=JSON.stringify(tasks);
    saveSession(data);
}

const deleteData=function(event){
    var key=event.target.value;
    tasks.splice(key,1);
    let data=JSON.stringify(tasks);
    saveSession(data);
    renderTasks(tasks);
}

const addTask=function(){
    console.log('hi');
}




//Add form for inputting new tasks
//Styling
//Refactor
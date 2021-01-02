const taskTable=document.getElementsByTagName("tbody")[0];
let tasks;


var getTasks=function(){
    return fetch('http://discoveryvip.com/shared/json.php?f=list')
    .then(response=>{
        console.log(response);
        if(response.status!=200){
            throw new Error('Could not retrieve data.');
        }
        return response.json();
    })
    .then(data=>{
        tasks=data;
        tasks.forEach((el)=>{
            tasks[el.key]=el.value;
        })
        return tasks;
    })
    .catch(err=>console.log(err));
}

window.onload=function(){
    if(sessionStorage['data']){
        tasks=JSON.parse(sessionStorage['data']);
        renderTasks(tasks);
    }
    else{
        getTasks()
            .then(tasks=>{
                renderTasks(tasks);
                let data=JSON.stringify(tasks);
                saveSession(data);
            });
    }
}

const renderTasks=function(tasks){
    let html='';
    tasks.forEach((el)=>{
        html+=`
            <tr>
                <td><input name="complete" type="checkbox" value="${el.info}" ${el.status?'checked':''}></td>
                <td>${el.info}</td>
                <td><input name="delete" value="${el.info}" type="checkbox"></td>
            </tr>
        `
    });
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
    var curTask=event.target.value;
    var task=tasks.find(el=>el.info===curTask);
    task.status=event.target.checked;
    let data=JSON.stringify(tasks);
    saveSession(data);
}

const deleteData=function(event){
    var curTask=event.target.value;
    var index=tasks.findIndex(el=>el.info===curTask);
    tasks.splice(index,1);
    let data=JSON.stringify(tasks);
    saveSession(data);
    renderTasks(tasks);
}



//Add form for inputting new tasks
//Styling
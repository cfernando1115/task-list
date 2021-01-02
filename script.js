const taskTable=document.getElementsByTagName("tbody")[0];


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
        let tasks=data;
        tasks.forEach((el)=>{
            tasks[el.key]=el.value;
        })
        return tasks;
    })
    .catch(err=>console.log(err));
}

window.onload=function(){
    if(sessionStorage['data']){
        let tasks=JSON.parse(sessionStorage['data']);
        //render tasks
        renderTasks(tasks);
    }
    else{
        getTasks()
            .then(tasks=>{
                renderTasks(tasks);
                let data=JSON.stringify(tasks);
                //move to save function...
                saveSession(data);
            });
    }
    var completeBox=document.querySelectorAll("input[name=complete]");
    completeBox.forEach(el=>{
        el.addEventListener('change',function(){
            el.hasAttribute('checked')?el.removeAttribute('checked'):el.setAttribute('checked','checked');
            //(el.getAttribute('value'))?el.setAttribute('value','false'):el.setAttribute('value','true');
            let status=el.getAttribute('value');
            if(status=='true'){
                el.setAttribute('value','false');
            }
            else{
                el.setAttribute('value','true');
            }
            console.log(el.getAttribute('value'));
        })
    })
}

const renderTasks=function(tasks){
    let html='';
    tasks.forEach((el)=>{
        html+=`
            <tr>
                <td><input name="complete" type="checkbox" value="${el.checked?'true':'false'}" ${el.status?'checked':''}></td>
                <td>${el.info}</td>
                <td><input name="delete" type="checkbox"></td>
            </tr>
        `
    });
    taskTable.insertAdjacentHTML('beforeend',html);
}

const saveSession=function(data){
    sessionStorage.setItem('data', data);
}



        /*var myForm=document.getElementById('myForm');
        var output=document.getElementById('output');


        window.onload=function(){
            if(window.sessionStorage){
                var person=JSON.parse(sessionStorage['person']);
                var message=`<h2>Welcome back ${person.first} ${person.last}!</h2>`;
                output.insertAdjacentHTML('afterbegin', message);
            }
        }

        myForm.addEventListener('submit', function(e){
            e.preventDefault();
            var data=formData(myForm);
            if(data){
                /***********
                 * Store Values As String
                 ************/

                /*//convert object to JSON
                var myJson=JSON.stringify(data);
                //put in session storage
                sessionStorage.setItem('person',myJson);
            }
        })

        var formData=function(form){
            var el=document.querySelectorAll('input[type="text"],input[type="email"]');
            //Create new object to store input
            var myData={};
            el.forEach(el=>{
                myData[el.name]=el.value;  
            })
            return myData;
        }*/
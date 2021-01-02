fetch('http://discoveryvip.com/shared/json.php?f=list')
    .then(response=>{
        console.log(response);
        if(response.status!=200){
            throw new Error('Could not retrieve data.');
        }
        return response.json();
    })
    .then(data=>{
        let tasks=data;
        console.log(tasks);
        console.log(tasks[0].info);
    })
    .catch(err=>console.log(err));


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
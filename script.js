const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const age = document.querySelector("#age");
const level = document.querySelector("#level");
const club = document.querySelector("#club");
const submit = document.querySelector("#submit");
const table = document.querySelector("#table");
let deleteButtons = document.querySelectorAll(".delete");

let people = [];
let json;
let uniqueID ;
let rows=0;
let deletedRows  = [];

function getValues(){
    if( firstName.value === "" ||
        lastName.value === "" ||
        age.value === "" ||
        club.value === ""){

        alert("Complete the form")

    }
    else{
        uniqueID = "#" + Math.floor(Math.random() * 9000);
        let Person = {};
        Person["ID"] = uniqueID;
        Person["First name"] = firstName.value;
        Person["Last name"] = lastName.value;
        Person["Age"] = age.value;
        Person["Level"] = level.value;
        Person["Club"] = club.value;

        people.push(Person);
        json = JSON.stringify(people);
        rows++;
    }
    
}

function CreateTableFromJSON() {

    for(let i=0; i<=rows;i++){
        table.deleteRow(-1);
    }    

    let tableData = JSON.parse(json);
    var header = [];
                   
    for (var i = 0; i < tableData.length; i++) {
        for (var key in tableData[i]) {
            if (header.indexOf(key) === -1) {
                header.push(key);
            }
        }
    }

    var tr = table.insertRow(-1);  

    for (var i = 0; i < header.length; i++) {
            var th = document.createElement("th");      
            th.innerHTML = header[i];
            tr.appendChild(th);
    }

    var tr = table.insertRow(-1);   
    for (var i = 0; i < tableData.length; i++) {
        tr = table.insertRow(-1);
       
        for (var j = 0; j < header.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = tableData[i][header[j]];
        }        
        
        var extraTab = tr.insertCell(-1)
        extraTab.innerHTML = "<button class='delete'>Delete</button>";
    }

    let deleteButtons = document.querySelectorAll(".delete");
    for (let i=0;i<deleteButtons.length;i++) {
        deleteButtons[i].addEventListener("click",callBack);
    }
    for (let i=0;i<deleteButtons.length;i++) {
        deleteButtons[i].setAttribute("id",i+1);
    }

}

function deleteUser(r) {
    var i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
}

function callBack(event){   
    deleteUser(event.target); 
    people.splice(event.target.id-1,1);
       
}

submit.addEventListener("click",getValues);
submit.addEventListener("click",CreateTableFromJSON);

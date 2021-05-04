/*
 * Name: Abdullah Shehu
 * Project: MileStone project
 * Date: Teusday, May 4th 2021.
 */

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const age = document.querySelector("#age");
const level = document.querySelector("#level");
const club = document.querySelector("#club");
const submit = document.querySelector("#submit");
const table = document.querySelector("#table");
const answers  = document.querySelectorAll(".answers");
const form = document.querySelector("#inputForm");

//Initializing all the DOM elements


let people = [];
let json;
let uniqueID;
let rows = 0;
let svg = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'> <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/> <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/> </svg>"
//Initializing variables to be used
//svg is for button design

//function to store the values of the form
function getValues(){
    if( firstName.value === "" ||
        lastName.value === "" ||
        age.value === "" ||
        club.value === ""){
        alert("Fill out the form")
    }
    //Prompts user to fill in form first before submitting

    else{
        uniqueID = "#" + Math.floor(Math.random() * 9999); //Generates unique ID for each User
        let Person = {};
        Person["ID"] = uniqueID;
        Person["First name"] = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1);
        Person["Last name"] = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1);
        Person["Age"] = age.value;
        Person["Level"] = level.value;
        Person["Club"] = club.value.charAt(0).toUpperCase() + club.value.slice(1);
        //Capitalize the first letters

        people.push(Person);
        json = JSON.stringify(people);
        rows++;
        inputForm.reset();
        //Stores the object Person in the array people.
        //Turns the array of objects into JSON variable
        //Counts the no. of rows
        //Resets the form after each submission
    }
    
}

//function to create a table out of the JSON variable
function CreateTableFromJSON() {

    for(let i=0; i<=rows;i++){
        table.deleteRow(-1);
    }   
    //Deletes the table and rebuilds it every time the submit is called.

    let tableData = JSON.parse(json); //Turn the JSON variable back into an array of objects
   
    var header = []; //To store the table headers(ID,Name...etc) in an array

    for (var i = 0; i < tableData.length; i++) {
        for (var key in tableData[i]) {
            if (header.indexOf(key) === -1) {
                header.push(key);
            }
            //To get rid of duplicates, if condition is used
        }
    }

    var tr = table.insertRow(-1);  //insert a new row for the th

    for (var i = 0; i < header.length; i++) {
        var th = document.createElement("th");      
        th.innerHTML = header[i];
        tr.appendChild(th);
    }//Use appendChild to add the th to the row

    for (var i = 0; i < tableData.length; i++) {
        tr = table.insertRow(-1);//new row for the values
       
        for (var j = 0; j < header.length; j++) {
            var cell = tr.insertCell(-1);
            cell.innerHTML = tableData[i][header[j]];
        }        
        //Loop to add each key[value] into a cell on the row
        
        var extraCell = tr.insertCell(-1)
        extraCell.innerHTML = "<button class='delete'>"+svg+"</button>";
        //add an extra cell for the delete button
    }

    let deleteButtons = document.querySelectorAll(".delete");//initialize the DOM of all the buttons using query selector all

    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].setAttribute("id",i+1);
    }
    //Assign an id for each new button

    for (let i=0;i<deleteButtons.length;i++) {
        deleteButtons[i].addEventListener("click",callBack);
    }//add an event listener on each button'

}

function deleteUser(r) {
    var i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
}//function to delete row  from ww3 schools

function callBack(event){   
    deleteUser(event.target); 
    people.splice(event.target.id-1,1);
}//a callback function to apply the deleteUser function on the delete buttons

submit.addEventListener("click",getValues);//adding eventlistener to the submit button
submit.addEventListener("click",CreateTableFromJSON);//adding eventlistener to the submit button

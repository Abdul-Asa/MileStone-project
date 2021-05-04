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
const inputForm = document.querySelector("#inputForm");

//Initializing all the DOM elements


let people = [];
let json;
let uniqueID;
let rows = 0;


//Initializing variables to be used

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
        uniqueID = "#" + Math.floor(Math.random() * 9000); //Generates unique ID for each User
        let Person = {};
        Person["ID"] = uniqueID;
        Person["First name"] = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1);
        Person["Last name"] = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1);
        Person["Age"] = age.value;
        Person["Level"] = level.value;
        Person["Club"] = club.value.charAt(0).toUpperCase() + club.value.slice(1);
    

        people.push(Person);
        json = JSON.stringify(people);
        rows++;
        inputForm.reset();
        //Stores the object Person in the array people.
        //Turns the array of objects into JSON variable
        //Counts the no. of rows
        //resets row
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
        extraCell.innerHTML = "<button class='delete'>delete</button>";
        //add an extra cell for the delete button
    }

    let deleteButtons = document.querySelectorAll(".delete");//initialize the DOM of all the buttons using query selector all

    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].setAttribute("id",i+1);
    }
    //Assign an id for each new button

    for (let i=0;i<deleteButtons.length;i++) {
        deleteButtons[i].addEventListener("click",callBack);
    }//add an event listener on each button

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

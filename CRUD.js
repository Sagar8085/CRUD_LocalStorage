

var save= document.getElementById("save");
var update= document.getElementById("update");


            update.style.display="none";
            save.style.display="";


//-------------------------------------- get local storage -----------------------------------------

// const save = document.getElementById("save");

// save.addEventListener("click", validate);
// function validate(e) {
//     e.preventDefault();
//     const firstNameField = document.getElementById("name");
//     let valid = true;
//     if (!firstNameField.value) {
//         const nameError = document.getElementById("nameError");
//         nameError.classList.add("visible");
//         firstNameField.classList.add("invalid");
//         nameError.setAttribute("aria-hidden", false);
//         nameError.setAttribute("aria-invalid", true);
//       }
//       return valid;

//     }  












function getLocalStorageData(){
    var items = localStorage.getItem("users")
    var itemJson = JSON.parse(items);
    if (itemJson == null) {
        itemJson = [];
    }
    return itemJson;
}



//---------------- show List -----------------------------------

function listUsers(){
    let users = getLocalStorageData();
    var table= document.getElementById("list").innerHTML=""
    var table= document.getElementById("list")

    if (users != null)
    {        
        for (var i=0; i<users.length; i++)
        {
            if(users[i].status == "Active" || users[i].status == "Deactive") {
              table.insertRow().innerHTML = 
              "<td><input class='form-check-input' type='checkbox' value='' name='checkbox' id='checkbox'></td>"+
              "<td>" +users[i].name+ "</td>"+
              "<td>" +users[i].email+ "</td>"+
              "<td>" +users[i].number+ "</td>"+
              "<td>" +users[i].status+ "</td>"+
              '<td><button class="btn btn-outline-danger" onclick="editTableRow('+i+')">Edit</button><button class="btn btn-outline-danger" onclick="deleteTableRow('+i+')">Delete</button></td>';
            }
              
        }
    }
    // deleteListUsers()
// listUsers();
}
deleteListUsers()



//---------------- show Delete Row List -----------------------------------

function deleteListUsers(){
  let users = getLocalStorageData();
  var table= document.getElementById("Dlist").innerHTML=""
  var table= document.getElementById("Dlist")

  if (users != null)
  {        
      for (var i=0; i<users.length; i++)
      {
          if(users[i].status == "Deleted") {
            table.insertRow().innerHTML = 
            "<td><input class='form-check-input' type='checkbox' value='' name='checkbox' id='checkbox'></td>"+
            "<td>" +users[i].name+ "</td>"+
            "<td>" +users[i].email+ "</td>"+
            "<td>" +users[i].number+ "</td>"+
            "<td>" +users[i].status+ "</td>"+
            '<td><button class="btn btn-outline-danger" onclick="Restore('+i+')">Restore</button><button class="btn btn-outline-danger" onclick="deleteData('+i+')">Delete</button></td>';
          }
            
      }
  }
  // deleteListUsers()
listUsers();
}

// deleteListUsers()
// listUsers();

//-------------------------------------- Add Data in Table -----------------------------------------


var index=-1;
function addData()
{
    let isValidName = validateName();
    let isValidEmail = validateEmail();
    let isValidNumber = validateNumber();
    let checkAxistEmail= emailExists();
    let checkAxistNumber = numberExists();

    
    if(isValidName && isValidEmail && isValidNumber && checkAxistEmail==0 && checkAxistNumber==0){
        let users = getLocalStorageData();

        users.push({
            id:new Date().getTime().toString(),
            name:document.getElementById("name").value,
            email:document.getElementById("email").value,
            number:document.getElementById("number").value,
            status:document.getElementById("status").value
        });
        localStorage.setItem("users",JSON.stringify(users))
        listUsers();
        unFill();
        alert("data submitted...!!")
       
    }
}
listUsers();


//-------------------------------------- Active  -----------------------------------------

function active()
{
    let active1="Active";
    let myTable=document.getElementById("list")
    let tr=myTable.getElementsByTagName('tr')
    // console.log("myTable:- ",tr)
    for(var i=0; i<tr.length; i++ )
    {
        // let k=tr[i].getElementsByTagName('td')[4]
        let td=tr[i].getElementsByTagName('td')[4]
          
            if(td)
            {
            
                let textValue=td.textContent || td.innerHTML;
                // console.log("textValue:- ",textValue)
                if(textValue==active1)
                {                
                    tr[i].style.display=''
                }
                else{
                    tr[i].style.display="none"
                }
            }
      }
    
}    


//-----------------------------------------viewStatus DropDown------------------------------------------------------------

function viewStatus()
{
    let viewStatus1= document.getElementById("viewStatusID").value
    // console.log(viewStatus1)
    if(viewStatus1=="All")
    {
        listUsers()
        
    }
    else if(viewStatus1=="Active")
    {
        active()
        
    }
    else{
        deactive()
        
    }
}


//-------------------------------------- Deactive  -----------------------------------------

function deactive()
{
    let deactive1="Deactive";
    let myTable=document.getElementById("list")
    let tr=myTable.getElementsByTagName('tr')
    for(var i=0; i<tr.length; i++ )
    {
        let td=tr[i].getElementsByTagName('td')[4]
            if(td)
            {
                let textValue=td.textContent || td.innerHTML;
                if(textValue==deactive1)
                {                
                    tr[i].style.display=''
                }
                else{
                    tr[i].style.display="none"
                }
            }
    }
}    
// --------------------------Restore----------------------
function Restore(index)
{
    let users = getLocalStorageData();
    users[index].status="Active"
    localStorage.setItem("users",JSON.stringify(users))
    listUsers(); 
    deleteListUsers()
}




// --------------------------------------Delete Row from localStorage


function deleteData(index)
{
    let users = getLocalStorageData();
    users.splice(index, 1);
    localStorage.setItem("users",JSON.stringify(users))
    listUsers();  
    deleteListUsers()
}



//-------------------------------------- Delete Row  -----------------------------------------

function deleteTableRow(index)
{

    let users = getLocalStorageData();
    users[index].status="Deleted"
    localStorage.setItem("users",JSON.stringify(users))
    listUsers(); 
    deleteListUsers()
    // deleteListUsers() 
}
deleteListUsers()

//-------------------------------------- Edit Row  -----------------------------------------
var hidden= document.getElementById("hidden")

function editTableRow(index){
    let users = getLocalStorageData();

    document.getElementById("name").value= users[index].name
    document.getElementById("email").value= users[index].email
    document.getElementById("number").value= users[index].number
    document.getElementById("status").value= users[index].status
    hidden.value=users[index].id;
    update.style.display="";
    save.style.display="none";
       
}

//-------------------------------------- unfill  -----------------------------------------

function unFill(){
    document.getElementById("name").value=""
    document.getElementById("email").value= ""
    document.getElementById("number").value= ""
    document.getElementById("status").value= ""
}

//-------------------------------------- Search  -----------------------------------------
function searchFunction()
{

    

    let filter= document.getElementById("search").value.toUpperCase()
    let myTable=document.getElementById("list")
    let tr=myTable.getElementsByTagName('tr')
    for(var i=0; i<tr.length; i++ )


    {
          // console.log("statusView.textContent>> ")
           let td=tr[i].getElementsByTagName('td')[1]
            // console.log(td.textContent)
            if(td)
            {
                let textValue=td.textContent || td.innerHTML;
                // console.log(textValue)
                if(textValue.toLocaleUpperCase().indexOf(filter)>-1)
                {
                    tr[i].style.display=''
                   
                }
                else{
                    tr[i].style.display="none"
                }
            }       
    }
}    



//-------------------------------------- Update -----------------------------------------


const updateData=(index)=>
{
    let hiddenId= document.getElementById("hidden").value
    let users = getLocalStorageData();
   
    if(validateName() && validateEmail()){
   
    let demo=   users.map((e)=>
    {   
        if(hiddenId==e.id)
        {
            return {...e,
                name:document.getElementById("name").value,
                email:document.getElementById("email").value,
                number:document.getElementById("number").value,
                status:document.getElementById("status").value          
            }
        }
        return e;     
    })
    localStorage.setItem("users",JSON.stringify(demo))
    listUsers();  
    location.reload()
}}




//-------------------------------------- Delete All Check Data -----------------------------------------



checkButton=(index)=>
{
    let checkArray=[]
    let users = getLocalStorageData();
    checkboxes= document.getElementsByName("checkbox");
    for (var i=0; i<checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
        {
          
            checkArray.push(i)
        }  
    }
    for (let i=checkArray.length-1; i>=0; i--)
        {
         let val= checkArray[i]
         users[val].status="Deleted"
        }
    localStorage.setItem("users",JSON.stringify(users))
    listUsers();  
    deleteListUsers()
}


//-------------------------------------- check Data Swapping -----------------------------------------
// var checkDeleteDataArray=[]
// function swapData(index)
// {
 
//   let users = getLocalStorageData();
//   var table= document.getElementById("Dlist").innerHTML=""
//   var table= document.getElementById("Dlist")
//   checkboxes= document.getElementsByName("checkbox");
  
// //   if(index>0)
// //   {
// //     users[index].status="Deleted"   
// //     console.log("pass..!!") 
// //   }
// // else{
// //   console.log("pass2..!!") 
// //       for (var i=0; i<checkboxes.length; i++)
// //       {
// //         console.log("pass3..!!") 
// //           if(checkboxes[i].checked)
// //           {
// //             console.log("pass4..!!") 
// //             checkDeleteDataArray.push(i)

            
// //           }  
// //       };

//       if (users != null)
//       {
          
//           for (let i=checkDeleteDataArray.length-1; i>=0; i--)
//           {
//             // let changeStatus=do
          
//             let deleteRowIndex=checkDeleteDataArray[i]
//             // console.log("DListUsers:- ",checkDeleteDataArray[i])
//             let changeStatus=users[deleteRowIndex].status="Deleted"
//             console.log('changeStatus:- ',changeStatus)
//               table.insertRow().innerHTML = 
//                   "<th scope='row'>" + (i + 1).toString()+ "</th>" + 
//                   "<td><input class='form-check-input' type='checkbox' value='' name='checkbox' id='checkbox'></td>"+
//                   "<td>" +users[deleteRowIndex].name+ "</td>"+
//                   "<td>" +users[deleteRowIndex].email+ "</td>"+
//                   "<td>" +users[deleteRowIndex].number+ "</td>"+
//                   "<td style='color:red'>" +changeStatus+ "</td>"+
//                   '<td><button class="btn btn-outline-danger" onclick="editTableRow('+deleteRowIndex+')">Edit</button><button class="btn btn-outline-danger" onclick="deleteTableRow('+deleteRowIndex+')">Delete</button></td>';  
//       }  
//            }
//   // }
//   localStorage.setItem("users",JSON.stringify(users))
//   listUsers();  
// }





//-------------------------------------- Validation -----------------------------------------




//-------------------------------------- If Email is already exists-----------------------------------------
function emailExists()
{

    let email2= document.getElementById("email").value;
    let myTable=document.getElementById("list")
    let tr=myTable.getElementsByTagName('tr')
    let count= 0;
    for(var i=0; i<tr.length; i++ )
    {
        let td=tr[i].getElementsByTagName('td')[2]
            if(td.textContent==email2)
            {
                count=count+1;
            }
    }
    if(count>0)
    {
        alert("Email-Id is already exists....")
    }
    return count;
}    



//-------------------------------------- If number is already exists-----------------------------------------
function numberExists()
{

    let number2= document.getElementById("number").value;
    let myTable=document.getElementById("list")
    let tr=myTable.getElementsByTagName('tr')
    let count= 0;
    for(var i=0; i<tr.length; i++ )
    {
        let td=tr[i].getElementsByTagName('td')[3]
            if(td.textContent==number2)
            {
                count=count+1;
            }
    }
    if(count>0)
    {
        alert("Number is already exists....")
    }
    return count;
}    







// const form =document.getElementById("myform")


//-------------------------------------- Validation Name-----------------------------------------


var name1=document.getElementById("name");  
var number1=document.getElementById("number");  
var email1=document.getElementById("email");
var status1=document.getElementById("status");  



function validateName() {
    // check if is empty
    if (checkIfEmpty(name1)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(name1)) return;
    return true;
  }





function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
      // set field invalid
      setInvalid(field, `${field.name} must not be empty`);
      return true;
    } else {
      // set field valid
      setValid(field);
      return false;
    }
  }
  function isEmpty(value) {
    if (value === '') return true;
    return false;
  }
  function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    // field.nextElementSibling.style.color = red;
  }
  function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = green;
  }
  function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
      setValid(field);
      return true;
    } else {
      setInvalid(field, `${field.name} must contain only letters `);
      return false;
    }
  }

//-------------------------------------- Validation Status -----------------------------------------

  function validateStatus()
  {
    if (checkIfEmpty(status1)) return;

    return true;

  }


  //-------------------------------------- Validation Number-----------------------------------------
  function validateNumber() {
    if (checkIfEmpty(number1)) return;
    // if (number1.value.length==10) 
    // {
    //     setInvalid(field, `${field.name} Enter 10 digits `);
    //     return false;
    // }
    return true;
  }

  function checkLength(field)
  {
    if(number1.value.length==10){
        setValid(field);
        return true;
    }
    else {
        setInvalid(field, `${field.name} Enter 10 digits `);
        return false;
      }
  }


//-------------------------------------- Validation Email-----------------------------------------
  function validateEmail() {
    if (checkIfEmpty(email1)) return;
    if (!containsCharacters(email1, 5)) return;
    return true;
  }

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
      case 1:
        // letters
        regEx = /(?=.*[a-zA-Z])/;
        return matchWithRegEx(regEx, field, 'Must contain at least one letter');
      case 2:
        // letter and numbers
        regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
        return matchWithRegEx(
          regEx,
          field,
          'Must contain at least one letter and one number'
        );
      case 3:
        // uppercase, lowercase and number
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
        return matchWithRegEx(
          regEx,
          field,
          'Must contain at least one uppercase, one lowercase letter and one number'
        );
      case 4:
        // uppercase, lowercase, number and special char
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        return matchWithRegEx(
          regEx,
          field,
          'Must contain at least one uppercase, one lowercase letter, one number and one special character'
        );
      case 5:
        // Email pattern
        regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return matchWithRegEx(regEx, field, 'Must be a valid email address');
      default:
        return false;
    }
  }
  function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
      setValid(field);
      return true;
    } else {
      setInvalid(field, message);
      return false;
    }
  }
  


// nameValid=()=>
// {
//     if(name1=="")
//     {
//         alert("Please fill all feilds...!!")
//     }
// }

// function validation()
// {
  
//     if(name1=="" || num1=="" || email1=="")
//     {
//         alert("Please fill all feilds...!!")
//         return false;
//     }
//     if(name1.length>2)
//     {
//         alert("Name length  must be between 2 to 20")
//         return false;
//     }
//     if(!isNaN(name1))
//     {
//         alert("Only Char value is require")
//         return false;
//     }
//     if(isNaN(num1))
//     {
//         alert("only digits is are required.....!!")
//         return false;
//     }
//     if(num1.length<10)
//     {
//         alert("number must be 10 digits..!!")
//         return false;
//     }
//     if(email1.indexOf("@")<=0)
//     {
//         alert("Invalid Email...!!")
//         return false;
//     }
//     if(email1.charAt(email1.length-4)!='.')
//     {
//         alert("Invalid Email2...!!")
//         return false;
//     }


// }


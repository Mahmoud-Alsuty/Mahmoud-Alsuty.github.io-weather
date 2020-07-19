
// Global Variables 

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=91fd3fa8360884ac5fa35eecef126dfc';
//adding event listener when clicking on generate
document.getElementById('generate').addEventListener('click', generating);
function generating(){
  const feelings = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;
  gettingWeather(baseURL, zip, apiKey)
  
  .then(function(data){
      console.log(data);
      postData('/post',{date:newDate, temp:data.main.temp, content:feelings})
       })
      .then(updatingUI()
      )
  };

//Get route on client side to get web api data

const gettingWeather = async (baseURL, zip, key)=>{ 
const response = await fetch(baseURL+zip+key); 
 try { 
 const newData = await response.json(); 
 return newData
 }
 catch(error) { 
 console.log("error", error); // handling the error 
 }
 };
 
//asynchronous js  /post route 
const postData = async ( url, data = {})=>{ 
const response = await fetch(url, 
{ method: 'POST',
 credentials: 'same-origin', 
 headers: { 'Content-Type': 'application/json', 
 }, 
 body: JSON.stringify(data), 
 }); 
 try { 
 const newData = await response.json(); 
 return newData 
 }
 catch(error) { 
 console.log("error", error); // handling the error 
 }
 };
 
 //Updating the ui of webpage  /Get route on client side
const updatingUI = async ()=>{ 
const request = await fetch('/get'); 
 try { 
 const allData = await request.json(); 
 const num = allData[0].temp-273.15;
 const fixed = num.toFixed(1);
 document.getElementById('date').innerHTML = `The Date is ${allData[0].date}`;
 document.getElementById('temp').innerHTML = `The Temperature is ${fixed} celsius `;
 document.getElementById('content').innerHTML = `I feel ${allData[0].content}`;
 }
 catch(error) { 
 console.log("error", error); //handling the error 
 }
 };
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

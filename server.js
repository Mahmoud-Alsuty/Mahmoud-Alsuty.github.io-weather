//empty js object  as Endpoint
projectData=[];
// start with express
const express=require('express');
//instance app 
const app =express();
//project folder
app.use(express.static('website'));
//Dependences
const cors=require('cors');
const bodyParser=require('body-parser');
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// getting localhost
const port=8000;
const server=app.listen(port,function(){
    console.log("running");
    console.log(`running on local host:${port}`);
});
//post route
app.post('/post',function (request,response){
   console.log(request.body);
      newPost ={
       date:request.body.date,
       temp: request.body.temp,
       content:request.body.content
   }
   projectData.push(newPost);
   
});
//Get Route
app.get('/get',function (request,response){
   const project= response.send(projectData);
   projectData=[];
    return project;
});


//step-1 create a folder
//step-2 import package.json file (npm init)
//step-3 import express and mongoose (npm i express)(npm i mongoose)

//step-4
let  express=require('express');
let mongoose=require('mongoose');
let PORT=8085;
let app=express();


app.listen(PORT,(err,data)=>{
    if(err)
    {
        console.log("Unable to connect to server")
    }
    else
    {
        console.log(`Server is connected on port ${PORT}`)
    }
})

//step-5 connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/csmc').then(()=>{
    console.log("MongoDB Server is Connected on Port:27017")
})

//step-6 create a schema
let myschema=new mongoose.Schema({
    fname:String,
    lname:String,
    uname:String,
    roll:String,
    email:String,
    pass:String,
   // course:String,
    //gender:String
})

//step-7 Create a model
let mymodel=new mongoose.model('student2',myschema);

//step-8 create routes
/*
app.get('/spidey',(req,res)=>{
    let mydata=new mymodel({fname:'spidey',lname:'koti',rno:'143'});
    //to store the data into collection
    mydata.save().then(()=>{
        res.send('Data inserted')
    });
})
*/
app.get('/reg',(req,res)=>{
    res.sendFile(__dirname+'/reg.html')
})

app.get('/register',(req,res)=>{
    
    let mydata=new mymodel({
        fname:req.query.fname,
        lname:req.query.lname,
        uname:req.query.uname,
        rno:req.query.rno,
        email:req.query.mail,
        pass:req.query.pass
        //course:req.query.cname,
        //gender:req.query.gen1,
    });
    //to store the data into collection
    mydata.save().then(()=>{
        res.send('Registration is successful')
    });
})
app.get('/login',(request,response)=>{
    response.sendFile(__dirname+'/login.html');
})  


app.get('/showdata', (req, res) => {
    mymodel.find({}).then((data) => {
        let tableHTML = '<h1 align="center">User Details</h1><table border="1" align="center"><tr><th>FirstName</th><th>LastName</th><th>Username</th><th>RollNo</th><th>Password</th><th>Email</th></tr>';

        for (let d of data) {
            tableHTML += `<tr><td>${d.fname}</td><td>${d.lname}</td><td>${d.uname}</td><td>${d.rno}</td><td>*******</td><td>${d.email}</td></tr>`;
        }

        tableHTML += '</table>';

        // Sending the HTML with user details in table format as a response
        res.send(tableHTML);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});
app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/login.html');
});

app.get('/log', (request, response) => {
    let username = request.query.uname; // from client
    let password = request.query.pass; // from client
    let flag = 0;

    mymodel.find({ uname: username, pass: password })
        .then((users) => {
            if (users.length > 0) {
                flag = 1;
                response.sendFile(__dirname + '/success.html');
            } else {
                response.sendFile(__dirname + '/fail.html');
            }

            if (flag === 0) {
                response.sendFile(__dirname + '/fail.html');
            }
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send('Internal Server Error');
        });
});

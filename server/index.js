var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
var connectionString = "mongodb://127.0.0.1:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get("/getusers", (req, res) => {
    mongoClient.connect(connectionString,(err, clientObj)=>{
        if(!err){
            var database=clientObj.db("northwind");
            database.collection("tbluserRegister").find({}).toArray((err,documents)=>{
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
});

app.post("/registeruser",(req,res)=>{
    var data={
        userName:req.body.userName,
        Mobile:req.body.Mobile,
        Email:req.body.Email,
        Password:req.body.Password,
        City:req.body.City,
        State:req.body.State,
        Postal:parseFloat(req.body.Postal),
        Address:req.body.Address,
        Payment:req.body.Payment
    };
    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("northwind");
            database.collection("tbluserRegister").insertOne(data,function(err,result){
                if(!err){
                    console.log("Record Inserted..");
                }
            })
        }
    })
});
app.listen(4000);
console.log(`Server Started http://localhost:4000`);

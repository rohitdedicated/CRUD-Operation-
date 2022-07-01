var mongoClient=require("mongodb").MongoClient;
var express=require("express");
var cors=require("cors");

var app=express();
var connectionString="mongodb://127.0.0.1:27017";

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cors());

app.get("/categories",(req,res)=>{
    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("demodb");
            database.collection("tblcategories").find({}).toArray((err,documents)=>{
                if(!err){
                    res.send(documents)
                }
            })
        }
    })
});

app.get("/products",(req,res)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var database=clientObj.db("demodb");
            database.collection("tblproducts").find({}).toArray((err,documents)=>{
                if(!err){
                    res.send(documents)
                }
            })
        }
    })
})
/*........................................................................................... */

app.get("/products/:id",(req,res)=>{
    var id=parseInt(req.params.id);

    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var database=clientObj.db("demodb");
            database.collection("tblproducts").find({ProductId:id}).toArray((err,documents)=>{
                if(!err){
                    res.send(documents)
                }
            })
        }
    })
});

/*........................add product....................................................... */

app.post("/addproduct",(req,res)=>{
    var data={
        ProductId:parseInt(req.body.ProductId),
        Name:req.body.Name,
        Price:parseFloat(req.body.Price),
        Stock:(req.body.Stock=="true")?true:false,
        Category:req.body.Category,
        Rating:parseFloat(req.body.Rating)
    };
    mongoClient.connect(connectionString,((err,clientObj)=>{
        if(!err){
            var database=clientObj.db("demodb");
            database.collection("tblproducts").insertOne(data,(err,result)=>{
                if(!err){
                    console.log("Record Inserted..");
                }
            })
        }
    }))
});
/*.......................Update........................................................... */

app.patch("/updateproduct/:id",(req,res)=>{
    var id=parseInt(req.params.id);

    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var database=clientObj.db("demodb");
            database.collection("tblproducts").updateOne({ProductId:id},{$set:{Name:req.body.Name,Price:parseFloat(req.body.Price),Stock:(req.body.Stock=="true")?true:false,Rating:parseFloat(req.body.Rating)}},(err,result)=>{
                if(!err){
                    console.log("Record Updated..");
                }
            })
        }
    })
});
/*........................delete..................................... */
app.delete("/deleteproduct/:id",(req,res)=>{
    var id=parseInt(req.params.id);

    mongoClient.connect(connectionString,function(err,clientObj){
        if(!err){
            var database=clientObj.db("demodb");
            database.collection("tblproducts").deleteOne({ProductId:id},(err,result)=>{
                if(!err){
                    console.log("Record Deleted..");
                }
            })
        }
    })
});

app.listen(4300);
console.log("Server Started:http://localhost:4300");
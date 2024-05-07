const{Name}=require("ejs");
const express=require("express");
const port=8081;
const app=express();

app.use(express.urlencoded())
 
app.set("view engine","ejs");


let taskData=[]

app.get("/",(req,res)=>{
    return res.render('home',{
        Addtask:taskData
    })
    // return res.render('home')
});
let index=0
app.post('/insertion',(req,res)=>{
    console.log(req.body)
    
    let obj={
        id:++index,
        task:req.body.task
    }
    taskData.push(obj);
    res.redirect('/')

})
app.get('/deletData',(req,res)=>{
    let data=req.query.id
    console.log(data);
    let datatask=taskData.filter((val)=>{
        return val.id!=data
    })
    taskData=datatask
    return res.redirect("back")
})
app.get('/editData',(req,res)=>{
    let data=req.query.id

    console.log(data,"pp");
     let datatask=taskData.filter((curdata)=>{
        return curdata.id==data
     })
     return res.render('edit',{
        Addtask:datatask[0]
     })
})
app.post('/editData',(req,res)=>{
    let id=req.body.id
    console.log('req.body')
    console.log(req.body)       
    let data=req.body.task
    let edata=taskData.filter((curdata)=>{
        console.log(curdata)
        if (curdata.id==id) {
            curdata.task=req.body.task
            curdata.id=id
        }
        return curdata;
    });
    taskData=edata;
    return res.redirect('/');
})
app.listen(port,(err)=>{
    if (err) {
        console.log("not working" )
    } else {
        console.log("server  http://localhost:"+port);
        
    }
})

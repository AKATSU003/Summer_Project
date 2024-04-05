import express from "express"
import mysql from "mysql"


const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"summer"
})

app.use(express.json())


//Show broadcast in broadcast page//
app.get("/broadcast", (req,res)=>{
    const q = "SELECT BName, BStatus, BTag, Start_BSchedule, End_BSchedule FROM broadcast"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

//Craete broadcast in broadcast page//
app.post("/broadcast" , (req,res)=>{
    const q = "INSERT INTO broadcast (`BName`,`BStatus`,`BTag`,`BFrom`,`BRecipient`,`Start_BSchedule`,`End_BSchedule`,`TID`,`AID`) VALUES(?)";
    const values = [
        req.body.BName,
        req.body.BStatus,
        req.body.BTag,
        req.body.BFrom,
        req.body.BRecipient,
        req.body.Start_BSchedule,
        req.body.End_BSchedule,
        req.body.TID,
        req.body.AID
    ];

    db.query(q , [values] , (err,data)=>{
        if(err) return res.json(err)
        return res.json("Broadcast is created successfully!");
    })
})

app.post("/broadcast" , (req,res)=>{
    const q = "INSERT INTO broadcast (`BID`) VALUES(?)";
    const values = [
        req.body.BID
    ];

    db.query(q , [values] , (err,data)=>{
        if(err) return res.json(err)
        return res.json("Broadcast is created successfully!");
    })
})

// listen port 8800 //
app.listen(8800, ()=>{
    console.log("Connected to backend")
})
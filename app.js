const express = require('express');
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require('path');
require('jsdom-global')()
const bootstrap = require('bootstrap');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const multer = require('multer');
const console = require('console');


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database : "JPR"
  });


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
const  router = express.Router();

const app = express();
const port = 3200;

app.set('view engine','ejs');

app.use(bodyParser.json());

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port,()=>console.log(`http://localhost:${port}`));

app.use(express.static('public'))

app.get('/',(req,res) => {
  res.render('login.ejs')
});

app.get('/admin',(req,res)=>{
    res.render('admin.ejs');
});

app.get('/adminselect',(req,res)=>{
  res.render('adminselect.ejs');
});


app.get('/photo',(req,res)=>{
  res.render('photo.ejs')
})

app.post('/submit',(req,res)=>{

for( i in req.body){
    if (req.body[i]=="") 
      req.body[i]="NONE";
  }
  
  var  {STUDENT,Title,Initial,StudentEmail,Rollno,DEPARTMENT,BG,BoardingPoint,BusNumber,Caste,Community,Dateofjoin,Cutoff,Physics,Chemistry,Maths,DOB,Identification,PlaceofBrith,ExtraActivities,Gender,MotherTongue,Medium,AadharNo,StudentMobile,RELIGION,tenthpercentage,tenthMarks,School,Tenthpassed,twelthpercent,twelthmarks,twelthschool,twelthPassed,FatherName,FatherQualification,FatherOccupation,FatherMobile,FatherEmail,FatherIncome,MotherName,MotherQualification,MotherOccupation,MotherMobile,MotherEmail,MotherIncome,GuardianName,GuardianMobile,GuardianAddress,PermanentAddressLine1,CommunicationAddressLine1,PermanentAddressLine2,PermanentAddressLine3,CommunicationAddressLine2,CommunicationAddressLine3,Diploma,diplonacollege,Diplomayear,DayScholarorHostel,VegorNonveg,PhysicallyHandicapped} = req.body;
  

  if(req.body[DayScholarorHostel]==undefined){
    DayScholarorHostel = "NIL"
  }
  // DayScholarorHostel,VegorNonveg,PhysicallyHandicapped
  if(req.body[VegorNonveg]==undefined){
    VegorNonveg = "NIL"
  }
  if(req.body[PhysicallyHandicapped]==undefined){
    PhysicallyHandicapped = "NIL"
  }
  if(req.body[PlaceofBrith]==undefined){
    PlaceofBrith  = "NIL"
  }
    let sql = `INSERT INTO studentdetail (Dateofjoin,Rollno,Title,STUDENT ,Initial,DayScholarorHostel,DEPARTMENT,DOB,RELIGION,BG,StudentMobile ,StudentEmail,AadharNo,Identification,PlaceofBrith,ExtraActivities,tenthpercentage,tenthMarks,School,Tenthpassed,twelthpercent,twelthmarks,twelthschool,twelthPassed,Physics,Chemistry,Maths,Cutoff,Medium,Diploma,diplonacollege,Diplomayear,BusNumber,BoardingPoint,Community,Caste,MotherTongue,Gender,VegorNonveg,PhysicallyHandicapped,PermanentAddressLine1,PermanentAddressLine2,PermanentAddressLine3,CommunicationAddressLine1,CommunicationAddressLine2,CommunicationAddressLine3,FatherName,FatherQualification,FatherOccupation,FatherMobile,FatherEmail ,FatherIncome,MotherName,MotherQualification,MotherOccupation,MotherMobile,MotherEmail,MotherIncome,GuardianName,GuardianMobile,GuardianAddress) VALUES ('${Dateofjoin}','${Rollno}','${Title}','${STUDENT} ','${Initial}','${DayScholarorHostel}','${DEPARTMENT}','${DOB}','${RELIGION}','${BG}','${StudentMobile} ','${StudentEmail}','${AadharNo}','${Identification}','${PlaceofBrith} ','${ExtraActivities}','${tenthpercentage}','${tenthMarks}','${School}','${Tenthpassed}','${twelthpercent}','${twelthmarks}','${twelthschool}','${twelthPassed}','${Physics}','${Chemistry}','${Maths}','${Cutoff}','${Medium}','${Diploma}','${diplonacollege}','${Diplomayear}','${BusNumber}','${BoardingPoint}','${Community}','${Caste}','${MotherTongue}','${Gender}','${VegorNonveg}','${PhysicallyHandicapped}','${PermanentAddressLine1}','${PermanentAddressLine2}','${PermanentAddressLine3}','${CommunicationAddressLine1}','${CommunicationAddressLine2}','${CommunicationAddressLine3}','${FatherName}','${FatherQualification}','${FatherOccupation}','${FatherMobile}','${FatherEmail} ','${FatherIncome}','${MotherName}','${MotherQualification}','${MotherOccupation}','${MotherMobile}','${MotherEmail}','${MotherIncome}','${GuardianName}','${GuardianMobile}','${GuardianAddress}');`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
    return res.render('sucess.ejs');
  }); 
  // return res.send(req.body)
});

app.post('/student',(req,res)=>{
  var {Rollno} = req.body;
  let sql = `SELECT * FROM studentdetail where Rollno = '${Rollno}'`;
  con.query(sql, (err, rows) => {
    console.log(rows)
    if (err) throw err;
    return res.render('student.ejs',{result:rows[0]});
  });
})

// 312320205165 28 apr 2002
// 20IT108

app.get('/details',(req,res)=>{
  let sql = `SELECT * FROM studentdetail`;

  con.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(rows)
    let date =  ""+new Date().getFullYear();
    year = Number(date.slice(2,4));
    rows = Object.values(JSON.parse(JSON.stringify(rows)));
    four = [];
    three = new Array;
    sec =  new Array;
    first =  new Array;
    for(i of rows){
      r = i.Rollno;
      console.log(r)
      if(r.slice(0,2)==year-4){
        
        four.push(i);
      }
      if(r.slice(0,2)==year-3){
        
        three.push(i);
      }
      if(r.slice(0,2)==year-2){
        
        sec.push(i);
      }
      if(r.slice(0,2)==year-1){

        first.push(i);
      }
    }
    return res.render('details.ejs',{four:four,three:three,sec:JSON.stringify(sec),first:first});
  });
})





app.post('/upload', (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/public/'+req.body.Rollno+sampleFile.name;
  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

      con.query(`UPDATE studentdetail SET photo = ? WHERE Rollno ='${req.body.Rollno}'`, [sampleFile.name], (err, rows) => {
        if (!err) {
          console.log(rows)
          res.render('sucess.ejs');
        } else {
          console.log(err);
        }
      });
    });
});

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');
const mysql = require('mysql');
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname,"./public","/homepage.html"));
})

app.use(bodyParser.json());
app.post("/search", function(req, res){
  var obj=req.body;
  var query='select * from documents, topics';
  var entered = false;
  if (obj.year.length) {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    for (var i = 0; i < obj.year.length; i++) {
      if (i) {
        query += ' or ';
      }
      query +=  "doc_date_asked = '" + obj.year[i] + "'";
    }
    query += ')';
  }
  if (obj.collegeYears.length) {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    for (var i = 0; i < obj.collegeYears.length; i++) {
      if (i) {
        query += ' or ';
      }
      query +=  "doc_year = '" + obj.collegeYears[i] + "'";
    }
    query += ')';
  }
  if (obj.examType.length) {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    for (var i = 0; i < obj.examType.length; i++) {
      if (i) {
        query += ' or ';
      }
      query +=  "doc_exam = '" + obj.examType[i] + "'";
    }
    query += ')';
  }
  if (obj.topics.length) {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    for (var i = 0; i < obj.topics.length; i++) {
      if (i) {
        query += ' or ';
      }
      query +=  "topic = '" + obj.topics[i] + "'";
    }
    query += ')';
  }
  if (obj.subjects.length) {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    for (var i = 0; i < obj.subjects.length; i++) {
      if (i) {
        query += ' or ';
      }
      query +=  "doc_subject = '" + obj.subjects[i] + "'";
    }
    query += ')';
  }
  if (entered) {
    query += ' and';
  }else {
    query += ' where';
  }
  query += ' documents.doc_id=topics.doc_id group by documents.doc_id order by documents.doc_id desc';
  res.send(query);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "freespace"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    console.log(query);
    con.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});

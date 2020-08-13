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
  // console.log(typeofreq.body);
  // console.log(typeof obj.subjects);
  console.log(req.body);
  var obj=req.body;
  var query='select * from documents, topics';
  var entered = false;
  if (typeof obj.year != 'undefined') {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    if (typeof obj.year == 'string') {
      query += "doc_date_asked = '"+obj.year+"'";
    } else {
      for (var i = 0; i < obj.year.length; i++) {
        if (i) {
          query += ' or ';
        }
        query +=  "doc_date_asked = '" + obj.year[i] + "'";
      }
    }
    query += ')';
  }
  if (typeof obj.collegeYears != 'undefined') {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    if (typeof obj.collegeYears == 'string') {
      query += "doc_year = '"+obj.collegeYears+"'";
    } else {
      for (var i = 0; i < obj.collegeYears.length; i++) {
        if (i) {
          query += ' or ';
        }
        query +=  "doc_year = '" + obj.collegeYears[i] + "'";
      }
    }
    query += ')';
  }
  if (typeof obj.examType != 'undefined') {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    if (typeof obj.examType == 'string') {
      query += "doc_exam = '"+obj.examType+"'";
    } else {
      for (var i = 0; i < obj.examType.length; i++) {
        if (i) {
          query += ' or ';
        }
        query +=  "doc_exam = '" + obj.examType[i] + "'";
      }
    }
    query += ')';
  }
  if (typeof obj.topics != 'undefined') {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    if (typeof obj.topics == 'string') {
      query += "topic = '"+obj.topics+"'";
    } else {
      for (var i = 0; i < obj.topics.length; i++) {
        if (i) {
          query += ' or ';
        }
        query +=  "topic = '" + obj.topics[i] + "'";
      }
    }
    query += ')';
  }
  if (typeof obj.subjects != 'undefined') {
    if (!entered) {
      query += ' where (';
    }else {
      query += ' and (';
    }
    entered=true;
    if (typeof obj.subjects == 'string') {
      query += "doc_subject = '"+obj.subjects+"'";
    } else {
      for (var i = 0; i < obj.subjects.length; i++) {
        if (i) {
          query += ' or ';
        }
        query +=  "doc_subject = '" + obj.subjects[i] + "'";
      }
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
    con.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});

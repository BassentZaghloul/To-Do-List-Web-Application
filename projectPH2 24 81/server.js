var express = require('express');
var app = express();
var fs = require("fs");
var user_id=0;
var bodyParser = require('body-parser');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'));

app.use(bodyParser.json());

  app.use(session({
 secret: "ok",
 resave: true,
 saveUninitialized: false,

}));

app.get('/', function (req, res) {
 res.sendFile( __dirname + "/" + "Registeration.html" );

 
})

  
  app.get('/To-doList.html', function (req, res) {
    if(req.session.email){
      res.sendFile( __dirname + "/" + "To-doList.html" );
    }
    else{
      res.sendFile( __dirname + "/" + "Registeration.html" );
    }
})

app.post('/ajaxRequest', function(req, res){
  a=req.body.allTasksArray;
  b=req.body.inprogressArray;
  c=req.body. completedArray;
  d=req.body.archivedArray;
  e=req.body.idbutton;
  f=req.body.idtask;
  g=req.body.state;
  

  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
   
     data[req.session.authenticatedUser].allTasksArray = a;
     data[req.session.authenticatedUser].inprogressArray = b;
     data[req.session.authenticatedUser].completedArray=c;
     data[req.session.authenticatedUser].archivedArray=d;
     data[req.session.authenticatedUser].idbutton=e;
     data[req.session.authenticatedUser].idtask=f;
     data[req.session.authenticatedUser].state=g;

     //console.log(data[authenticatedUser].name +" "+ data[authenticatedUser].allTasksArray[1]);
     fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data), function (err) {
        if (err) return console.log(err +"Json file not found.");
        
      });

  res.contentType('json');
  res.send({ some: JSON.stringify({response:'json'}) });
});
})
app.post('/register', urlencodedParser, function (req, res) {
  username = req.body.username;
  req.body.username="";
  email=req.body.email;
  req.body.email="";
  password = req.body.password;
  req.body.password="";

fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    if (err) return console.log(err +"Json file not found.");
    else{
    data = JSON.parse( data );
    var flag = 0;
    for (var user in data) {
      if(email == data[user].email){

      flag = 1;
    
       break;}
      
    
      else{
      flag = 0; 
      }
    }
if(flag == 1){
  
res.redirect("/RE404.html");
       app.get("/RE404.html", function (req, res) {
       
      res.sendFile( __dirname + "/" + "RE404.html" );

     })
      

res.end();
  
}

else{
 for (var user in data) {
  if(data[user].id !=null){
user_id=data[user].id;
}

 }

user_id++;




var user = {
      "user": {
      "name" : username,
      "password" : password,
      "email" : email ,
      "id": user_id,
      "allTasksArray":"",
      "inprogressArray":"",
      "completedArray":"",
      "archivedArray":"",
      "idbutton":"",
      "idtask":"",
      "state":"",
} }
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user"+user_id]=user["user"];
        
      req.session.authenticatedUser = "user"+user_id;
       user_id++;
    
  req.session.email = email;
  req.session.save(function(){console.log("saved")});
    res.redirect("/Registeration.html");
       app.get('/Registeration.html', function (req, res) {
      res.sendFile( __dirname + "/" + "Registeration.html" );
})
       res.end( JSON.stringify(data));

      
  

       fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data), function (err) {
          if (err) return console.log(err);
         // console.log(JSON.stringify(data));
        })

    });

   
  
}
    }
});

})


app.post('/signout', urlencodedParser, function (req, res) {
 
      req.session.destroy();
      res.redirect("/Registeration.html");
       app.get('/Registeration.html', function (req, res) {
      res.sendFile( __dirname + "/" + "Registeration.html" );
});

   


  })
    
app.post('/signin', urlencodedParser, function (req, res) {

  email = req.body.email;
  password = req.body.password;
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    
        if (err) return console.log(err +"Json file not found.");
   else{
    data = JSON.parse( data );
    var flag = 0;
    for (var user in data) {
      if( email == data[user].email){
      flag=1;
      if( password == data[user].password){
    flag = 2; req.session.authenticatedUser = user;
  req.session.save(function(){console.log("saved")});

     break;}
   break;}
      else{flag = 0;  }
    }
    if(flag == 2){
     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, tables_data) {
    
     tables_data = JSON.parse(tables_data);
   
    req.session.email=email;
  req.session.save(function(){console.log("saved")});
    res.redirect("/To-doList.html");
  app.get('/To-doList.html', function (req, res) {
      res.sendFile( __dirname + "/" + "To-doList.html" );
})
       res.end();
      });
     

    }
    else if(flag ==1){
      
       res.redirect("/SP404.html");  
       app.get("/SP404.html", function (req, res) {
       
      res.sendFile( __dirname + "/" + "SP404.html" );

     })
      

res.end();
  
  }
  else if(flag ==0){
    res.redirect("/SU404.html");
       app.get("/SU404.html", function (req, res) {
       
      res.sendFile( __dirname + "/" + "SU404.html" );

     })
      

res.end();
  }
   }
  });
  
 })
 
app.post('/create', function(req, res){
fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, tables_data) {
  if (err) return console.log(err +"Json file not found.");
  else{
        tables_data = JSON.parse(tables_data);
    var ok ={
  allTasksArray:tables_data[req.session.authenticatedUser].allTasksArray,
  inprogressArray:tables_data[req.session.authenticatedUser].inprogressArray,
  completedArray:tables_data[req.session.authenticatedUser].completedArray,
  archivedArray:tables_data[req.session.authenticatedUser].archivedArray,
  idbutton:tables_data[req.session.authenticatedUser].idbutton,
  idtask:tables_data[req.session.authenticatedUser].idtask,
  state:tables_data[req.session.authenticatedUser].state,
  name:tables_data[req.session.authenticatedUser].name
}
      // console.log(ok);
   // console.log("yady elnela");
     
       res.send(ok);
        fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(tables_data), function (err) {
          if (err) return console.log(err);
        })
  
}
})
})
var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
  
  
 console.log("Example app listening at http://%s:%s", host, port);
})
/*
var express = require('express');
var app = express();
var fs = require("fs");
//var user_id=0;
var bodyParser = require('body-parser');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//var authenticatedUser = null;


app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', function (req, res) {
 res.sendFile( __dirname + "/" + "Registeration.html" );
})
app.use(session({
secret:'yarab',
resave:true,
saveUninitialized:false
}))




app.post('/ajaxRequest', function(req, res){
  a=req.body.allTasksArray;
  b=req.body.inprogressArray;
  c=req.body. completedArray;
  d=req.body.archivedArray;
  e=req.body.idbutton;
  f=req.body.idtask;
  g=req.body.state;

  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );

      for(var user in data){
        if(data[user].email=req.session.email){
          authenticatedUser=user;
          break;
        }
      }

     data[authenticatedUser].allTasksArray = a;
     data[authenticatedUser].inprogressArray = b;
     data[authenticatedUser].completedArray=c;
     data[authenticatedUser].archivedArray=d;
     data[authenticatedUser].idbutton=e;
     data[authenticatedUser].idtask=f;
     data[authenticatedUser].state=g;

     //console.log(data[authenticatedUser].name +" "+ data[authenticatedUser].allTasksArray[1]);
     fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data), function (err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(data));
      });

  res.contentType('json');
  res.send({ some: JSON.stringify({response:'json'}) });
});
})
app.post('/register', urlencodedParser, function (req, res) {
  username = req.body.username;
  req.body.username="";
  email=req.body.email;
  req.body.email="";
  password = req.body.password;
  req.body.password="";

fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var flag = 0;
    for (var user in data) {
      if(email == data[user].email){

      flag = 1;
    
       break;}
      
    
      else{
      flag = 0; 
      }
    }
if(flag == 1){
  
res.redirect("/RE404.html");
       app.get("/RE404.html", function (req, res) {
       
      res.sendFile( __dirname + "/" + "RE404.html" );

     })
      

res.end();
  
}

else{
 for (var user in data) {
  if(data[user].id !=null){
user_id=data[user].id;
}
 }
user_id++;
var user = {
      "user": {
      "name" : username,
      "password" : password,
      "email" : email ,
      "id": user_id,
      "allTasksArray":"",
      "inprogressArray":"",
      "completedArray":"",
      "archivedArray":"",
      "idbutton":"",
      "idtask":"",
      "state":"",
} }
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user"+user_id]=user["user"];
        
      authenticatedUser = "user"+user_id;
      req.session.email=email;
     
     req.session.save(function(){
      console.log("saved")
     });
       user_id++;
       res.redirect("/To-doList.html");
       app.get('/To-doList.html', function (req, res) {
      res.sendFile( __dirname + "/" + "To-doList.html" );
})
       res.end( JSON.stringify(data));

      
  

       fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data), function (err) {
          if (err) return console.log(err);
        })

    });
}
});

})

app.post('/signout', urlencodedParser, function (req, res) {
 
 
      res.redirect("/Registeration.html");
       app.get('/Registeration.html', function (req, res) {
      res.sendFile( __dirname + "/" + "Registeration.html" );
});
       
  })
app.post('/signin', urlencodedParser, function (req, res) {

  email = req.body.email;
  password = req.body.password;
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var flag = 0;
    for (var user in data) {
      if( email == data[user].email){
      flag=1;
      if( password == data[user].password){
    flag = 2; authenticatedUser = user;
     break;}}
      else{flag = 0;  }
    }
    if(flag == 2){
     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, tables_data) {
        tables_data = JSON.parse(tables_data);
        req.session.email=email;
        req.session.save(function(){
      console.log("saved")
     });
    res.redirect("/To-doList.html");
  app.get('/To-doList.html', function (req, res) {
      res.sendFile( __dirname + "/" + "To-doList.html" );
})
       res.end();
      });
     

    }
    else if(flag ==1){
      
       res.redirect("/SP404.html");  
       app.get("/SP404.html", function (req, res) {
       
      res.sendFile( __dirname + "/" + "SP404.html" );

     })
      

res.end();
  
  }
  else if(flag ==0){
    res.redirect("/SU404.html");
       app.get("/SU404.html", function (req, res) {
       
      res.sendFile( __dirname + "/" + "SU404.html" );

     })
      

res.end();
  }
  });
 })
 
app.post('/create', function(req, res){
fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, tables_data) {
        tables_data = JSON.parse(tables_data);



for(var user in tables_data){
     if(tables_data[user].email==req.session.email){
          authenticatedUser=user;
          break;
     }
}





    var ok ={
  name:tables_data[authenticatedUser].name,
  allTasksArray:tables_data[authenticatedUser].allTasksArray,
  inprogressArray:tables_data[authenticatedUser].inprogressArray,
  completedArray:tables_data[authenticatedUser].completedArray,
  archivedArray:tables_data[authenticatedUser].archivedArray,
  idbutton:tables_data[authenticatedUser].idbutton,
  idtask:tables_data[authenticatedUser].idtask,
  state:tables_data[authenticatedUser].state,
}
       console.log(ok);
     
       res.send(ok);
        fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(tables_data), function (err) {
          if (err) return console.log(err);
        })
  
  
})
})
var server = app.listen(8081, function () {
var user_id=0;

var authenticatedUser = null;

 var host = server.address().address
 var port = server.address().port
 console.log("Example app listening at http://%s:%s", host, port);
}) */
const express = require('express');  
const bodyParser = require('body-parser');  
const path = require('path');  
const NodeCouchdb = require('node-couchdb');  
const { fchown } = require('fs');
const couch = new NodeCouchdb({  
    auth:{  
        user: 'admin',
        password: 'tips112'  
    }  
    });  

    const dbname = 'my_db';
    const viewUrl = '_design/task-view/_view/task-view';

   

    // var req;
    // var res;
    // couch.listDatabases().then(function(req,res){  
    //     //console.log(dbs);  
    //     couch.get(dbname,viewUrl).then(function(data, headers, status){
    //         console.log(data.data.rows);
    //         res.render('views/index',{
    //             tasks : data.data.rows
    //         });
    //     },
    //     function(err){
    //         res.send(err);
    //     }
    //     );
    // });  
const app = express();  
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));  
app.use (bodyParser.json());  
app.use(bodyParser.urlencoded({extended: false}));  

app.get('/', function(req, res) {
    //res.render('index');
          couch.get(dbname,viewUrl).then(function(data, headers, status){
            console.log(data.data.rows);
            res.render('index',{
                tasks : data.data.rows
            });
        },function(err){
            res.send(err);
        });
});

app.post('/task/add', function(req, res) {
   const description = req.body.description;
   const priority = req.body.priority;
   const status = req.body.status;
   //res.send(status);
if(!description=="" && !priority==""&&!status=="")
{
    couch.uniqid().then(function(ids){
        const id = ids[0];
        couch.insert(dbname,{
            id:id,
            description:description,
            priority:priority,
            status:status
        }).then(function(data, headers, status){
            res.redirect('/');
        },function(err){
            res.send(err);
        });
       });
}
  

});


app.post('/task/delete/:id', function(req, res) {
    const rev = req.body.rev;
    const id = req.params.id;
    if(!id=="" && !rev=="")
    {
        couch.del(dbname,id,rev).then(function(data, headers, status){
            res.redirect('/');
        },function(err){
            res.send(err);
        });
    }
 
    });


    app.get('/task/edit/:id', function(req, res) {
        //res.render('index');
        const _id = req.params.id;
        //const _rev = req.params._rev;
              couch.get(dbname,_id).then(function(data, headers, status){
              
                res.render('Edit',{
                   id:_id,
                   rev:data.data._rev,
                   description:data.data.description,
                   priority:data.data.priority,
                   status:data.data.status
                });
            },function(err){
                res.send(err);
            });
    });

    app.post('/task/update/:id', function(req, res) {

        var task = {  
            _id: req.body.id,
            _rev: req.body.rev,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status
          };
  
        couch.update(dbname,task).then(function(data, headers, status){
             res.redirect('/');
         },function(err){
             res.send(err);
         });
        });

    function deletetask(id) {
            alert(id);
        }

app.listen(3000, function(){  
    console.log('Server is started om Port 3000');  
   });  
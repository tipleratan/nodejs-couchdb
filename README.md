# nodejs-couchdb
Node js with couch-db with EJS


Source Code :

https://github.com/tipleratan/nodejs-couchdb.git

Front End :

http://localhost:3000/

Back End :

http://localhost:5984/_utils/#login

User Name : admin
Password : tips112

Database Name : my_db

Sample data :

{
 "id": "31c652f73bc8049036d0a3c85f001960",
 "key": "31c652f73bc8049036d0a3c85f001960",
 "value": {
  "rev": "8-7c911572d774f1e76893131546609b4c"
 },
 "doc": {
  "_id": "31c652f73bc8049036d0a3c85f001960",
  "_rev": "8-7c911572d774f1e76893131546609b4c",
  "description": "Task 1",
  "priority": "High",
  "status": "Closed"
 }
}

Map Function :

function (doc) {
  emit(doc._id, {description:doc.description,priority:doc.priority,status:doc.status,rev:doc._rev});
}

View Name : task-view 

{
 "id": "_design/task-view",
 "key": "_design/task-view",
 "value": {
  "rev": "1-8e653395004fdfc14a4d198742c3c7a3"
 },
 "doc": {
  "_id": "_design/task-view",
  "_rev": "1-8e653395004fdfc14a4d198742c3c7a3",
  "views": {
   "task-view": {
    "map": "function (doc) {\n  emit(doc._id, {description:doc.description,priority:doc.priority,status:doc.status,rev:doc._rev});\n}"
   }
  },
  "language": "javascript"
 }
}

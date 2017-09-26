// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongoDB serever');
  }
  console.log('Connected to mongoDB server');

<<<<<<< HEAD
  db.collection('Todos').insertOne({
    text: 'Something to do',
    complete: false
  }, (err, res) => {
    if(err) {
      return console.log('Unable to intert todo');
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  });
  db.collection('Users').insertOne({
    name: 'Dylan Kelly',
    age: 22,
    address: 'Maryland'
  }, (err, res) => {
    if(err) {
      return console.log('unable o insert data');
    }
    console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
  });
=======
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   complete: false
  // }, (err, res) => {
  //   if(err) {
  //     return console.log('Unable to intert todo');
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });
  // db.collection('Users').insertOne({
  //   name: 'Dylan Kelly',
  //   age: 22,
  //   address: 'maryland'
  // }, (err, res) => {
  //   if(err) {
  //     return console.log('unable o insert data');
  //   }
  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
  // });
>>>>>>> 30ae67cd84c63c8a244c135815bbb0132dc97373


  db.close();
});

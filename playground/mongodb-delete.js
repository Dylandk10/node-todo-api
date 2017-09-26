// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongoDB serever');
  }
  console.log('Connected to mongoDB server');

  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
    console.log(res);
  });
  //
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('59ca85894df3e80363b96118')
  }).then((res) => {
    console.log(res);
  });
  

  //db.close();

});

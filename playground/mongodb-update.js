// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongoDB serever');
  }
  console.log('Connected to mongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59caa04fd43cad00465e84df')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59ca8009ee2e420355821d01')
  }, {
    $set: {
      name: 'Mike Cool'
    },
    $inc: {
      age: + 1
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });
  //db.close();

});

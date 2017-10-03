const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');

var id = '59d3b7b2eadd40f3024859af';
var userId = '59d26a2a97e5868d02321bea';

if(!ObjectID.isValid(id)) {
  console.log('Id not valid');
}

if(!ObjectID.isValid(userId)) {
  console.log('Id not valid');
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if(!todo) {
    return console.log("Id not found");
  }
  console.log('Todo by Id', todo);
}).catch((e) => {
  console.log(e);
})

Users.findById(userId).then((user) => {
  if(!user) {
    return console.log("Id not found");
  }
  console.log('User By Id', user);
}).catch((e) => {
  console.log(e);
})

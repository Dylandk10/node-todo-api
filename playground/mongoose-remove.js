const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');

//gets data back as object to show user
//Todo.findOneAndRemove()

//returns data for user
Todo.findByIdAndRemove('59d50de21cee1c02e1c8313f').then((todo) => {
  console.log(todo);
});

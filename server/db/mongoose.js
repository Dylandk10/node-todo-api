var mongoose = require('mongoose');

mongoose.promise = global.promise;
mongoose.connect(process.env>MONGO_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};

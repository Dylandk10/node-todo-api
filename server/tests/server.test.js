const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');



//run threw each of todos
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create new todo', (done) => {
    var text = 'test todo text';

    request(app)
    .post('/todos')
    .send({
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      })
    })
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done()
      }).catch((e) => {
        done(e);
      });
    });
  });
});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  })
});

describe('GET /todos/:id', () => {
  it("Should return a todo Doc", (done) => {
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("Should return 404 if not found", (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString() + 2}`)
    .expect(404)
  .end(done);
  });

  it("Should return 404 for non-object ids", (done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('Delete /todo/:id', () => {
  it('Should remove todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect(() => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('Should return 404 if nothing found', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });

  it('Should return 404 if object id is invalid', (done) => {
    request(app)
    .delete('/todos/123abc')
    .expect(404)
    .end(done);
  });
});

describe('Patch /todos/:id', () => {
  it("Should update todo", (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "This is test text.";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: true,
      text: text
    })
    .expect(200)
    .end(done)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
  });

  it('Should clear completed at when todo is not completed', (done) => {
    var hexId2 = todos[1]._id.toHexString();
    var text2 = "This is test text two";
    request(app)
    .patch(`/todos/${hexId2}`)
    .send({
      completed: false,
      text: text2
    })
    .expect(200)
    .end(done)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text2);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
  });
});
describe('GET / users/me', () => {
  it('Should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) =>{
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it("Should return a 401 if not authorized", (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123123';

    request(app)
    .post('/todos/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end((err) => {
      if(err) {
        return done(err);
      }
      User.findOne({email}).then((user) => {
        expect(user).toExist();
        expect(user.password).toNotBe(password);
        done();
      });
    });
  });
  it('Should return validation errors if invalid', (done) => {
    var email = "";
    var pass = "";

    request(app)
    .post('/todos/users')
    .send({email, pass})
    .expect(400)
    .end((err) => {
      if(err) {
        return done(err);
      }
      done();
    })
  });
  it('Should not create user if email in use', (done) => {
    var email = "example@example.com";

    request(app)
    .post('/todos/users')
    .send({email})
    .expect(400)
    .end((err) => {
      if(err) {
        return done(err);
      }
      done();
    })
  });
});

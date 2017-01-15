
const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
},
{
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text: 'Test todo text'}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invlaid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
      var id = new ObjectID();

      request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
      var id = 'sam';

      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
  });

});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // query db using findById - shouldn't exist, toNotExist assertio
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
                // expect (null).toNotExist();

                // pass error through to done.
            });
    });

    it('should return a 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
          .delete(`/todos/${hexId}`)
          .expect(404)
          .end(done);
    });

    it('should return 404 if Object id is invalid', (done) => {
        var id = 'sam';

        request(app)
          .delete(`/todos/${id}`)
          .expect(404)
          .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        // grab id of first item
        var hexId = todos[0]._id.toHexString();

        // send update, text, completed=true
        var text = 'updated from mocha todo text';
        var body = {text: text, completed: true};

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(body.completed);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);





        // get 200 and custom assertion:

        //// text is what we sent, completed=true, and completedAt=== number (.toBeA)
    });

    it('should clear completedAt when todo is not completed', (done) => {
        // grab id of second todo item
        var hexId = todos[1]._id.toHexString();

        var body = {text: 'updated from mocha todo text', completed: false, completedAt: null};
        // update text, set completed to false

        // assert 200

        // body, text is changed, completed is false, completedAt is null .toNotExist
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });


});

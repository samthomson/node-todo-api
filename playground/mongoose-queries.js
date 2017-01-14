

const {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// var id = '587a76b22692e32dec8269';
//
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });


// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo: ', todo);
// }).catch((e) => console.log(e));


User.findById('587a50ca764305185435b93f').then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log('User: ', user);
}).catch((e) => console.log(e));

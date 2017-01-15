/*jshint esversion: 6 */

const {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '587bbe4ff306be17a4486cb8'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove('587bb405ddb13b26b8e48f04').then((todo) => {
//     console.log(todo);
// });

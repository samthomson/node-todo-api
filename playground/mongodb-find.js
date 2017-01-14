
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongo');
    }

    console.log('Connected to MongoDB');

    // db.collection('Todos').find({
    //     _id: new ObjectID('587a0d865cde627ba49949d9')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('unable to get todos', err);
    // });

    var sSearchName = 'Sam';

    db.collection('users').find({name: sSearchName}).toArray().then((docs) => {
        //console.log(`Count: ${count}`);
        console.log(JSON.stringify(docs, undefined, 4));
    }, (err) => {
        console.log('unable to get count', err);
    });

    db.close();
});

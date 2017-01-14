// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongo');
    }

    console.log('Connected to MongoDB');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('unable to insert the data', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    db.collection('users').insertOne({
        name: 'Sam Thomson',
        age: 28,
        location: 'Taghazout, Morocco'
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert the data', err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 4));
    });

    db.close();
});

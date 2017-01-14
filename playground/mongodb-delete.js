
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongo');
    }
    console.log('Connected to MongoDB');


    // deleteMany
    // db.collection('Todos').deleteMany({text: 'finish course section 7'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'finish course section 7'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false})
    //     .then((result) => {
    //         console.log(result);
    //     });


    db.collection('users').deleteMany({name: 'Sam Thomson'})
        .then((result) => {
            console.log(result);
        });

    db.collection('users').findOneAndDelete({
        _id: new ObjectID("587a0b0a2f1f2213ac375c24")
    }).then((result) => {
            console.log(result);
        });

    db.close();
});

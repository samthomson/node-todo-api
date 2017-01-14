
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongo');
    }
    console.log('Connected to MongoDB');


    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('587a24a15cde627ba49949df')
    // },{
    //     $set: {
    //         text: 'find out why picili stoped, and restart it'
    //     }
    // },
    // {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('users').findOneAndUpdate({
        _id: new ObjectID('587a0b7bdad91f1afc0351b9')
    },{
        $set: {
            name: 'Sam Thomson'
        },
        $inc: {
            age: 1
        }
    },
    {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.close();
});

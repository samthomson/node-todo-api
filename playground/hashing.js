const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123pass';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$ekOGSG9zCnZFtv8WGgOOEOaSN0GYCNAJPQyWFRtLKv.CKR.CmS6eC';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, 'chilli-flakes');
// console.log(token);
//
//
// var decoded = jwt.verify(token, 'chilli-flakes');
// console.log("decoded ", decoded);


// var message = 'I am a user';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret-salt').toString()
// }
//
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secret-salt').toString();
//
// if(resultHash === token.hash) {
//     // not manipulated
//     console.log('data not changed');
// } else {
//     console.log('Data was changed. Don\'t trust');
// }

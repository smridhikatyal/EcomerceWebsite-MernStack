// const mongoose = require('mongoose')

// //define the MangoDB connection url
// const mangoURL = 'mongodb://localhost:27017/Person'

// //setup mongoDB connection
// mongoose.connect(mangoURL , {
//     useNewUrlParser : true,

//     useUnifiedTopology : true,
// })
// //mongoose has the default connection object representing the mongoDB connection
// const db = mongoose.connection; 


// db.on('connected',()=>{
//     console.log('connected to MongoDB server')
// });


// db.on('error',(err)=>{
//     console.log('error')
// });

// db.on('disconnected',()=>{
//     console.log('disconnected to MongoDB server')
// });
// //export the database connection , import to the server

// module.exports= db;

//  //define teh event listeners for the database connection

const mongoose = require('mongoose')

//define the MangoDB connection url
const mangoURL = 'mongodb://localhost:27017/Ecomerce';

//setup mongoDB connection
mongoose.connect(mangoURL , {
    useNewUrlParser : true,

   // useUnifiedTopology : true,
})
//mongoose has the default connection object representing the mongoDB connection
const db = mongoose.connection; 


db.on('connected',()=>{
    console.log('connected to MongoDB server')
});


db.on('error',(err)=>{
    console.log('error')
});

db.on('disconnected',()=>{
    console.log('disconnected to MongoDB server')
});
//export the database connection , import to the server

module.exports= db;

 //define teh event listeners for the database connection
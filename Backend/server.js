// const express = require('express')
// const app = express();
// const db = require('./db');
// const cors = require('cors')
// const bodyParser = require('body-parser');
// const Person = require('./models/User');
// const path = require('path');
// const Order = require('./models/Order');

// const multer = require('multer');
// app.use(cors());// Enable CORS for all routes
// app.use(bodyParser.json());


// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Folder to save uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // File naming convention
//     }
// });
// const upload = multer({ storage: storage });

// app.get('/',function(req,res){
//     res.send('Welcome to ecomerce platform');
// });
// app.post('/person',async(req,res)=>{
//     //creating a new Person using mongoose
//     try{
//     const data  = req.body
//     const newPerson = new Person(data);
//     //save the person in the database
//     const response = await newPerson.save();
//     console.log('data saved');
//     res.status(200).json(response);
//     }
//     catch(err){
//             console.log(err);
//             res.status(500).json({error :'Internal server error'});
//         }

// });
// app.post('/profile', upload.single('profilePicture'), async (req, res) => {
//     try {
//         const { firstName, lastName, phoneNumber, address, email } = req.body;
//         const profilePicture = req.file ? req.file.path : null;

//         const newPerson = new Person({
//             firstName,
//             lastName,
//             phoneNumber,
//             address,
//             email,
//             profilePicture
//         });

//         const response = await newPerson.save();
//         res.status(200).json(response);
//     } catch (err) {
//         console.error('Error saving profile:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.get('/person', async (req,res)=>{
//     try{
//         const data = await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error :'Internal server error'});
//     }
// })
// // Order routes
// app.post('/orders', async (req, res) => {
//     try {
//         const orderData = req.body;
//         const newOrder = new Order(orderData);
//         const response = await newOrder.save();
//         console.log('Order saved');
//         res.status(200).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/orders', async (req, res) => {
//     try {
//         const data = await Order.find().populate('userId');
//         console.log('Orders fetched');
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


//   app.listen(4000 , ()=>{
//     console.log('listening to the port 4000');  
//   })



  //without async , await
//   app.post('/person',(req,res)=>{
//     //creating a new Person using mongoose
//     const data  = req.body
//     const newPerson = new Person(data);
//     newPerson.save((error,savedPerson) =>{
//         if(error){

//             console.log('error', error);
//             res.status(500).json({error:'internal server error'})
//         }
//         else{
//             console.log('data saved succes fully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })








//   app.get('/paneer',(req,res)=>{
//     res.send('i would love to serve paneer')
// })

// app.get('/idli',(req,res)=>{
//     var customized_idli = {
//         name:'rava idli',
//         size:'10 cm diameter',
//         is_sambhar:true,
//         is_chutney:false,
//     }
//     //res.send('i would love to ser ve idli')
//     res.send(customized_idli)
// })

const express = require('express')
const app = express();
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
const Person = require('./models/User');
const path = require('path');
const Order = require('./models/Order');

const registeredUser = require('./models/registeredUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('./models/Productschema');
const multer = require('multer');
const { authMiddleware, generateToken } = require('./middleware/auth');


app.use(cors());// Enable CORS for all routes
app.use(bodyParser.json());


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});
const upload = multer({ storage: storage });

app.get('/',function(req,res){
    res.send('Welcome to ecomerce platform');
});
app.post('/person',async(req,res)=>{
    //creating a new Person using mongoose
    try{
    const data  = req.body
    const newPerson = new Person(data);
    //save the person in the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
            console.log(err);
            res.status(500).json({error :'Internal server error'});
        }

});
// Protect the profile route with authMiddleware
app.post('/profile', authMiddleware ,upload.single('profilePicture'), async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, address, email } = req.body;
        const profilePicture = req.file ? req.file.path : null;

        const newPerson = new Person({
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            profilePicture
        });

        const response = await newPerson.save();
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/person', authMiddleware , async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error :'Internal server error'});
    }
})
// Order routes
app.post('/orders', authMiddleware , async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = new Order(orderData);
        const response = await newOrder.save();
        console.log('Order saved');
        res.status(200).json(response);
    } catch (err) {
      console.error("Order Placement Error:", err);

      if (err.name === 'ValidationError') {
        // Handle validation errors (e.g., schema validation failed)
        res.status(400).json({ error: err.message });
      } else {
        // Handle other types of errors
        res.status(500).json({ error: 'Internal server error' });
      }
    }
});


app.get('/orders', authMiddleware ,async (req, res) => {
    try {
        const data = await Order.find().populate('userId');
        console.log('Orders fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/search', async (req, res) => {
  try {

    const { query } = req.query;


    const results = await Product.find(
      { $text: { $search: query } },
      )

    console.log(results)
    res.json(results);
  } catch (error) {
    res.status(500).send('Error searching products');
  }
});
// const results = await Product.find(
//   { $text: { $search: query } },
//   { score: { $meta: 'textScore' } }
// ).sort({ score: { $meta: 'textScore' } }

// );
//The /products endpoint accepts page and limit as query parameters.
// app.get('/products', async (req, res) => {
//     const { page = 1, limit = 5 } = req.query;
//     try {
//       const products = await Product.find()
//         .sort({ title: 1 })
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .exec();
//       const count = await Product.countDocuments();
//       res.json({
//         products,
//         totalPages: Math.ceil(count / limit),
//         currentPage: page
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });


  app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new registeredUser({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Error registering user');
    }
  });

  // User Login
  app.post('/token', async (req, res) => {
    try {
      console.log(req.body)
      const { username, password } = req.body;
      const user = await registeredUser.findOne({ username:username });
      console.log('username',user)
      if (!user) {
        return res.status(401).send('Please register first');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send('Invalid username or password');
      }
      console.log('hiiiiii');
      const token = generateToken({ username:username});
      console.log(token)
      res.status(200).json({ token });

   } catch (error) {
      res.status(500).send('Error logging in');
    }
  });
  // Admin login endpoint
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === 'password') {
//     const token = jwt.sign({ role: 'admin' }, 12345, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// });
// Mark product as out of stock
app.put('/api/products/:id/outofstock', authMiddleware, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndUpdate(productId, { outOfStock: true }, { new: true });
  if (product) {
    await Order.updateMany({ productId: product._id }, { status: 'outOfStock' });
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});
// Send products for testing
app.post('/api/products', async (req, res) => {
  const products = req.body.products;
  await Product.insertMany(products);
  res.status(201).send('Products added');
});
// Fetch products
app.get('/products', authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

  app.get('/profile', authMiddleware, async (req, res) => {
    try {
      // Access user information from req.user (added by authMiddleware)
      const userId = req.user.userId;
      const finduser = await Person.findById(userId);
      if (!finduser) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Omit sensitive fields or sanitize if needed before sending the response
    const sanitizedUser = {
        firstName: finduser.firstName,
        lastName: finduser.lastName,
        phoneNumber: finduser.phoneNumber,
        address: finduser.address,
        email: finduser.email,
        // Add other non-sensitive fields as needed
      };


      res.status(200).json({user: sanitizedUser});
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  // Protected Route Example
  app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
  });

  app.listen(4000 , ()=>{
    console.log('listening to the port 4000');  
  })



  //without async , await
//   app.post('/person',(req,res)=>{
//     //creating a new Person using mongoose
//     const data  = req.body
//     const newPerson = new Person(data);
//     newPerson.save((error,savedPerson) =>{
//         if(error){

//             console.log('error', error);
//             res.status(500).json({error:'internal server error'})
//         }
//         else{
//             console.log('data saved succes fully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })








//   app.get('/paneer',(req,res)=>{
//     res.send('i would love to serve paneer')
// })

// app.get('/idli',(req,res)=>{
//     var customized_idli = {
//         name:'rava idli',
//         size:'10 cm diameter',
//         is_sambhar:true,
//         is_chutney:false,
//     }
//     //res.send('i would love to ser ve idli')
//     res.send(customized_idli)
// })
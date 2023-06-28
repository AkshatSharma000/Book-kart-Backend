const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const authRoutes = require("./routes/Auth");
const cartRoutes = require("./routes/Cart");
const generalRoutes = require("./routes/General");
const productRoutes = require("./routes/Products");


var admin = require("firebase-admin");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();


// ------------------------------------ //



const uri = "mongodb+srv://Akshat:"+process.env.DB_PASSWORD+"@cluster0.8hymz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then((result)=>{
    console.log("server started");
  }).catch((err)=>{
    console.log("Error: ",err);
  });

// var connection = mongoose.createConnection(uri);
// autoIncrement.initialize(connection);
//  try {
  
//   console.log("connection started");
//  } catch(err){
//   console.log(err);
//  }



// --------------------------------------------- //


var serviceAccount = require('C:\\Users\\Admin\\Desktop\\info\\Node\\test-452aa-firebase-adminsdk-2xrz6-b975f524d4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-452aa-default-rtdb.firebaseio.com"
});

const db = getFirestore();

const app = express()
const port = 9000

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
  });


app.use(authRoutes);
app.use(cartRoutes);
app.use(generalRoutes);
app.use(productRoutes);

// //   ADDING INFO TO DATABASE [CART]
// async function postInfo(props) {
//   const docRef = db.collection("cart").doc(props.productId);

//    await docRef.set({
//     name: props.name,
//     price: props.price,
//     quantity: props.quantity,
//   });

//   return true
// }

// //  Registeration of user [user]
// async function registerUser(props) {
//   const docRef = db.collection("user").doc(props.emailAddress);

//       const doc = await docRef.get();
//       if (!doc.exists) {
//         await docRef.set({
//           fullName: props.fullName,
//           emailAddress: props.emailAddress,
//           password: props.password,
//         });
//         return true;
//       } else {
//         console.log("User already exists");
//         return false;
//       }
  
// }


// //  FETCHING INFO FROM DATABASE [USERS]
// async function getInfo(){
//     const snapshot = await db.collection('users').get();
//     const arr = [];
//     snapshot.forEach((doc) =>{
//         console.log(doc.id, '=>' ,doc.data());
//         arr.push({'id':doc.id,'data':doc.data()});
//     });
//     return arr;
// }

// async function deleteInfo(props)
// {
//   // await deleteDoc(doc(db, "cart", idx));
//   await db.collection('cart').doc(props.productId).delete();
//   return true;
// }

// //  FETCHING INFO FROM DATABASE [CART]
// async function getCartInfo(){
//     const snapshot = await db.collection('cart').get();
//     const arr = [];
//     snapshot.forEach((doc) =>{
//         console.log(doc.id, '=>' ,doc.data());
//         arr.push({'id':doc.id,'data':doc.data()});
//     });
//     return arr;
// }

// app.get('/', async (req, res) => {
//     console.log('hasdfasdg')

//     const ans = await getInfo();
//     console.log(ans,"hello");
    

//   res.send(ans)
// })

// app.post('/cart',authenticateToken, async (req,res) => {
//     console.log(req.body,"helllllo");
//     const bodyParams = req.body;
//     const success = await postInfo(bodyParams);
//     const ans = await getCartInfo();
//     if(success)
//     res.status(200).send(ans);
//     else
//     res.status(401);

// })

// app.post('/delete', async (req,res) => {
//   console.log(req.body,"helllllo");
//   const bodyParams = req.body;
//   const success = await deleteInfo(bodyParams);
//   const ans = await getCartInfo();
//   if(success)
//   res.status(200).send(ans);
//   else
//   res.status(401);

// })


// app.get('/cart',authenticateToken, async (req,res) => {

//     const ans = await getCartInfo();
//     console.log(ans,"CART OUTPUT")
//     res.send(ans);
// })

// app.post('/auth/register',async (req,res) => {
//     const bodyParams = req.body;
//     const ans = await registerUser(bodyParams);
//     console.log(ans);
//     if(ans)
//     res.sendStatus(201);
//     else
//     res.sendStatus(401);
// })

// app.post('/auth/login',async (req,res) => {
//   const bodyParams = req.body;
//   console.log(bodyParams);
//   const emailAddress = req.body.email;
//   console.log(emailAddress);
//   // const user = { email:  email}

//   const accessToken =  jwt.sign({ "email":emailAddress },process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken, status:201 })
//   // const ans = await loginUser(bodyParams);
//   // console.log(ans);
//   // if(ans)
//   // res.sendStatus(201);
//   // else
//   // res.sendStatus(401);
// })

// function authenticateToken(req,res,next){
//   const token = req.get('Authorization').split(" ")[1];
//   console.log(token,"header");

//   if(token === null ) return res.sendStatus(401);

//   const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   console.log(decodedToken);
//   // req.id = decodedToken.id;

//   next();
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
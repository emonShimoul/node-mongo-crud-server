const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// user: mydbuser1
// pass: 5GTBgBhpP8tye52q

const uri = "mongodb+srv://mydbuser1:5GTBgBhpP8tye52q@cluster0.pabg0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("foodMaster").collection("users");
  // perform actions on the collection object
  console.log('Hitting the database');

  const user = {name: 'Mahiya Mahi', email: "mahi@gmail.com", phone: "01999999999"};
  collection.insertOne(user)
  .then(() => {
    console.log("Insert Success!!");
  })

//   client.close();
});

app.get('/', (req, res) => {
    res.send('Running my CRUD Server...');
});

app.listen(port, () => {
    console.log('Running Server on port ', port);
});
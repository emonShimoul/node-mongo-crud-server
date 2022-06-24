const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// user: mydbuser1
// pass: 5GTBgBhpP8tye52q

const uri = "mongodb+srv://mydbuser1:5GTBgBhpP8tye52q@cluster0.pabg0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");
      // create a document to insert
      const doc = {
        name: "SpecialOne",
        email: "specialone@gmail.com",
      }
      const result = await usersCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my CRUD Server...');
});

app.listen(port, () => {
    console.log('Running Server on port ', port);
});
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: mydbuser1
// pass: 5GTBgBhpP8tye52q

const uri = "mongodb+srv://mydbuser1:5GTBgBhpP8tye52q@cluster0.pabg0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");

      // GET API
      app.get('/users', async(req, res) => {
        const cursor = usersCollection.find({}); 
        const users = await cursor.toArray();
        res.send(users);
      })

      // POST API
      app.post('/users', async(req, res) => {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        console.log(`Got new user: `, req.body);
        console.log('added user', result);
        res.json(result);
      });

      // DELETE API
      app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        console.log('deleting user with id ', result);
        console.log('deleting user with id ', id);
        res.json(result)
      })

    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my CRUD Server...');
});

app.listen(port, () => {
    console.log('Running Server on port ', port);
});
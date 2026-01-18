const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
// coffee_shop
// ZGpjovXti4p0y0w6

// Start mongodb atlas connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfzeuen.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // db connect and collection
     const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    const coffeeCollection = client.db("coffeeShopDB").collection("coffee");


    // coffee data pick || json akare data show 
    app.get('/coffees', async(req,res) => {
      // const cursor = coffeeCollection.find();
      // const result = await cursor.toArray();
      const result = await coffeeCollection.find().toArray();
      res.send(result);
    })
    // 1st a json appi create korar jonno  || api bananor jonno
  
    app.post('/coffees', async(req,res) => {
const newCoffee = req.body;
    const result = await coffeeCollection.insertOne(newCoffee);
console.log(result);
res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// End mongodb atlas connect

app.get("/", (req, res) => {
  res.send("Coffee server is getting hotters!");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port ${port}`);
});

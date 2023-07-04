
import { NextResponse } from "next/server";
import { MongoClient } from'mongodb';

export async function GET(request) {
  

const uri = "mongodb+srv://harish:97ft2Gnz0u9cYjD4@cluster0.vijea5l.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

// async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db('my-api')
    const movie = database.collection('users')
    const  query = {}
    const m1= await movie.find(query).toArray();

    
    console.log(m1);
    return  NextResponse.json({"a":34,"movie":m1})

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
// }
// run().catch(console.dir);

}
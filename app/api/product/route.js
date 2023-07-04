
import { NextResponse } from "next/server";
import { MongoClient } from'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
// import clientPromise from "../../lib/mongodb";
export async function GET(request) {
  

  const uri = process.env.MONGO_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const database = client.db('stock')
const inventory = database.collection('inevntory')
const  query = {}
// async function run() {
  try {
    // await clientPromise;
    // await client.connect();
 // Connect the client to the server	(optional starting in v4.7)
//  const client = new MongoClient(uri);
//  await client.connect();
  
    const allProduct= await inventory.find(query).toArray();
    
    console.log(allProduct);
    return  NextResponse.json({ allProduct})

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }


}

export async function POST(request) {
  

    const uri = "mongodb+srv://harish:97ft2Gnz0u9cYjD4@cluster0.vijea5l.mongodb.net/?retryWrites=true&w=majority";
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);
    const database = client.db('stock')
    const inventory = database.collection('inevntory')
    // await clientPromise;
     // Connect the client to the server	(optional starting in v4.7)
    //  await client.connect();
const data = await  request.json();
console.log("this is my data "+data)
      try {

        // await client.connect();

        const product= await inventory.insertOne(data);
        
        return  NextResponse.json({product , ok:true})
    
      } catch(e){
        console.log("erroro occured "+e)
      }
       finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
    
    }

   
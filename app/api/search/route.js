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

// console.log()


const  query = request.nextUrl.searchParams.get("query") ;
const  stockCategory = request.nextUrl.searchParams.get("quantity") ;
// const condi =  qua===""?"" :qua==="inStock"?"45":"0" ;
// console.log(condi)
console.log(stockCategory)
// async function run() {
  // inStock">In Stock</option>
  //           <option value="outOfStock"
  try {
    // await clientPromise;
    // await client.connect();
 // Connect the client to the server	(optional starting in v4.7)
//  const client = new MongoClient(uri);
//  await client.connect();

    // const allProduct= await inventory.aggregate(
    //     [
    //         {
    //             $match:{
    //                  $or:[
    //                     {name:{$regex:query, $options:"i"} },
    //                      {quantity:{$regex:"22" ,$options:"i"}} 
    //                 ]
    //         }
    //         }
    //     ] 
    //     ).toArray()





        const matchQuery = {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { quantity: { $regex: "", $options: "i" } }
          ]
        };
        
        if (stockCategory === "inStock" || stockCategory==="$inStock") {
          matchQuery.quantity = { $gt: 0 , $lt:9999999};
        } else if (stockCategory === "outOfStock"||stockCategory === "$outOfStock") {
          matchQuery.quantity = { $eq: 0 };
        }
        
        const allProduct = await inventory.aggregate([
          {
            $match: matchQuery
          }
        ]).toArray();
        

        
    
    // console.log(allProduct);
    return  NextResponse.json({ok:true ,category:stockCategory===""?"All":stockCategory  ,allProduct})

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }


}

import { NextResponse } from "next/server";
import { MongoClient ,ObjectId } from'mongodb';

export async function POST(request) {
  

    const uri = process.env.MONGO_URL;

    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);
    const database = client.db('stock')
    const inventory = database.collection('inevntory')
    // await clientPromise;
     // Connect the client to the server	(optional starting in v4.7)
    //  await client.connect();
const data = await  request.json();
const id =data.id 
const action = data.action
let  quantity = data.quantity
let newq =quantity
if(action==="add"){
    newq = parseInt(quantity)+1
}
if(action==="sub"){
    newq =parseInt( quantity)-1
}
console.log("this is my data "+data.id)
      try {

        // await client.connect();

        // const product= await inventory.insertOne(data);


    await    inventory.updateOne(
            { _id: new ObjectId(id) }, 
            {
              $set: {
                quantity: newq
         
              }
            }
          );
          

        
        return  NextResponse.json({ok:true , msg:"hey your data are updated successfully!" , quantity: newq})
    
      } catch(e){
        console.log("erroro occured "+e)
      }
       finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
    
    }

   
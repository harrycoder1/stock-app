"use client"
import React, { useState ,useEffect } from 'react';
import millify from 'millify';

import Image from 'next/image';
import Header from '@/app/components/Header';
import { motion } from 'framer-motion';
import Loading from './components/Loading';
export default function Home() {



  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const[ Loading,setLoading] = useState(false)
const [dropDown ,setDropDown] = useState([]);
const [qua , setQua] =  useState("")
const [categorySearch , setCategorySearch] =useState("")
const [query ,setQuery] = useState("")
const [loadingAction , setLoadingAction] =useState(false)
  const [stock, setStock] = useState([
    // { id: 1, name: 'Product 1', quantity: 10 },
    // { id: 2, name: 'Product 2', quantity: 5 },
    // { id: 3, name: 'Product 3', quantity: 8 },
  ]);

  useEffect(()=>{
console.log(stock)
    const fetchProduct =async()=>{
    const response= await fetch('/api/product' );
    console.log(response)
    let res = await response.json()
// alert("hello")
    setStock(res.allProduct)
    console.log(res.allProduct)
  
  }
  fetchProduct()
  },[]  )


  const handleAddProduct = async(event) => {

    event.preventDefault();
    
try{
  const newProduct = {
    id: stock.length + 1,
    name: productName,
    quantity: parseInt(productQuantity),
  };
  console.log(newProduct)
const response= await fetch('/api/product' ,{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({id: stock.length + 1,
    name: productName,
    quantity: parseInt(productQuantity)})
});
const rese =await response.json()
console.log(rese)
setStock([...stock, {...newProduct , _id:rese.product.insertedId}]);

setProductName('');
setProductQuantity('');
// const res = await response.data.json()
if(response.ok){
  console.log("product add successFully! ") ;

}else{
  console.error("error adding the product")
}

}catch(e){
  // consolr.log(e)
  console.error("Error :"+e)
}


  }

  const onDropDown =async (e)=>{

    
    setQuery(e.target.value)

    
    setLoading(true)

console.log(qua)

const response = await fetch(`/api/search?query=${e.target.value}&quantity=$${qua}`)
const res = await response.json() 
console.log(res)

setDropDown(res.allProduct)
setLoading(false)

  }

  // for fetchoing the data accroding to the quantiry 
  const onQuantity =async(e)=>{
console.log(e.target.value)
// for getting the value of drop 
setQua( e.target.value );
setLoading(true)
const response =  await fetch(`api/search?query=${query}&quantity=${e.target.value}`) 
const res = await response.json()
console.log(res)
setDropDown(res.allProduct)
setCategorySearch(res.category)
setLoading(false)


}
// 
const buttonAction =async(action , id , quantity)=>{
  setLoadingAction(true)
  const updatedStock =await stock.map(item => {
    if (item._id === id) {
      return { ...item, quantity:((action==="add")?quantity+1:quantity-1)};
    }
    return item;
  });
 await setStock(updatedStock)
// setDropDown(updatedStock)
// For update in the dropdown 
const updatedDrop =await dropDown.map(item => {
  if (item._id === id) {
    return { ...item, quantity:((action==="add")?quantity+1:quantity-1)};
  }
  return item;
});
await setDropDown(updatedDrop)
  const data ={
    action:action ,
    id:id ,
    quantity :quantity
  }
  console.log(data)
  const response =  await fetch('/api/action',{
    method:"POST" ,
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({
      action:action ,
      id:id ,
      quantity :quantity
    })
  });
  const res = await response.json()


  console.log(updatedStock)
  setLoadingAction(false)
  console.log("this is my respoc")
  console.log( res)

}

// function for update the quantity directly
const onDirectChangeQuantity =async(id,e)=>{

  // for fronted changes
  console.log(e.target)
  const updatedDrop = dropDown.map(item => {
    if (item._id === id) {
      return { ...item, quantity:e.target.value};
    }
    return item;
  });
setDropDown(updatedDrop)


// for stocks changed
const updatedStock = stock.map(item => {
  if (item._id === id) {
    return { ...item, quantity:e.target.value};
  }
  return item;
});
setStock(updatedStock)

setTimeout(async() => {
  // for backend changes
  const pre = e.target.value 
    const response  = await fetch('/api/action',{

      method:"POST",
      body:JSON.stringify({
        id:id,
        quantity:e.target.value,
        action:""
      })
    })
    
    const res = await response.json()
    console.log(res)
    console.log("directly changed")


}, 3000);




}

  return (
    <>
      <Header />

{/* <Loading  className="w-[10px] h-[10px]"/> */}





      
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">

          <motion.div
              className="bg-gray-800 p-4 rounded-lg "
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
            <div className='flex justify-center flex-col w-auto'>
<motion.h1
          className="text-3xl font-bold text-center mt-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Search Product
        </motion.h1>
        <div className="flex items-center justify-center mt-4 flex-col xl:flex-row relative p-2">
          <input
            type="text"
            placeholder="Enter product name"
            className="border border-gray-300 p-2 rounded-md mr-2 min-w-[200px] max-w-auto"
            onChange={onDropDown}
            value={query}
          />

          <select className="border border-gray-300 p-2 rounded-md mt-2 lg:mt-0"
          onChange={onQuantity} id='cate'
          
          
          >
            <option value="">All </option>
            {/* <option value="inStock">In Stock</option> */}
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
        

          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Search
          </button> */}
          {Loading?
<Image src={"/Loading1.gif"} width={40} height={40} alt={"Loading..."} />
          :""}

              {dropDown.length === 0 && <div className='text-white drop-shadow-lg font-mono text-lg'>No Data Found</div>}

            {dropDown.length >0 &&<div className='text-white text-xl'>{categorySearch}</div> }  
            <div className='flex justify-center items-center '>
            <table className='w-full '>
            <tbody className='w-full'>
         {dropDown.length >0 && dropDown?.map((item , i)=>{
          return (<motion.tr
key={item._id}
                      className='w-fit'
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td className="border px-4 py-2 text-white">{item.name}</td>
                      <td className="border px-4 py-2 text-white flex justify-between">
                        <button disabled={Loading ||loadingAction} className='px-1 md:px-4 bg-green-500 text-white disabled:text-gray-500 disabled:bg-green-100 font-semibold font-xl  shadow-lg hover:bg-green-800 rounded-lg  py-0'
                        onClick={()=>{buttonAction("add" , item._id ,item.quantity)}}
                        >+</button>
                        <input type='number'  value={item.quantity}  className='bg-transparent px-1 py-0 md:px-4 md:py-2 rounded-lg w-[100px] md:w-auto md:m-2 order focus:outline-none focus:ring-0 focus:ring-bl ' onChange={(e)=>onDirectChangeQuantity(item._id  ,e)}/>
         
                       <button disabled={Loading ||loadingAction}  className='px-1 md:px-4 bg-red-500 text-white disabled:text-gray-500 disabled:bg-red-100 font-semibold font-xl  shadow-lg hover:bg-red-800 rounded-lg  py-0'
                           onClick={()=>{buttonAction("sub" , item._id , item.quantity )}}
                       >-</button> </td>
                      
                    </motion.tr>)
                
                

          
        })}
        
        </tbody>
        </table>
        </div>
</div>
</motion.div>
            <motion.div
              className="bg-gray-800 p-4 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-3xl font-bold text-white text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Add Product
              </motion.h1>
              <form className="flex flex-col gap-4" onSubmit={handleAddProduct}>
                <label htmlFor="productName" className="text-white font-bold">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="bg-gray-200 text-black border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="productQuantity" className="text-white font-bold">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="productQuantity"
                  name="productQuantity"
                  value={productQuantity}
                  onChange={e => setProductQuantity(e.target.value)}
                  className="bg-gray-200 text-black border border-gray-300 p-2 rounded-md"
                />

                <motion.button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}

                 
                >
                  Add to Stock
                </motion.button>
              </form>
            </motion.div>
        
            <motion.div
              className="bg-gray-800 p-4 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >



              <motion.h1
                className="text-3xl font-bold text-white text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Display Current Stock
              </motion.h1>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-white">ID</th>
                    <th className="px-4 py-2 text-white">Name</th>
                    <th className="px-4 py-2 text-white">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {(stock.length === 0 )? <tr className='border px-4 py-2 text-white'><td></td> <td className='border px-4 py-2 text-white'>Loading...</td> <td></td></tr>:""}
                  {stock?.map((item ,i) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td className="border px-4 py-2 text-white">{item.id}</td>
                      <td className="border px-4 py-2 text-white">{item.name}</td>
                      <td className="border px-4 py-2 text-white">{item.quantity}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

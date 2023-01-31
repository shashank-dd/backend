const express=require("express")
const route=express.Router();
const cors = require("cors");

route.use(cors({ 
    origin: "*",
}))
const inventory=require("../models/inventory.js")
const customer=require("../models/customer.js")
const order=require("../models/order.js")

// route.use(express.json())

const bodyParser = require("body-parser");
route.use(express.json())
route.use(bodyParser.urlencoded())
route.use(bodyParser.json())
route.get("/orders",async(req,res)=>{
    try {
        console.log("coming to get")

        console.log("rout comming")
   
        const dat=await order.find() 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})
route.get("/inventory",async(req,res)=>{
    try {
        console.log("coming to get")

        console.log("rout comming")
   
        const dat=await inventory.find() 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})

route.get("/inventory/:id",async(req,res)=>{
    try {
        console.log("coming to get")

        console.log(req.params.id)
   
        const dat=await inventory.find({inventory_type:req.params.id}) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})
route.get("/customerDetails",async(req,res)=>{
    try {
        console.log("coming to get")

        console.log("rout comming")
   
        const dat=await customer.find() 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})
route.get("/:itemName/:availableQuantity",async(req,res)=>{
    try {
        console.log("codddde gettttt")

        console.log(req.params,parseInt(req.params.availableQuantity))
   
        const dat= await inventory.update({item_name:req.params.itemName},{$set:{available_quantity:parseInt(req.params.availableQuantity)}})
        // const datj=await inventory.update({item_name:req.body.item_name},{$set:{available_quantity:r}}) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})

route.put("/:itemName/:availableQuantity",async(req,res)=>{
    try {
        console.log("codddde")

        console.log(req.params,parseInt(req.params.availableQuantity))
   
        const dat= await inventory.update({item_name:req.params.itemName},{$set:{available_quantity:parseInt(req.params.availableQuantity)}})
        // const datj=await inventory.update({item_name:req.body.item_name},{$set:{available_quantity:r}}) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})



//post     part  //
route.post("/createOrders",async(req,res)=>{
    try {
        console.log("coming")
console.log(req.body)
         const   fat=await inventory.findOne({item_name:req.body.item_name})
         console.log(fat.available_quantity)
         if(fat.available_quantity==0){
          return  res.json({
                msg:"ITEM IS OUT OF STOCK"
    
            })
         }
         if(fat.available_quantity<req.body.quantity){
            return   res.json({
                msg:"out of stock"
    
            })
         }
         let r=fat.available_quantity-req.body.quantity
         const dat=await inventory.update({item_name:req.body.item_name},{$set:{available_quantity:r}}) 
        const data=await order.create({
            customer_id:req.body.customer_id, 
            inventory_id:req.body.inventory_id,
            item_name:req.body.item_name,
             quantity:req.body.quantity
          
             }) 
        res.json({
            ok:"ok",
            data:"kk",
            dat:data

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})



route.post("/createInventory",async(req,res)=>{
    try {
        console.log("coming")
console.log(req.body)
       
   
        const dat=await inventory.create({
            inventory_id:req.body.inventory_id, 
            inventory_type:req.body.inventory_type,
             item_name:req.body.item_name,
              available_quantity:req.body.available_quantity
          
             }) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})



route.post("/createCustomer",async(req,res)=>{
    try {
        console.log("coming")
console.log(req.body)
       
   
        const dat=await customer.create({
            customer_id:req.body.customer_id,
             customer_name:req.body.customer_name,
             email:req.body.email
         
             }) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})










 module.exports= route;
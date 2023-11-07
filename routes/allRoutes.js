const express=require('express')
const allRouter=express.Router()
const multer=require('multer')
let getFields=multer()


const {Houses, Users, Enquiries}=require('../models/allSchemas')


allRouter.get("/", async (request, response) => {
    const housesData = await Houses.find({});
    try {
      response.send(housesData);
    } catch (error) {
      response.status(500).send(error);
    }
});


//To store the user data.
allRouter.post("/signup", getFields.none(),async (request, response) => {
    const newuser=new Users(request.body)
    let user=await newuser.save()
    user = user.toObject();
    try {
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});


//To authenticate the user
allRouter.post("/login", getFields.none(),async (request, response) => {
   
    let user=await Users.findOne({email:request.body.email,password:request.body.password})
    try {
        if(user)
            response.send(user);
        else
            response.send('Authentication Failed')
    } catch (error) {
        response.status(500).send(error);
    }
});


//To store the enquiry data.
allRouter.post("/register", getFields.none(),async (request, response) => {
    const newEnquiry=new Enquiries(request.body)
    let enquiry=await newEnquiry.save()
    enquiry = enquiry.toObject();
    try {
      response.send(enquiry);
    } catch (error) {
      response.status(500).send(error);
    }
});


// To get all the enquiry information
allRouter.get("/allenquiries", async (request, response) => {
    const enquiryData = await Enquiries.find({});
    try {
      response.send(enquiryData);
    } catch (error) {
      response.status(500).send(error);
    }
});




module.exports=allRouter

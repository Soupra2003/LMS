const mongoose = require('mongoose')
let listingData = require('./data')
const listing = require('../models/course')

const monoUrl = "mongodb://127.0.0.1:27017/lms"
async function main(){
    mongoose.connect(monoUrl)
}
main()
    .then(()=>{
        console.log("Connected to mongoDB")
    })
    .catch(err =>{
        console.log(err)
    })

const InsertData = async () =>{
    await listing.deleteMany({})                  
    // listingData.data = listingData.data.map((obj) =>({...obj, owner : '6798bebabe2e4e55bc74f5be' }))
    await listing.insertMany(listingData.data)
    console.log("Data inserted sucessfully")
}

InsertData()
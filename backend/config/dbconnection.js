const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/demouser")
.then(() => {
    console.log("Mongodb Connect")
})
.catch((err) => {
    console.log(err)
})

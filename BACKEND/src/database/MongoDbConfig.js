
const mongoose = require('mongoose')
//const dbUrl = `mongodb+srv://admin:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.9kbpr.mongodb.net/visitors-management-service-${process.env.ENV}?retryWrites=true&w=majority`
//const dbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`
// const dbUrl = `mongodb+srv://admin:${encodeURIComponent('admin_1122')}@cluster0.rchkloh.mongodb.net/?retryWrites=true&w=majority&ssl=true`
const dbUrl = `mongodb+srv://devsupport:${encodeURIComponent('Admin@123')}@cluster0.orkejci.mongodb.net/?retryWrites=true&w=majority`

function connectMongoDb(){
    console.log("DB URL : ",dbUrl)
    return mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports={
    connectMongoDb
}

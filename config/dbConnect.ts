import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
    if(!process.env.MONGODB_CONNECTION_STRING){
        throw new Error('mongo connection string is undefined')
    }
    const mongoURL:string |undefined = process.env.MONGODB_CONNECTION_STRING
     await mongoose.connect(mongoURL)
     console.log(`mongoDB connected successfully`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB
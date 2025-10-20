
import {MongoClient} from 'mongodb'

let dbConnection


  export const  connectToDb = (cb) => {
        MongoClient.connect(process.env.MONGO)
        .then((client)=>{
            dbConnection = client.db()
            console.log("db connected sucessfully")
            return cb()
        }).catch(err => {
            console.log(err)
            return cb(err)
        })
    }
   export const  getDb = () => dbConnection

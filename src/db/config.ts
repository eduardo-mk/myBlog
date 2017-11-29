import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
 // This is the type of UserModel. 
export type infoUserModel = mongoose.Document & {
    name: string,
    password: String
    email: String,
    admin: boolean,
} 

export type infoBlogModel = mongoose.Document & {
    title: string,
    author: string,
    author_id: string,
    comment: string,
    date: Date,
    metaData: {
        vote: string | number
        favs: string | number
    }
} 

// A workaround do not get the depricated use of promises (need more research)
(<any>mongoose).Promise = bluebird;
 
let blogSchema = new mongoose.Schema({

    title: String,
    author: String,
    author_id: String,
    comment: String,
    date: {
        type:Date,
        default: Date.now
    },
    metaData: {
        vote: {type: Number, default: 0},
        favs: {type: Number, default: 0}
    }

})

let userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
})


mongoose.connect('mongodb://localhost/test', {useMongoClient: true}, (err)=> {
    if (err) console.log('conection Error when trying to connect to mongodb')
});


// These are models, instance of models are documents. 
export let userInfo =  mongoose.model('userInfo', userSchema),
           blogInfo = mongoose.model('blogInfo', blogSchema);








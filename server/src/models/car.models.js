import mongoose,{Schema} from "mongoose"; 

const carSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        type:String   // Array of Cloudinary image URLs
    }],
    tags:[{
        type:String   
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

export const Car=mongoose.model("Car",carSchema)
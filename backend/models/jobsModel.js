import mongoose from "mongoose";


const JobsSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        trim  :true
    },
    company :{ 
        type : String,
        required  :true,
        unique : true
    },
    type :{ 
        type : String,
        required  :true,
    },
    location :{ 
       type : String,
        required  :true,
    },
    description: {
        type : String,
        required  :true,
    }, 
      createdAt: { type: Date, default: Date.now }

})

export default mongoose.model("jobs",JobsSchema)
import mongoose from "mongoose"

export const conectDB = async () => {
   try {
     await mongoose.connect("mongodb+srv://gabriel2021arr:pTPLzXYhlHOREHYw@clusterorganizadorforr.lcutkxu.mongodb.net/")
     console.log("DB is connected");
   } catch (error) {
    console.log(error);
   }
}

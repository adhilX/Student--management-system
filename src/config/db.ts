import mongoose from "mongoose"; 

export class ConnectMongo {
    private databaseUrl : string;
    constructor() {
        if(!process.env.MONGO_URI) {
            throw new Error('connection string not found');
        }
        this.databaseUrl = process.env.MONGO_URI;
    }

    async connectDB(): Promise<void> {
        try {
            await mongoose.connect(this.databaseUrl);
            console.log(" Database connected successfully");
        } catch (error) {
            console.error(" Database connection failed:", error);
            throw error; 
    }

}

}
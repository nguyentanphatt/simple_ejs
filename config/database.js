import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    // MongoDB Atlas connection string
    // Thay thế YOUR_CONNECTION_STRING bằng connection string thực của bạn
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB; 
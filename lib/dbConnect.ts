import mongoose from 'mongoose';

async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    throw new Error('Connection failed!');
  }
}

export default dbConnect;

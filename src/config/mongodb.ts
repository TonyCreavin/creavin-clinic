import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || '');

//     console.log('✅Connected to MongoDB');
//   } catch (error) {
//     console.log('🔥Error connecting to MongoDB', error);
//   }
// };

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected, no need to reconnect
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || '';
    // ; // Use your actual database URI
    await mongoose.connect(uri, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connectDB();

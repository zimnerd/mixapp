import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const username = encodeURIComponent("pulsetek");
  const password = encodeURIComponent("Eddy2020#");
  const cluster = "ganz.55sasrw.mongodb.net";
  const uri = `mongodb+srv://${username}:${password}@${cluster}/mixapp?retryWrites=true&w=majority&appName=ganz`;

  try {
    if (mongoose.connection.readyState === 0) { // Only connect if not already connected
      await mongoose.connect(uri);
      console.log('MongoDB connected successfully');
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

export default connectDB;

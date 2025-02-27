import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://spongebobapi:aJA5s11y78LPaHIz@siricascudo.6bgiu.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { connectDB };
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);

    // Auto-create collections if they don't exist (only in development)
    if (process.env.NODE_ENV === 'development') {
      const collections = ['users', 'pets', 'adoptions', 'lostfounds', 'shelters', 'blogs'];
      const existingCollections = await conn.connection.db.listCollections().toArray();
      const existingNames = existingCollections.map(col => col.name);

      for (const collectionName of collections) {
        if (!existingNames.includes(collectionName)) {
          await conn.connection.db.createCollection(collectionName);
          console.log(`📁 Created collection: ${collectionName}`);
        } else {
          console.log(`✔️  Collection exists: ${collectionName}`);
        }
      }
    }

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
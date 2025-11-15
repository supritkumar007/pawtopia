import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);

    // Auto-create collections if they don't exist
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

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
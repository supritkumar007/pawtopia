const User = require('../models/User');
const Pet = require('../models/Pet');
const Shelter = require('../models/Shelter');
const Blog = require('../models/Blog');
const LostFound = require('../models/LostFound');

// Create default admin account
const createAdminAccount = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = await User.create({
        name: 'Super Admin',
        email: 'admin@pawhaven.in',
        phone: '9999999999',
        password: 'Admin@123',
        role: 'admin',
        location: {
          city: 'Bangalore',
          state: 'Karnataka'
        },
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      });
      console.log('✅ Default admin account created:', admin.email);
    } else {
      console.log('✔️  Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin account:', error.message);
  }
};

// Seed pets
const seedPets = async () => {
  try {
    const count = await Pet.countDocuments();
    
    if (count === 0) {
      const shelters = await Shelter.find().limit(3);
      const shelterId = shelters.length > 0 ? shelters[0]._id : null;

      const pets = [
        {
          name: 'Raja',
          type: 'Dog',
          breed: 'Labrador Retriever',
          ageYears: 2,
          ageMonths: 6,
          gender: 'Male',
          size: 'Large',
          temperament: ['Friendly', 'Playful', 'Energetic'],
          vaccinated: true,
          sterilized: true,
          description: 'Raja is a loving and energetic Labrador who loves to play fetch and swim. Perfect family companion.',
          adoptionFee: 5000,
          images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Simba',
          type: 'Cat',
          breed: 'Persian',
          ageYears: 1,
          ageMonths: 3,
          gender: 'Male',
          size: 'Small',
          temperament: ['Calm', 'Affectionate', 'Gentle'],
          vaccinated: true,
          sterilized: false,
          description: 'Simba is a beautiful Persian cat with a calm temperament. Great for apartment living.',
          adoptionFee: 8000,
          images: ['https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Bella',
          type: 'Dog',
          breed: 'Golden Retriever',
          ageYears: 3,
          ageMonths: 0,
          gender: 'Female',
          size: 'Large',
          temperament: ['Loyal', 'Intelligent', 'Friendly'],
          vaccinated: true,
          sterilized: true,
          description: 'Bella is a sweet and intelligent Golden Retriever. Loves children and other pets.',
          adoptionFee: 7000,
          images: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Whiskers',
          type: 'Cat',
          breed: 'Indie Cat',
          ageYears: 0,
          ageMonths: 8,
          gender: 'Female',
          size: 'Small',
          temperament: ['Playful', 'Curious', 'Independent'],
          vaccinated: true,
          sterilized: false,
          description: 'Whiskers is a playful indie kitten looking for a loving home. Very affectionate.',
          adoptionFee: 2000,
          images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Bruno',
          type: 'Dog',
          breed: 'German Shepherd',
          ageYears: 4,
          ageMonths: 2,
          gender: 'Male',
          size: 'Large',
          temperament: ['Protective', 'Loyal', 'Intelligent'],
          vaccinated: true,
          sterilized: true,
          description: 'Bruno is a well-trained German Shepherd. Excellent guard dog and family protector.',
          adoptionFee: 10000,
          images: ['https://images.unsplash.com/photo-1568572933382-74d440642117?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Milo',
          type: 'Dog',
          breed: 'Beagle',
          ageYears: 1,
          ageMonths: 6,
          gender: 'Male',
          size: 'Medium',
          temperament: ['Curious', 'Friendly', 'Active'],
          vaccinated: true,
          sterilized: false,
          description: 'Milo is an adorable Beagle puppy with lots of energy. Great with kids.',
          adoptionFee: 6000,
          images: ['https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Luna',
          type: 'Cat',
          breed: 'Siamese',
          ageYears: 2,
          ageMonths: 0,
          gender: 'Female',
          size: 'Medium',
          temperament: ['Vocal', 'Social', 'Intelligent'],
          vaccinated: true,
          sterilized: true,
          description: 'Luna is a beautiful Siamese cat who loves to chat. Very social and loves attention.',
          adoptionFee: 7500,
          images: ['https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800'],
          status: 'available',
          shelterId
        },
        {
          name: 'Rocky',
          type: 'Dog',
          breed: 'Indie Dog',
          ageYears: 5,
          ageMonths: 0,
          gender: 'Male',
          size: 'Medium',
          temperament: ['Brave', 'Loyal', 'Calm'],
          vaccinated: true,
          sterilized: true,
          description: 'Rocky is a street-smart indie dog. Very loyal and protective of his family.',
          adoptionFee: 3000,
          images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'],
          status: 'available',
          shelterId
        }
      ];

      await Pet.insertMany(pets);
      console.log(`✅ Seeded ${pets.length} pets`);
    } else {
      console.log('✔️  Pets collection already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding pets:', error.message);
  }
};

// Seed shelters
const seedShelters = async () => {
  try {
    const count = await Shelter.countDocuments();
    
    if (count === 0) {
      const shelters = [
        {
          name: 'Happy Paws Bangalore',
          description: 'A loving shelter dedicated to rescuing and rehoming abandoned pets in Bangalore.',
          address: {
            street: '123 MG Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001'
          },
          phone: '9876543210',
          email: 'contact@happypaws.in',
          capacity: 150,
          currentOccupancy: 87,
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800']
        },
        {
          name: 'Mumbai Animal Rescue',
          description: 'Premier animal rescue center in Mumbai providing shelter and care for stray animals.',
          address: {
            street: '45 Marine Drive',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400020'
          },
          phone: '9876543211',
          email: 'info@mumbaianimalrescue.in',
          capacity: 200,
          currentOccupancy: 142,
          images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800']
        },
        {
          name: 'Chennai Pet Sanctuary',
          description: 'Safe haven for abandoned and injured pets in Chennai with 24/7 veterinary care.',
          address: {
            street: '78 Anna Salai',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600002'
          },
          phone: '9876543212',
          email: 'care@chennaipetsanctuary.in',
          capacity: 120,
          currentOccupancy: 95,
          images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800']
        },
        {
          name: 'Delhi Stray Care',
          description: 'Compassionate shelter helping street animals find forever homes in Delhi NCR.',
          address: {
            street: '156 Connaught Place',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110001'
          },
          phone: '9876543213',
          email: 'hello@delhistraycare.in',
          capacity: 180,
          currentOccupancy: 156,
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800']
        },
        {
          name: 'Hyderabad Animal Haven',
          description: 'Modern animal shelter providing adoption services and veterinary care in Hyderabad.',
          address: {
            street: '89 Banjara Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500034'
          },
          phone: '9876543214',
          email: 'support@hydanimalhaven.in',
          capacity: 130,
          currentOccupancy: 98,
          images: ['https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=800']
        }
      ];

      await Shelter.insertMany(shelters);
      console.log(`✅ Seeded ${shelters.length} shelters`);
    } else {
      console.log('✔️  Shelters collection already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding shelters:', error.message);
  }
};

// Seed blogs
const seedBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    
    if (count === 0) {
      const admin = await User.findOne({ role: 'admin' });
      const authorId = admin ? admin._id : null;

      if (!authorId) {
        console.log('⚠️  No admin found, skipping blog seeding');
        return;
      }

      const blogs = [
        {
          title: 'Top 10 Tips for New Pet Owners in India',
          content: 'Bringing a new pet home is exciting! Here are essential tips for Indian pet owners: 1) Proper vaccination schedule 2) Climate-appropriate diet 3) Regular vet checkups 4) Training and socialization...',
          author: authorId,
          category: 'Tips',
          tags: ['pet care', 'new owners', 'india'],
          images: ['https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800'],
          published: true
        },
        {
          title: 'Understanding Pet Adoption Process',
          content: 'Adopting a pet is a wonderful decision! Learn about the adoption process, required documents, home visits, and what to expect when bringing your new companion home...',
          author: authorId,
          category: 'General',
          tags: ['adoption', 'process', 'guide'],
          images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'],
          published: true
        },
        {
          title: 'Monsoon Pet Care Guide',
          content: 'The monsoon season requires special care for pets. Keep them dry, watch for infections, maintain hygiene, and ensure proper nutrition during humid months...',
          author: authorId,
          category: 'Tips',
          tags: ['monsoon', 'seasonal care', 'health'],
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
          published: true
        },
        {
          title: 'Success Stories: Pets Who Found Their Forever Homes',
          content: 'Heartwarming stories of rescued pets who found loving families. Read about Raja, Simba, and many more who transformed from strays to beloved family members...',
          author: authorId,
          category: 'Stories',
          tags: ['success', 'adoption stories', 'inspiration'],
          images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
          published: true
        },
        {
          title: 'Nutrition Guide for Indian Pets',
          content: 'Proper nutrition is key to pet health. Learn about suitable foods for Indian climate, homemade vs commercial food, portion control, and dietary requirements...',
          author: authorId,
          category: 'Tips',
          tags: ['nutrition', 'diet', 'health'],
          images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800'],
          published: true
        }
      ];

      await Blog.insertMany(blogs);
      console.log(`✅ Seeded ${blogs.length} blogs`);
    } else {
      console.log('✔️  Blogs collection already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding blogs:', error.message);
  }
};

// Seed lost & found
const seedLostFound = async () => {
  try {
    const count = await LostFound.countDocuments();
    
    if (count === 0) {
      const users = await User.find({ role: 'user' }).limit(3);
      
      if (users.length === 0) {
        console.log('⚠️  No users found, skipping lost & found seeding');
        return;
      }

      const lostFoundPosts = [
        {
          type: 'lost',
          petName: 'Tommy',
          description: 'Golden Retriever, wearing blue collar with name tag. Very friendly.',
          lastSeenLocation: 'Indiranagar, Bangalore',
          images: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600'],
          userId: users[0]._id,
          status: 'active'
        },
        {
          type: 'found',
          petName: 'Unknown',
          description: 'Found a small white cat near MG Road metro station. Appears well-fed.',
          lastSeenLocation: 'MG Road, Bangalore',
          images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600'],
          userId: users[0]._id,
          status: 'active'
        },
        {
          type: 'lost',
          petName: 'Max',
          description: 'German Shepherd, 4 years old, brown and black. Last seen at Cubbon Park.',
          lastSeenLocation: 'Cubbon Park, Bangalore',
          images: ['https://images.unsplash.com/photo-1568572933382-74d440642117?w=600'],
          userId: users.length > 1 ? users[1]._id : users[0]._id,
          status: 'active'
        }
      ];

      await LostFound.insertMany(lostFoundPosts);
      console.log(`✅ Seeded ${lostFoundPosts.length} lost & found posts`);
    } else {
      console.log('✔️  Lost & found collection already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding lost & found:', error.message);
  }
};

// Run all seeding
const runSeeding = async () => {
  console.log('\n🌱 Starting database seeding...\n');
  
  await createAdminAccount();
  await seedShelters();
  await seedPets();
  await seedBlogs();
  
  // Wait a bit before seeding lost & found (needs users)
  setTimeout(async () => {
    await seedLostFound();
    console.log('\n✅ Database seeding completed!\n');
  }, 1000);
};

module.exports = { runSeeding };

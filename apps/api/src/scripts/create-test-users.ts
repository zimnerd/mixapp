import bcrypt from 'bcryptjs';
import connectDB from '../config/db';
import User from '../models/User';

const createTestData = async () => {
  await connectDB();

  const users = [
    {
      username: "eddy",
      email: "edganz@icloud.com",
      password: "password",
      profilePicture: "https://example.com/profile.jpg",
      bio: "This is a test user.",
      age: 30,
      gender: "other",
      location: {
        type: "Point",
        coordinates: [18.4232, -33.918861]
      },
      searchRadius: 50,
      preferences: null,
      phone: "+2760311583"
    },
    {
      username: "john",
      email: "john@example.com",
      password: "password123",
      profilePicture: "https://example.com/profile2.jpg",
      bio: "Another test user.",
      age: 25,
      gender: "male",
      location: {
        type: "Point",
        coordinates: [-122.084, 37.422]
      },
      searchRadius: 100,
      preferences: null,
      phone: "+1234567890"
    },
    {
      username: "jane",
      email: "jane@example.com",
      password: "password123",
      profilePicture: "https://example.com/profile3.jpg",
      bio: "Yet another test user.",
      age: 28,
      gender: "female",
      location: {
        type: "Point",
        coordinates: [-0.127758, 51.507351]
      },
      searchRadius: 75,
      preferences: null,
      phone: "+9876543210"
    },
    // Add more test users as needed
  ];

  try {
    // Hash passwords before inserting
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(users);
    console.log('Test data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting test data:', error);
    process.exit(1);
  }
};

createTestData();

const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

    const users = [{username:'testuser',email:'testuser@test.com'},{username:'testfriend',email:'testfriend@test.com'}];

    await User.collection.insertMany(users);
    
    const testUser = await User.findOne({username:'testuser'});

    const newThought = {
        thoughtText: 'This my first thought',
        username: testUser.username,
      };

    const thought = await Thought.create(newThought);
    await User.findOneAndUpdate(
        { _id: testUser._id },
        { $addToSet: { thoughts: thought._id } }
      );

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
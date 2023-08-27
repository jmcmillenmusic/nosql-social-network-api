const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts, reactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
    
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }
  
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    await Reaction.collection.insertMany(reactions);
  
    // loop through the saved thoughts, for each thought we need to generate a thought response and insert the thought responses
    console.table(users);
    console.table(thoughts);
    console.table(reactions);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts, reactions } = require('./data');
// console.log("🚀 ~ file: seed.js:4 ~ users, thoughts, reactions:", users, thoughts, reactions)

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  // let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  // if (thoughtCheck.length) {
  //   await connection.dropCollection('thoughts');
  // }

  // let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  // if (userCheck.length) {
  //   await connection.dropCollection('users');
  // }
  
  // const usersDocs = users.map(user => user.toObject());
  // const thoughtsDocs = thoughts.map(thought => thought.toObject());
  // const reactionsDocs = reactions.map(reaction => reaction.toObject());

  // Clear out all previous data in order to start fresh
  await User.deleteMany({});
  await Thought.deleteMany({});
  // await Reaction.deleteMany({});

  // Initialize empty arrays to contain our initial lists of users, thoughts, and reactions
  const usersList = [];
  const thoughtsList = [];
  const reactionsList = [];
  
  // Add objects containing the usernames and email of all users to usersList
  for (let i = 0; i < users.length; i++) {
    const userObject = {
      username: users[i].username,
      email: users[i].email
    };
    const newUser = await User.create(userObject);
    usersList.push({
      _id: newUser._id.toString(),
      username: newUser.username
    });
  };
  console.log("🚀 ~ file: seed.js:32 ~ connection.once ~ usersList:", usersList)
  
  // Add objects containing the thoughtText and usernames of all thoughts to thoughtsList
  for (let i = 0; i < thoughts.length; i++) {
    const thoughtObject = {
      thoughtText: thoughts[i].thoughtText,
      username: thoughts[i].username
    };
    const newThought = await Thought.create(thoughtObject);
    thoughtsList.push({
      _id: newThought._id.toString(),
      username: newThought.username
    });
  };
  console.log("🚀 ~ file: seed.js:33 ~ connection.once ~ thoughtsList:", thoughtsList)

  for (let i = 0; i < thoughtsList.length; i++) {
    const userId = usersList.filter(
      (user) => user.username === thoughtsList.username
    );
    await User.findOneAndUpdate(
      { _id: userId[0]._id },
      { $push: { thoughts: thoughtsList[i]._id } },
      { new: true },
    );
  };

  // Add objects containing the reactionBody and usernames of all reactions to reactionsList
  for (let i = 0; i < reactions.length; i++) {
    const reactionObject = {
      reactionBody: reactionBody[i],
      username: username[i]
    };
    const newReaction = await Reaction.create(reactionObject);
    reactionsList.push({
      _id: newReaction._id.toString(),
      username: newReaction.username
    });
  };

  for (let i = 0; i < reactionsList.length; i++) {
    const userId = usersList.filter(
      (user) => user.username === reactionsList.username
    );
    await User.findOneAndUpdate(
      { _id: userId[0]._id },
      { $push: { reactions: reactionsList[i]._id } },
      { new: true },
    );
  };

  // await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts);
  // await Reaction.collection.insertMany(reactions);

  // Check to see that everything is seeded
  console.table(users);
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

// async function seedDatabase() {
//   try {
//     await connection.connect();

//     // Delete the existing collections
//     await connection.db.dropCollection('users');
//     await connection.db.dropCollection('thoughts');
//     await connection.db.dropCollection('reactions');

//     // Convert the data to arrays of documents
//     const usersDocs = users.map(user => user.toObject());
//     const thoughtsDocs = thoughts.map(thought => thought.toObject());
//     const reactionsDocs = reactions.map(reaction => reaction.toObject());

//     // Insert the data into the collections
//     await User.collection.insertMany(usersDocs);
//     await Thought.collection.insertMany(thoughtsDocs);
//     await Reaction.collection.insertMany(reactionsDocs);

//     console.log('Seeding complete!');
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await connection.close();
//   }
// }

// seedDatabase();

// const seedDatabase = async () => {
//   try {
//     await User.insertMany(users);
//     console.log('User data inserted!');

//     await Thought.insertMany(thoughts);
//     console.log('Thought data inserted!');

//     await Reaction.insertMany(reactions);
//     console.log('Reaction data inserted!');

//     mongoose.connection.close();
//   } catch (err) {
//     console.error(err);
//     mongoose.connection.close();
//   }
// };

// seedDatabase();
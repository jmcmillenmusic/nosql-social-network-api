const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts, reactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Clear out all previous data in order to start fresh
  await User.deleteMany({});
  await Thought.deleteMany({});
  // await Reaction.deleteMany({});

  // Initialize empty arrays to contain our initial lists of users, thoughts, and reactions
  const usersList = [];
  const thoughtsList = [];
  // const reactionsList = [];
  
  // Add objects containing the usernames and email of all users to usersList
  for (let i = 0; i < users.length; i++) {
    const userObject = {
      username: users[i].username,
      email: users[i].email
    };
    const newUser = await User.create(userObject);
    usersList.push({
      _id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email
    });
  };
  // console.log(usersList);
  
  // Add objects containing the thoughtText and usernames of all thoughts to thoughtsList
  for (let i = 0; i < thoughts.length; i++) {
    const thoughtData = {
      thoughtText: thoughts[i].thoughtText,
      username: thoughts[i].username,
      reactions: [reactions[i]]
    };
    const newThought = await Thought.create(thoughtData);
    thoughtsList.push({
      _id: newThought._id.toString(),
      username: newThought.username
    });
  };
  
  for (let i = 0; i < thoughtsList.length; i++) {
    const userId = usersList.filter(
      (user) => user.username === thoughtsList[i].username
    );
    await User.findOneAndUpdate(
      { _id: userId[0]._id },
      { $push: { thoughts: thoughtsList[i]._id } },
      { new: true },
      );
  };
  // console.log(thoughtsList);

  // Add objects containing the reactionBody and usernames of all reactions to reactionsList
  // for (let i = 0; i < reactions.length; i++) {
  //   const reactionObject = {
  //     reactionBody: reactions[i].reactionBody,
  //     username: reactions[i].username
  //   };
    // const newReaction = await Reaction.create(reactionObject);
    // reactionsList.push({
    //   _id: newReaction._id.toString(),
    //   reactionBody: newReaction.reactionBody,
    //   username: newReaction.username
    // });
  // };
  // console.log(reactionsList);

  // for (let i = 0; i < reactionsList.length; i++) {
  //   const userId = usersList.filter(
  //     (user) => user.username === reactionsList[i].username
  //   );
  //   await User.findOneAndUpdate(
  //     { _id: userId[0]._id },
  //     { $push: { reactions: reactionsList[i]._id } },
  //     { new: true },
  //   );
  // };

  // Check to see that everything is seeded
  console.table(users);
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
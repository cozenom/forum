const mongoClient = require("../config/mongoClient");

// only read active users
const readUsers = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .find()
      .toArray((err, docs) => {
        if (err) {
          console.error("error: readUsers", err);
          reject("Failed to get all users from database");
        }
        resolve(docs);
      });
  });
};

// only read active users
const readUser = (doc) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .find(Object.assign({ active: 1 }, doc))
      .toArray((err, docs) => {
        console.error("error: readUser", err);
        resolve(docs);
      });
  });
};

const addUser = (doc) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .insertOne(Object.assign({ active: 1 }, doc))
      .then((result, err) => {
        console.error("error: addUser", err);
        resolve(result);
      });
  });
};

/*
  location: structure to recognize the data to update on for example id
  updateValue: json structure to update
*/
const updateUser = (location, updateValue) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("user")
      .updateOne(location, updateValue)
      .then((result, err) => {
        console.error("error: updateUser", err);
        if (result.result.ok && result.result.ok > 0) {
          resolve(result);
        } else {
          reject();
        }
      });
  });
};

// We will never delete a user/post just set the account to not active
const deleteUser = (location) => {
  return new Promise((resolve, reject) => {
    updateUser(location, { $set: { active: 0 } })
      .then(resolve)
      .catch(reject);
  });
};

const deleteDocument = () => {};

module.exports = {
  readUsers,
  addUser,
  updateUser,
  readUser,
  deleteUser,
};

// Example database function for user table
const test = async () => {
  // init connection
  await mongoClient.initConnection();
  // read entire table
  const before = await userController.readUsers();
  console.log("Users before insert", JSON.stringify(before));
  // insert new in table
  const insert = await userController.addUser({ test: "emile3" });
  console.log("User after insert", JSON.stringify(insert));
  // read entire table
  const after = await userController.readUsers();
  console.log("Users after insert", JSON.stringify(after));
  // update new user
  const update = await userController.updateUser(
    { test: "emile3" },
    { $set: { test2: 2 } }
  );
  console.log("after update", JSON.stringify(update));
  // read entire table
  const read = await userController.readUsers();
  console.log("Users after update", JSON.stringify(read));
  // get single user
  const single = await userController.readUsers({ test: "emile3" });
  console.log("User after", JSON.stringify(single));
  // delete single user
  const deleteUser = await userController.deleteUser({ test: "emile3" });
  console.log("User delete after", JSON.stringify(deleteUser));
};

// test();

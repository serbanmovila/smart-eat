const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

exports.DatabaseHandler = () => {
  let db = undefined;
  let collection = undefined;

  return {
    setUpConnection: async (databaseName) => {
      await client.connect();
      db = await client.db(databaseName);
    },

    setCollection: async (collectionName) => {
      collection = await db.collection(collectionName);
    },

    insertObject: async (toInsert) => {
      return (await collection.insertOne(toInsert))
        ? { status: "Element inserted!" }
        : { status: "Element was not inserted!" };
    },

    insertArray: async (toInsert) => {
      return (await collection.insertMany(toInsert))
        ? { status: "Recipes inserted!" }
        : { status: "Recipes were not inserted!" };
    },

    closeDb: async () => {
      await await client.close();
    },

    query: async (obj) => {
      return await collection.findOne(obj);
    },

    recipesQueryBy: async (reqObj, obj) => {
      let data = await collection.find(reqObj).toArray();
      let result = [];
      for (let i of data) {
        let nr = 0;
        for (let j of obj.ingredients) {
          if (i.ingredients.includes(j)) {
            nr++;
          }
        }
        if (nr > 0) {
          result.push(i);
        }
      }
      return result;
    },

    queryAll: async (obj) => {
      return await collection.find(obj).toArray();
    },

    remove: async (obj) => {
      return (await collection.deleteOne(obj)).result;
    },

    removeAll: async (obj) => {
      return (await collection.deleteMany(obj)).result;
    },

    updateAt: async (where, upFields) => {
      return (await collection.updateOne(where, { $set: upFields })).result;
    },

    checkIfUserExist: async (userName, passWord) => {
      let users = await collection.find().toArray();
      for (let user of users) {
        if (
          user.username.trim() === userName.trim() &&
          user.password.trim() === passWord.trim()
        ) {
          return true;
        }
      }
      return false;
    },

    getUser: async (token) => {
      let user = await collection.findOne({ token: token });
      return user;
    },

    addIngredient: async (token, ingredient) => {
      let user = await collection.findOne({ token: token });
      let ingredients = user.ingredients;
      if (ingredients.length > 0) {
        ingredient.id = ingredients[ingredients.length - 1].id + 1;
      } else ingredient.id = 0;
      ingredients.push(ingredient);
      await collection.updateOne(
        { token: token },
        { $set: { ingredients: ingredients } }
      );
    },

    updateIngredient: async (token, id, obj) => {
      let user = await collection.findOne({ token: token });
      let ingredients = user.ingredients;
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id == id) ingredients[i] = obj;
      }
      await collection.updateOne(
        { token: token },
        { $set: { ingredients: ingredients } }
      );
    },

    deleteIngredient: async (token, id) => {
      let user = await collection.findOne({ token: token });
      let ingredients = user.ingredients;
      await collection.updateOne(
        { token: token },
        {
          $set: {
            ingredients: ingredients.filter((ingredient) => {
              return ingredient.id !== parseInt(id);
            }),
          },
        }
      );
    },

    getIngredients: async (token) => {
      let user = await collection.findOne({ token: token });
      if (user.ingredients.length > 0) {
        return { ingredients: user.ingredients };
      } else {
        return { ingredients: [] };
      }
    },

    getIngredient: async (token, index) => {
      let user = await collection.findOne({ token: token });
      if (user.ingredients.length > 0) {
        return user.ingredients[index];
      } else {
        return {};
      }
    },

    getUserRecipes: async (userObject) => {
      collection = await db.collection("Recipes");
      let recipes = await collection
        .find({ authorId: userObject._id })
        .toArray();
      return recipes;
    },
  };
};

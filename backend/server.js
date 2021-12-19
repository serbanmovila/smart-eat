const express = require("express");
const bodyParser = require("body-parser");
const { DatabaseHandler } = require("./databaseManager");
const app = express();
const port = 3001;
const jwt = require("njwt");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { ObjectID } = require("bson");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const secretKey = "secret-phrase-for-encryption-and-decryption";

const dbName = "RecipesDB";

//this block will be deleted in further iterations
const dbManager = DatabaseHandler();

dbManager.setUpConnection(dbName);

app.get("/recipes", async (req, res) => {
  await dbManager.setCollection("Recipes");
  let response = await dbManager.queryAll({});
  res.send(
    response.map((recipe) => {
      return recipe;
    })
  );
});

app.get("/recipes", async (req, res) => {
  await dbManager.setCollection("Recipes");
  let uriString = req.query.ingredients.split(";");
  let reqObject = {};
  for (let i = 0; i < Object.keys(req.query).length; i++) {
    if (Object.keys(req.query)[i] !== "ingredients") {
      reqObject[Object.keys(req.query)[i].trim()] =
        req.query[Object.keys(req.query)[i]];
    }
  }
  let request = {
    ingredients: uriString.map((ingredient) => ingredient.trim()),
  };
  let response = await dbManager.recipesQueryBy(reqObject, request);
  res.send(
    response.map((recipe) => {
      return recipe;
    })
  );
});

app.get("/recipes/:id", async (req, res) => {
  await dbManager.setCollection("Recipes");
  res.send(await dbManager.query({ _id: ObjectID(req.params.id) }));
});

app.put("/recipes/:id", async (req, res) => {
  await dbManager.setCollection("Recipes");
  res.send(
    await dbManager.updateAt({ _id: ObjectID(req.params.id) }, req.body)
  );
});

app.delete("/recipes/:id", async (req, res) => {
  await dbManager.setCollection("Recipes");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.send(await dbManager.remove({ _id: ObjectID(req.params.id) }));
});

app.get("/myRecipes", async (req, res) => {
  await dbManager.setCollection("Users");
  let token = req.headers["authorization"].split(" ")[1];
  let usr = await dbManager.getUser(token);
  res.send(await dbManager.getUserRecipes(usr));
});

app.post("/recipes", async (req, res) => {
  let token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      await dbManager.setCollection("Users");
      let usr = await dbManager.getUser(token);
      await dbManager.setCollection("Recipes");
      req.body.ingredients.sort();
      req.body.authorId = usr._id;
      let response = await dbManager.insertObject(req.body);
      res.status(200).send(response);
    }
  });
});

app.post("/addrecipes", async (req, res) => {
  let token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      await dbManager.setCollection("Users");
      let usr = await dbManager.getUser(token);
      await dbManager.setCollection("Recipes");
      for (let i = 0; i < req.body.data.length; i++) {
        req.body.data[i].authorId = usr._id;
      }
      let response = await dbManager.insertArray(req.body.data);
      res.status(200).send(response);
    }
  });
});

app.get("/recipesFilter/:tipPreparat", async (req, res) => {
  let token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      await dbManager.setCollection("Recipes");
      let response = await dbManager.queryAll({});
      res.send(
        response.filter(
          (el) => el.tipPreparat.trim() === req.params.tipPreparat.trim()
        )
      );
    }
  });
});

app.post("/register", async (req, res) => {
  await dbManager.setCollection("Users");
  let data = req.body;
  data.ingredients = [];
  res.send(await dbManager.insertObject(data));
});

app.post("/login", async (req, res) => {
  await dbManager.setCollection("Users");
  let usr = req.body.username;
  let psd = req.body.password;
  if ((await dbManager.checkIfUserExist(usr, psd)) === true) {
    const claims = { iss: "login-claim", sub: "user-login" };
    const token = jwt.create(claims, secretKey);
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);
    token.setExpiration(expDate);
    let jwtToken = token.compact();
    await dbManager.updateAt(
      { username: usr, password: psd },
      { token: jwtToken }
    );
    res.send({ token: jwtToken });
  } else {
    res.status(404).send("User not found!");
  }
});

app.post("/ingredients", async (req, res) => {
  await dbManager.setCollection("Users");
  let token = req.headers["authorization"].split(" ")[1];
  const { ingredient } = req.body;
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      await dbManager.addIngredient(token, ingredient);
      res.status(200).send({ ans: "added" });
    }
  });
});

app.get("/ingredients", async (req, res) => {
  await dbManager.setCollection("Users");
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      res.send(await dbManager.getIngredients(token));
    }
  });
});

app.get("/ingredients/:id", async (req, res) => {
  await dbManager.setCollection("Users");
  const token = req.headers["authorization"].split(" ")[1];
  let { id } = req.params;
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      res.send(await dbManager.getIngredient(token, id - 1));
    }
  });
});

app.put(`/ingredients/:id`, async (req, res) => {
  let { id } = req.params;
  let token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      await dbManager.setCollection("Users");
      await dbManager.updateIngredient(token, id, req.body);
      res.send({ result: "updated" });
    }
  });
});

app.delete("/ingredients/:id", async (req, res) => {
  let { id } = req.params;
  let token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, secretKey, async (err, ver) => {
    if (err) {
      res.status(405).send({ ans: "expired" });
    } else {
      await dbManager.setCollection("Users");
      await dbManager.deleteIngredient(token, id);
      res.send({ result: "deleted" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

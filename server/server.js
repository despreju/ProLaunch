//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');

//Connexion à la base de donnée
mongoose
  .connect("mongodb://localhost/db", { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true
    })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//for AWS
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")))

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//On définit la route Hello
const router = express.Router();

app.use("/user", router);
app.use("/exercise", router);
app.use("/training", router);
app.use("/run", router);
require(__dirname + "/controllers/userController")(router);
require(__dirname + "/controllers/exerciseController")(router);
require(__dirname + "/controllers/trainingController")(router);
require(__dirname + "/controllers/runController")(router);

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
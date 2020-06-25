const Training = require("../../schema/schemaTraining");
const Exercice = require("../../schema/schemaExercise");

async function createTraining(req, res) {
  const {name, exerciceName} = req.body;
  if (!name || !exerciceName) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  try {
    const findTraining = await Training.findOne({
      name
    });
    if (findTraining) {
      return res.status(400).json({
        text: "L'entrainement existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'exercice en base
    //On récupère l'exercice
    const exercice = await Exercice.findOne({name : exerciceName});    
    const training = {
      name,
      exercice
    };
    const trainingData = new Training(training);
    const trainingObject = await trainingData.save();
    return res.status(200).json({
      text: "Succès",
      id: trainingObject.id,
      name: name,
      exercice: exercice,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getAllTrainings(req, res) {  
  try {
    // On check si l'utilisateur existe en base
    const rep = (await Training.find());
    const trainingsList = [];
    rep.forEach(element => trainingsList.push({"id":element.id, "name":element.name, "exercice":element.exercice}));
    return res.status(200).json(
      trainingsList
    );
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

//On exporte nos fonctions
exports.createTraining = createTraining;
exports.getAllTrainings = getAllTrainings;
const Exercise = require("../../schema/schemaExercise");

async function createExercise(req, res) {
  const { name, difficulty, location } = req.body;
  if (!name || !difficulty || !location) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  const exercise = {
    name,
    difficulty,
    location
  };
  try {
    const findExercise = await Exercise.findOne({
      name
    });
    if (findExercise) {
      return res.status(400).json({
        text: "L'exercice existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'exercice en base
    const exerciseData = new Exercise(exercise);
    const exerciseObject = await exerciseData.save();
    return res.status(200).json({
      text: "Succès",
      id: exerciseObject.id,
      name: name,
      difficulty: difficulty,
      location: location
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteExercise(req, res) {  
  const {name} = req.body;
  if (!name ) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  try {    
    await Exercise.findOneAndRemove({name});
    return res.status(200).json({
      text: "Succès"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getAllExercises(req, res) {  
  try {
    const rep = (await Exercise.find());
    const exercisesList = [];
    rep.forEach(element => exercisesList.push({"id":element.id, "name":element.name, "difficulty":element.difficulty}));
    return res.status(200).json(
      exercisesList
    );
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

//On exporte nos fonctions
exports.createExercise = createExercise;
exports.getAllExercises = getAllExercises;
exports.deleteExercise = deleteExercise;
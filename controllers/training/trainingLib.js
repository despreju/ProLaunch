const Training = require("../../schema/schemaTraining");
const Exercise = require("../../schema/schemaExercise");

async function createTraining(req, res) {
  const {name, exercises} = req.body;
  if (!name || !exercises) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  //On check si l'entrainement existe déja
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
  //On parcourt les exercices, on vérifie qu'ils existent et on les ajoutes à la liste
  const exercisesList = [];
  const exercisesNameList = exercises.split(',');
  for (item in exercisesNameList) {
    try {    
      const name = exercisesNameList[item];
      const exercise = await Exercise.findOne({name});
      if (exercise === null) {
        return res.status(400).json({
          text: "L'exercice " + name + " n'existe pas"
        });
      }
      exercisesList.push(exercise);
    } catch (error) {
      return res.status(500).json({ error });
    }    
  }
  const training = {
    name,
    exercisesList
  };
  try {
    const trainingData = new Training(training);
    const trainingObject = await trainingData.save();
    return res.status(200).json({
      text: "Succès",
      id: trainingObject.id,
      name: name,
      exercises: exercisesList,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getAllTrainings(req, res) {  
  try {
    const rep = (await Training.find());
    const trainingsList = [];
    //Pour chaque entrainement
    for (const element of rep) {
      const exercises = [];
      //Pour chaque exercice de chaque entrainement
      for (const exercise of element.exercises) {
        const id = exercise.toString();
        const exe = await Exercise.findById(id);
        exercises.push(exe);
      };
      trainingsList.push({"id":element.id, "name":element.name, "exercises":exercises})
    };
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
const Exercise = require("../../schema/schemaExercise");
const Training = require ("../../schema/schemaTraining");

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
    const findExercise = await Exercise.findOne({name}).lean();
    const trainings = await Training.find().populate({ 
                                                        path: 'chapters.sessions.exercise',
                                                        model: 'Exercise',
                                                        select : '-__v'
                                                    }).lean();
    const trainingsImpacted = [];

    for (iteratorTraining in trainings) {      
      for (iteratorChapter in trainings[iteratorTraining].chapters) {
        for (iteratorSession in trainings[iteratorTraining].chapters[iteratorChapter].sessions) {
          if (trainings[iteratorTraining].chapters[iteratorChapter].sessions[iteratorSession].exercise.name === findExercise.name) {
            trainingsImpacted.push(trainings[iteratorTraining].name);
          }
        }
      }
    }
    if (trainingsImpacted.length === 0) {
      await Exercise.findOneAndRemove({name});
      return res.status(200).json({
        text: "Succès"
      });
    } else {
      return res.status(200).json({
        text: "Erreur",
        trainings: [ ...new Set(trainingsImpacted)]
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getAllExercises(req, res) {  
  try {
    const rep = (await Exercise.find());
    return res.status(200).json(
      rep
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
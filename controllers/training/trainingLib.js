const Training = require("../../schema/schemaTraining");
const Exercise = require("../../schema/schemaExercise");

async function createTraining(req, res) {
  const {name, chapters} = req.body;
  if (!name || !chapters) {
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
  for (iteratorChapter in chapters) {
    delete chapters[iteratorChapter]._id;
    for (iteratorSession in chapters[iteratorChapter].sessions) {
      delete chapters[iteratorChapter].sessions[iteratorSession]._id;
      try {    
        const exercise = await Exercise.findOne({"name" : chapters[iteratorChapter].sessions[iteratorSession].exercise.name});
        if (exercise === null) {
          return res.status(400).json({
            text: "L'exercice " + name + " n'existe pas"
          });
        }
        chapters[iteratorChapter].sessions[iteratorSession].exercise = exercise;
      } catch (error) {
        return res.status(500).json({ error });
      }  
    }  
  }
  const training = {
    name,
    chapters
  };
  try {
    const trainingData = new Training(training);
    const trainingObject = await trainingData.save();
    return res.status(200).json({
      text: "Succès",
      _id: trainingObject.id,
      name: trainingObject.name,
      chapters: trainingObject.chapters,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function saveTraining(req, res) {  
  const {name, chapters, _id} = req.body;
  if (!name || !chapters) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  //On parcourt les exercices, on vérifie qu'ils existent et on les ajoutes à la liste
  for (iteratorChapter in chapters) {
    delete chapters[iteratorChapter]._id;
    for (iteratorSession in chapters[iteratorChapter].sessions) {
      delete chapters[iteratorChapter].sessions[iteratorSession]._id;
      try {    
        const exercise = await Exercise.findOne({"name" : chapters[iteratorChapter].sessions[iteratorSession].exercise.name});
        if (exercise === null) {
          return res.status(400).json({
            text: "L'exercice " + name + " n'existe pas"
          });
        }
        chapters[iteratorChapter].sessions[iteratorSession].exercise = exercise;
      } catch (error) {
        return res.status(500).json({ error });
      }  
    }  
  }
  Training.updateOne({ _id: _id }, {name : name, chapters : chapters}, 
  function(err, doc){ 
      if (err) return res.send(500, { err });       
      return res.send(200, { doc });
  }); 
}

async function deleteTraining(req, res) {  
  const {name} = req.body;
  if (!name ) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  try {    
    await Training.findOneAndRemove({name});
    return res.status(200).json({
      text: "Succès"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getTrainingByName(req, res) {  
  const {name} = req.body;
  if (!name) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  try {
    const rep = await Training.findOne({name}).populate({ 
                                                  path: 'chapters.sessions.exercise',
                                                  model: 'Exercise',
                                                  select : '-__v'
                                              })
    return res.status(200).json(
      rep
    );
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getAllTrainings(req, res) {  
  try {
    const rep = await Training.find().populate({ 
                                                  path: 'chapters.sessions.exercise',
                                                  model: 'Exercise',
                                                  select : '-__v'
                                              })
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
exports.createTraining = createTraining;
exports.saveTraining = saveTraining;
exports.deleteTraining = deleteTraining;
exports.getTrainingByName = getTrainingByName;
exports.getAllTrainings = getAllTrainings;
const Run = require("../../schema/schemaRun");

async function createRun(req, res) {
    const { training, user, duration, state } = req.body;
    if (!training || !user || !duration || !state) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    const run = {
        training,
        user,
        duration,
        state
    };    
    try {
        // Sauvegarde du run en base
        const runData = new Run(run);
        await runData.save();
        return res.status(200).json({
            text: "Succès"
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function getAllRuns(req, res) {  
    try {
      const rep = (await Run.find());
      const runsList = [];
      rep.forEach(element => runsList.push({id:element.id, training:element.training, duration:element.duration, state:element.state, user:element.user}));
      return res.status(200).json(
        runsList
      );
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }
  
//On exporte nos fonctions
exports.createRun = createRun;
exports.getAllRuns = getAllRuns;

const ResearchProject = require('../models/ResearchProject');
const Researcher = require('../models/Researcher');

const createResearchProject = async (req, res) => {
    try {
      const { title, description, startDate, endDate, leadResearcherId } = req.body;
        
      // Create the research project document
      const researchProject = new ResearchProject({
        title,
        description,
        startDate,
        endDate,
        leadResearcher: leadResearcherId
      });
      await researchProject.save();
  
      // Add the project to the researcher's list of projects
      const researcher = await Researcher.findById(leadResearcherId);
      if (!researcher) {
        return res.status(404).json({ success: false, message: 'Researcher not found' });
      }
      researcher.projects.push(researchProject._id);
      await researcher.save();
  
      res.status(201).json({ success: true, message: 'Research project created successfully', data: researchProject });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating research project', error: error.message });
    }
  };
  
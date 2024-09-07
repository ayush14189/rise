// controllers/researchProjectController.js
const ResearchProject = require('../models/ResearchProject');
const Researcher = require('../models/Researcher'); // Ensure this model exists
const Patent = require('../models/Patent'); // Ensure this model exists
const Trademark = require('../models/Trademark'); // Ensure this model exists

// 1. Create a new Research Project
exports.createResearchProject = async (req, res) => {
  try {
    const { title, description, startDate,endDate,status,category} = req.body;

    // Optional: Validate referenced IDs (researchers, patents, trademarks)
    // if (researchers && researchers.length > 0) {
    //   const existingResearchers = await Researcher.find({ _id: { $in: researchers } });
    //   if (existingResearchers.length !== researchers.length) {
    //     return res.status(400).json({ message: 'One or more researchers not found.' });
    //   }
    // }

    // if (patents && patents.length > 0) {
    //   const existingPatents = await Patent.find({ _id: { $in: patents } });
    //   if (existingPatents.length !== patents.length) {
    //     return res.status(400).json({ message: 'One or more patents not found.' });
    //   }
    // }

    // if (trademarks && trademarks.length > 0) {
    //   const existingTrademarks = await Trademark.find({ _id: { $in: trademarks } });
    //   if (existingTrademarks.length !== trademarks.length) {
    //     return res.status(400).json({ message: 'One or more trademarks not found.' });
    //   }
    // }

    const newProject = new ResearchProject({
      title,
      description,
      startDate,
      category,
      endDate,
      status,
      // researchers,
      // patents,
      // trademarks,
    });

    const savedProject = await newProject.save();

    // Optionally, populate the references
    // await savedProject.populate('researchers patents trademarks').execPopulate();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Research Projects
exports.getResearchProjects = async (req, res) => {
  try {
    const projects = await ResearchProject.find()
      .populate('researchers', 'name email') // Adjust fields as necessary
      .populate('patents', 'patentNumber title status')
      .populate('trademarks', 'trademarkNumber title status')
      .exec();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 3. Get a Single Research Project by ID
exports.getResearchProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ResearchProject.findById(id)
      .populate('researchers', 'name email') // Adjust fields as necessary
      .populate('patents', 'patentNumber title status')
      .populate('trademarks', 'trademarkNumber title status')
      .exec();

    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Update a Research Project
exports.updateResearchProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, status, researchers, patents, trademarks } = req.body;

    // Optional: Validate referenced IDs if they are being updated
    if (researchers && researchers.length > 0) {
      const existingResearchers = await Researcher.find({ _id: { $in: researchers } });
      if (existingResearchers.length !== researchers.length) {
        return res.status(400).json({ message: 'One or more researchers not found.' });
      }
    }

    if (patents && patents.length > 0) {
      const existingPatents = await Patent.find({ _id: { $in: patents } });
      if (existingPatents.length !== patents.length) {
        return res.status(400).json({ message: 'One or more patents not found.' });
      }
    }

    if (trademarks && trademarks.length > 0) {
      const existingTrademarks = await Trademark.find({ _id: { $in: trademarks } });
      if (existingTrademarks.length !== trademarks.length) {
        return res.status(400).json({ message: 'One or more trademarks not found.' });
      }
    }

    const updatedProject = await ResearchProject.findByIdAndUpdate(
      id,
      { title, description, startDate, endDate, status, researchers, patents, trademarks },
      { new: true, runValidators: true }
    )
      .populate('researchers', 'name email') // Adjust fields as necessary
      .populate('patents', 'patentNumber title status')
      .populate('trademarks', 'trademarkNumber title status')
      .exec();

    if (!updatedProject) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Delete a Research Project
exports.deleteResearchProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await ResearchProject.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    res.status(200).json({ message: 'Research Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Add a Researcher to a Project
exports.addResearcherToProject = async (req, res) => {
  try {
    const { projectId, researcherId } = req.params;

    const project = await ResearchProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    const researcher = await Researcher.findById(researcherId);
    if (!researcher) {
      return res.status(404).json({ message: 'Researcher not found.' });
    }

    if (project.researchers.includes(researcherId)) {
      return res.status(400).json({ message: 'Researcher already added to the project.' });
    }

    project.researchers.push(researcherId);
    await project.save();

    res.status(200).json({ message: 'Researcher added to the project successfully.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Remove a Researcher from a Project
exports.removeResearcherFromProject = async (req, res) => {
  try {
    const { projectId, researcherId } = req.params;

    const project = await ResearchProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    if (!project.researchers.includes(researcherId)) {
      return res.status(400).json({ message: 'Researcher not associated with the project.' });
    }

    project.researchers.pull(researcherId);
    await project.save();

    res.status(200).json({ message: 'Researcher removed from the project successfully.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. Add a Patent to a Project
exports.addPatentToProject = async (req, res) => {
  try {
    const { projectId, patentId } = req.params;

    const project = await ResearchProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    const patent = await Patent.findById(patentId);
    if (!patent) {
      return res.status(404).json({ message: 'Patent not found.' });
    }

    if (project.patents.includes(patentId)) {
      return res.status(400).json({ message: 'Patent already associated with the project.' });
    }

    project.patents.push(patentId);
    await project.save();

    res.status(200).json({ message: 'Patent added to the project successfully.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 9. Remove a Patent from a Project
exports.removePatentFromProject = async (req, res) => {
  try {
    const { projectId, patentId } = req.params;

    const project = await ResearchProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    if (!project.patents.includes(patentId)) {
      return res.status(400).json({ message: 'Patent not associated with the project.' });
    }

    project.patents.pull(patentId);
    await project.save();

    res.status(200).json({ message: 'Patent removed from the project successfully.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 10. Add a Trademark to a Project
exports.addTrademarkToProject = async (req, res) => {
  try {
    const { projectId, trademarkId } = req.params;

    const project = await ResearchProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    const trademark = await Trademark.findById(trademarkId);
    if (!trademark) {
      return res.status(404).json({ message: 'Trademark not found.' });
    }

    if (project.trademarks.includes(trademarkId)) {
      return res.status(400).json({ message: 'Trademark already associated with the project.' });
    }

    project.trademarks.push(trademarkId);
    await project.save();

    res.status(200).json({ message: 'Trademark added to the project successfully.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 11. Remove a Trademark from a Project
exports.removeTrademarkFromProject = async (req, res) => {
  try {
    const { projectId, trademarkId } = req.params;

    const project = await ResearchProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Research Project not found.' });
    }

    if (!project.trademarks.includes(trademarkId)) {
      return res.status(400).json({ message: 'Trademark not associated with the project.' });
    }

    project.trademarks.pull(trademarkId);
    await project.save();

    res.status(200).json({ message: 'Trademark removed from the project successfully.', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { authUser, allUsers } = require("./userControllers");
const  {createStartup,updateStartup,getStartup,getStartups,getStartupByUserId} = require("./startupController");
const {registerInvestor,updateInvestor,getInvestor,getInvestorByUserId} = require("./investorController");
const {signupResearcher,getResearcherByUserId} = require("./researcherController");
const {signupGovtAgency} = require("./govtAgencyController");
const {createFundingRequest, updateFundingRequest, getFundingRequests,getFundingRequest,deleteFundingRequest} = require("./FundingRequestController");
const {createProgressTracking, updateProgressTracking, getProgressTrackings,getProgressTracking,deleteProgressTracking} = require("./ProgressTrackerController");
const {createMentorshipRequest, updateMentorshipRequest, getMentorshipRequests,getMentorshipRequest,deleteMentorshipRequest} = require("./MentorshipRequestController");
const {createIPR, updateIPR, getIPRs,getIPR,deleteIPR} = require("./iprManagerController");
const {createPatent,getPatentById,getPatents,updatePatentStatus} = require("./PatentController");
const {createResearchProject}=require("./researchProjectController")
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("./chatControllers");
const { sendMessage, allMessages } = require("./messageControllers");
const { promptMessage } = require("./promptControllers");
const { generateImage } = require("./imageControllers");
const { createCollaborationRequest, getCollaborationRequests,getCollaborationRequest,updateCollaborationRequest,deleteCollaborationRequest } = require("./CollaborationRequest");
const {createTrademark,getTrademarks,getTrademarkById,updateTrademarkStatus}=require("./trademarkcontroller")
module.exports = {
  
  authUser,
  allUsers,
  createResearchProject,
  createStartup,
  updateStartup,
  getStartup,
  getStartups,
  getStartupByUserId,
  
  signupResearcher,
  getResearcherByUserId,
  signupGovtAgency,
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,

  sendMessage,
  allMessages,

  generateImage,
  
  promptMessage,
  createFundingRequest,
  updateFundingRequest,
  getFundingRequests,
  getFundingRequest,
  deleteFundingRequest,

  createProgressTracking,
  updateProgressTracking,
  getProgressTrackings,
  getProgressTracking,
  deleteProgressTracking,

  createMentorshipRequest,
  updateMentorshipRequest,
  getMentorshipRequests,
  getMentorshipRequest,
  deleteMentorshipRequest,

  createCollaborationRequest,
  getCollaborationRequests,
  getCollaborationRequest,
  updateCollaborationRequest,
  deleteCollaborationRequest,


  createIPR,
  updateIPR,
  getIPRs,
  getIPR,
  deleteIPR,

  createPatent,
  getPatentById,
  getPatents,
  updatePatentStatus,

  registerInvestor,
  updateInvestor,
  getInvestor,
  getInvestorByUserId,
  
  createTrademark,
  getTrademarks,
  getTrademarkById,
  updateTrademarkStatus
};

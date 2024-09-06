const { authUser, allUsers } = require("./userControllers");
const  {signupStartup} = require("./startupController");
const {signupInvestor} = require("./investorController");
const {signupResearcher} = require("./researcherController");
const {signupGovtAgency} = require("./govtAgencyController");
const {createFundingRequest, updateFundingRequest, getFundingRequests,getFundingRequest,deleteFundingRequest} = require("./FundingRequestController");
const {createProgressTracking, updateProgressTracking, getProgressTrackings,getProgressTracking,deleteProgressTracking} = require("./ProgressTrackerController");
const {createMentorshipRequest, updateMentorshipRequest, getMentorshipRequests,getMentorshipRequest,deleteMentorshipRequest} = require("./MentorshipRequestController");
const {createIPR, updateIPR, getIPRs,getIPR,deleteIPR} = require("./iprController");
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

module.exports = {
  
  authUser,
  allUsers,
  signupStartup,
  signupInvestor,
  signupResearcher,
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
  
  createIPR,
  updateIPR,
  getIPRs,
  getIPR,
  deleteIPR,

};

const express = require("express");
const { createStartup,updateStartup,signupResearcher,signupGovtAgency,authUser, allUsers,createFundingRequest,getFundingRequest,getFundingRequests,createMentorshipRequest,getMentorshipRequests,createCollaborationRequest,getCollaborationRequests,createResearchProject, registerInvestor,getInvestorByUserId,getResearcherByUserId,getStartupByUserId,createPatent,getPatents,createTrademark,getTrademarks,getTrademarkById,updatePatentStatus } = require("../controllers");
const { protect } = require("../middleware");
const { getResearchProjects } = require("../controllers/researchProjectController");

const router = express.Router();

router.route("/startup").post(createStartup).get(protect, allUsers);
router.route("/startup/:id").put(updateStartup);
router.route("/fundingrequest").post(createFundingRequest).get(protect, getFundingRequests);
router.route("/fundingrequest/:startupId").get( getFundingRequest);
router.route("/mentorshiprequest").post(createMentorshipRequest).get(protect, getMentorshipRequests);
router.route("/collaborationrequest").post(createCollaborationRequest).get(protect, getCollaborationRequests);
// router.route("/ipr").post(createIPR).get(protect, getIPRs);

router.route("/researcher").post(signupResearcher).get(protect, allUsers);
router.route("/investor").post(registerInvestor)
router.route("/govtagency").post(signupGovtAgency).get(protect, allUsers);
router.route("/research-projects").post(createResearchProject).get(getResearchProjects)
router.route("/collaboration-requests").post(createCollaborationRequest).get(getCollaborationRequests)
router.route("/investor/:userId").get(getInvestorByUserId);
router.route("/researcher/:userId").get(getResearcherByUserId);
router.route("/startup/:userId").get(getStartupByUserId);
router.route("/patents").post(createPatent).get(getPatents);
router.route("/trademarks").post(createTrademark).get(getTrademarks);
const iprManagerController = require('../controllers/iprManagerController'); // Adjust the path according to your project structure

router.post('/iprmanager', iprManagerController.signupIprManager);
// Define routes for IPR
router.get('/', iprManagerController.getIPRs);
router.post('/:id/approve', iprManagerController.approveIPR);
router.post('/:id/reject', iprManagerController.rejectIPR);


// // Define routes for Trademarks
// router.get('/trademarks', iprManagerController.getTrademarks);
// router.post('/trademarks/:id/approve', iprManagerController.approveTrademark);
// router.post('/trademarks/:id/reject', iprManagerController.rejectTrademark);


// Define routes for Patents
// router.get('/patents', iprManagerController.getPatents);
// router.post('/patents/:id/approve', iprManagerController.approvePatent);
// router.post('/patents/:id/reject', iprManagerController.rejectPatent);


// Define routes for Dashboard
router.get('/dashboard/applications-by-month', iprManagerController.getApplicationsByMonth);
router.get('/dashboard/total-applications', iprManagerController.getTotalApplications);
router.get('/dashboard/applications-by-status', iprManagerController.getApplicationsByStatus);
 // Both request supported on the same route
router.post("/login", authUser);

module.exports = router;

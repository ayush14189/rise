const express = require("express");
const { createStartup,getStartups,updateStartup,signupResearcher,signupGovtAgency,authUser, allUsers,createFundingRequest,getFundingRequest,getFundingRequests,updateFundingRequest,createMentorshipRequest,getMentorshipRequests,createCollaborationRequest,getCollaborationRequests,createResearchProject, registerInvestor,getInvestorByUserId,getResearcherByUserId,getStartupByUserId,createPatent,getPatents,createTrademark,getTrademarks,getTrademarkById,updatePatentStatus,createInvestment,acceptFundingRequest,counterFundingRequest,getAllInvestmentsByInvestorId } = require("../controllers");
const { protect } = require("../middleware");
const { getResearchProjects } = require("../controllers/researchProjectController");

const router = express.Router();

router.route("/startup").post(createStartup).get(getStartups);
router.route("/startup/:id").put(updateStartup);
router.route("/funding-requests").post(createFundingRequest).get( getFundingRequests);
router.route("/funding-requests/:startupId").get( getFundingRequest);
router.route("/funding-request/:id").put(updateFundingRequest);

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
router.route("/investments").post(createInvestment);
router.route("/investments/:investor_id").get(getAllInvestmentsByInvestorId);
router.route("/funding-requests/:id/counter").put(counterFundingRequest);
router.route("/funding-requests/:id/accept").put(acceptFundingRequest);
router.route("/trademarks").post(createTrademark).get(getTrademarks);
const iprManagerController = require('../controllers/iprManagerController'); // Adjust the path according to your project structure

router.post('/iprmanager', iprManagerController.signupIprManager);
// Define routes for IPR
// router.get('/', iprManagerController.getIPRs);
// router.post('/:id/approve', iprManagerController.approveIPR);
// router.post('/:id/reject', iprManagerController.rejectIPR);


// // Define routes for Trademarks
// router.get('/trademarks', iprManagerController.getTrademarks);
router.post('/ipr/trademarks/:id/approve', iprManagerController.approveTrademark);
router.post('/ipr/trademarks/:id/reject', iprManagerController.rejectTrademark);


// Define routes for Patents
// router.get('/patents', iprManagerController.getPatents);
router.route('/ipr/patents/:id/approve').post(iprManagerController.approvePatent);
router.route('/ipr/patents/:id/reject').post(iprManagerController.rejectPatent);


// Define routes for Dashboard
router.get('/ipr/dashboard/applications-by-month', iprManagerController.getApplicationsByMonth);
router.get('/ipr/dashboard/total-applications', iprManagerController.getTotalApplications);
router.get('/ipr/dashboard/applications-by-status', iprManagerController.getApplicationsByStatus);
 // Both request supported on the same route
router.post("/login", authUser);

module.exports = router;

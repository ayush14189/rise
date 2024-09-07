const express = require("express");
const { createStartup,updateStartup,signupResearcher,signupInvestor,signupGovtAgency,authUser, allUsers,createFundingRequest,getFundingRequest,getFundingRequests,createMentorshipRequest,getMentorshipRequests,createCollaborationRequest,getCollaborationRequests,createIPR,getIPRs,createResearchProject } = require("../controllers");
const { protect } = require("../middleware");
const { getResearchProjects } = require("../controllers/researchProjectController");

const router = express.Router();

router.route("/startup").post(createStartup).get(protect, allUsers);
router.route("/startup/:id").put(updateStartup);
router.route("/fundingrequest").post(createFundingRequest).get(protect, getFundingRequests);
router.route("/fundingrequest/:startupId").get(protect, getFundingRequest);
router.route("/mentorshiprequest").post(createMentorshipRequest).get(protect, getMentorshipRequests);
router.route("/collaborationrequest").post(createCollaborationRequest).get(protect, getCollaborationRequests);
router.route("/ipr").post(createIPR).get(protect, getIPRs);

router.route("/researcher").post(signupResearcher).get(protect, allUsers);
router.route("/investor").post(signupInvestor).get(protect, allUsers);
router.route("/govtagency").post(signupGovtAgency).get(protect, allUsers);
router.route("/research-projects").post(createResearchProject).get(getResearchProjects)
router.route("/collaboration-requests").post(createCollaborationRequest).get(getCollaborationRequests)

 // Both request supported on the same route
router.post("/login", authUser);

module.exports = router;

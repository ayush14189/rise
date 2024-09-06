const express = require("express");
const { signupStartup,signupResearcher,signupInvestor,signupGovtAgency,authUser, allUsers,createFundingRequest,getFundingRequest,getFundingRequests,createMentorshipRequest,getMentorshipRequests,createCollaborationRequest,getCollaborationRequests,createIPR,getIPRs } = require("../controllers");
const { protect } = require("../middleware");

const router = express.Router();

router.route("/startup").post(signupStartup).get(protect, allUsers);
router.route("/fundingrequest").post(createFundingRequest).get(protect, getFundingRequests);
router.route("/fundingrequest/:id").get(protect, getFundingRequest);
router.route("/mentorshiprequest").post(createMentorshipRequest).get(protect, getMentorshipRequests);
router.route("/collaborationrequest").post(createCollaborationRequest).get(protect, getCollaborationRequests);
router.route("/ipr").post(createIPR).get(protect, getIPRs);

router.route("/researcher").post(signupResearcher).get(protect, allUsers);
router.route("/investor").post(signupInvestor).get(protect, allUsers);
router.route("/govtagency").post(signupGovtAgency).get(protect, allUsers);

 // Both request supported on the same route
router.post("/login", authUser);

module.exports = router;

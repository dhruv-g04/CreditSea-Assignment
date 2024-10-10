"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var LoanController_1 = require("../Controllers/LoanController");
var router = (0, express_1.Router)();
// Define the routes
router.post('/loan/add', LoanController_1.createLoan);
router.get('/loans', LoanController_1.getLoansByRole);
router.get('/loans/user', LoanController_1.getLoans);
router.patch('/loans/verifier', LoanController_1.updateLoanStatusVerifier);
router.patch('/loans/admin', LoanController_1.updateLoanStatusAdmin);
router.get('/loans/summary', LoanController_1.getLoanSummary);
exports.default = router;

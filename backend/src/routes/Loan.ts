import { Router } from 'express';
import { createLoan,
    getLoansByRole,
    getLoans,
    updateLoanStatusVerifier,
    updateLoanStatusAdmin,
    getLoanSummary } from '../Controllers/LoanController';
const router = Router();

// Define the routes
router.post('/loan/add', createLoan);
router.get('/loans', getLoansByRole);
router.get('/loans/user', getLoans);
router.patch('/loans/verifier', updateLoanStatusVerifier);
router.patch('/loans/admin', updateLoanStatusAdmin);
router.get('/loans/summary', getLoanSummary);

export default router;
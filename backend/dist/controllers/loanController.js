"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanSummary = exports.updateLoanStatusVerifier = exports.updateLoanStatusAdmin = exports.getLoans = exports.getLoansByRole = exports.createLoan = void 0;
var LoanModel_1 = require("../models/LoanModel");
// Reusable error handler
var errorHandler = function (res, statusCode, message, details) {
    res.status(statusCode).json({ error: message, details: details });
};
// Async wrapper for route handlers to catch async errors
var asyncWrapper = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.createLoan = asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, loanAmount, loanTenure, employmentStatus, reasonForLoan, employmentAddress, status, loanOfficer, newLoan, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullName = _a.fullName, loanAmount = _a.loanAmount, loanTenure = _a.loanTenure, employmentStatus = _a.employmentStatus, reasonForLoan = _a.reasonForLoan, employmentAddress = _a.employmentAddress;
                status = "PENDING";
                loanOfficer = "Not Assigned";
                console.log("loan created");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newLoan = new LoanModel_1.Loan({ fullName: fullName, loanAmount: loanAmount, loanTenure: loanTenure, employmentStatus: employmentStatus, reasonForLoan: reasonForLoan, employmentAddress: employmentAddress, status: status, loanOfficer: loanOfficer });
                return [4 /*yield*/, newLoan.save()];
            case 2:
                _b.sent();
                res.status(200).json(newLoan);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                errorHandler(res, 500, 'Error creating loan entry', error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.getLoansByRole = asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role, loans, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                role = req.query.role;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                loans = void 0;
                if (!(role === 'verifier')) return [3 /*break*/, 3];
                return [4 /*yield*/, LoanModel_1.Loan.find({ status: { $in: ['PENDING', 'VERIFIED'] } })];
            case 2:
                loans = _a.sent();
                return [3 /*break*/, 6];
            case 3:
                if (!(role === 'admin')) return [3 /*break*/, 5];
                return [4 /*yield*/, LoanModel_1.Loan.find({ status: { $in: ['VERIFIED', 'APPROVED', 'REJECTED'] } })];
            case 4:
                loans = _a.sent();
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, errorHandler(res, 400, 'Invalid role. Please specify either "verifier" or "admin".')];
            case 6:
                console.log("Data: ", loans);
                res.status(200).json(loans);
                return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                errorHandler(res, 500, 'Error fetching loan entries', error_2.message);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.getLoans = asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loans, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, LoanModel_1.Loan.find()];
            case 1:
                loans = _a.sent();
                console.log("Data: ", loans);
                if (loans.length === 0) {
                    return [2 /*return*/, errorHandler(res, 404, 'No loans found for this idNumber.')];
                }
                res.status(200).json(loans);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                errorHandler(res, 500, 'Error fetching loans by idNumber', error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.updateLoanStatusAdmin = asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status, _id, updatedLoan;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, status = _a.status, _id = _a._id;
                if (!status) {
                    return [2 /*return*/, errorHandler(res, 400, 'Status is required to update the loan.')];
                }
                return [4 /*yield*/, LoanModel_1.Loan.findByIdAndUpdate(_id, { status: status }, { new: true, runValidators: true })];
            case 1:
                updatedLoan = _b.sent();
                if (!updatedLoan) {
                    return [2 /*return*/, errorHandler(res, 404, 'Loan not found.')];
                }
                res.status(200).json(updatedLoan);
                return [2 /*return*/];
        }
    });
}); });
exports.updateLoanStatusVerifier = asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status, loanOfficer, _id, updatedLoan, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, status = _a.status, loanOfficer = _a.loanOfficer, _id = _a._id;
                if (!status) {
                    return [2 /*return*/, errorHandler(res, 400, 'Status is required to update the loan.')];
                }
                if (!loanOfficer) {
                    return [2 /*return*/, errorHandler(res, 400, 'loanOfficer is required to update the loan.')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LoanModel_1.Loan.findByIdAndUpdate(_id, { status: status, loanOfficer: loanOfficer }, { new: true, runValidators: true })];
            case 2:
                updatedLoan = _b.sent();
                if (!updatedLoan) {
                    return [2 /*return*/, errorHandler(res, 404, 'Loan not found.')];
                }
                res.status(200).json(updatedLoan);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                errorHandler(res, 500, 'Error updating loan status', error_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.getLoanSummary = asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, distinctActiveUsers, distinctBorrowUsers, approvedLoanCount, totalDisbursed, totalDisbursedloanAmount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    LoanModel_1.Loan.aggregate([{ $group: { _id: "$idNumber" } }]),
                    LoanModel_1.Loan.aggregate([{ $match: { status: { $ne: 'PENDING' } } }, { $group: { _id: "$idNumber" } }]),
                    LoanModel_1.Loan.countDocuments({ status: 'APPROVED' }),
                    LoanModel_1.Loan.aggregate([{ $match: { status: 'APPROVED' } }, { $group: { _id: null, totalDisbursedloanAmount: { $sum: "$loanAmount" } } }])
                ])];
            case 1:
                _a = _b.sent(), distinctActiveUsers = _a[0], distinctBorrowUsers = _a[1], approvedLoanCount = _a[2], totalDisbursed = _a[3];
                totalDisbursedloanAmount = totalDisbursed.length > 0 ? totalDisbursed[0].totalDisbursedloanAmount : 0;
                res.status(200).json([{
                        activeUserCount: distinctActiveUsers.length,
                        borrowUserCount: distinctBorrowUsers.length,
                        approvedLoanCount: approvedLoanCount,
                        totalDisbursedloanAmount: totalDisbursedloanAmount
                    }]);
                return [2 /*return*/];
        }
    });
}); });

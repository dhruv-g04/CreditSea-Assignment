import { ObjectId } from "mongoose";

export interface LoanFormData {
    fullName: string;
    loanAmount: number;
    loanTenure: number;
    employmentStatus: string;
    reasonForLoan: string;
    employmentAddress: string;
  }

export interface Loan {
  _id: ObjectId
  fullName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  status:string;
  loanOfficer:string;
  createdAt:string;
}

export interface LoanCardProps {
  loan: {
    _id: ObjectId
    fullName: string;
    loanAmount: number;
    loanTenure: number;
    employmentStatus: string;
    reasonForLoan: string;
    employmentAddress: string;
    loanOfficer:string;
    status:string;
    createdAt:string
  };
  actions: boolean;
  role:string;
}

export interface Summary {
  activeUserCount:number,
  approvedLoanCount:number,
  borrowUserCount:number,
  totalDisbursedloanAmount:number
}

export interface StatCardProps {
  label: string;
  value: string;
}
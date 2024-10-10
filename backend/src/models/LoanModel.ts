import mongoose, { Document, Schema } from 'mongoose';

interface ILoan extends Document {
  fullName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  status: string;
  loanOfficer?: string; 
}

// Create the Loan schema
const LoanSchema: Schema = new Schema({
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  loanAmount: {
    type: Schema.Types.Number,
    required: true,
  },
  loanTenure: {
    type: Schema.Types.Number,
    required: true,
  },
  employmentStatus: {
    type: Schema.Types.String,
    required: true,
  },
  reasonForLoan: {
    type: Schema.Types.String,
    required: true,
  },
  employmentAddress: {
    type: Schema.Types.String,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
  },
  loanOfficer: {
    type: Schema.Types.String,
    required: false, 
  }
}, { 
  timestamps: true, 
  versionKey: false 
});

// Create and export the Loan model
export const Loan = mongoose.model<ILoan>('Loans', LoanSchema);
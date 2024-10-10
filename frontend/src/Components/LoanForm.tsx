import { useState } from "react";
import { LoanFormData } from "../Interface";
import axios from "axios";
import { backendAPI } from '../App'

const LoanForm = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    fullName: "",
    loanAmount: 0,
    loanTenure: 0, // Initialize as a number
    employmentStatus: "",
    reasonForLoan: "",
    employmentAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update state based on input name
    setFormData((prev) => ({
      ...prev,
      [name]: 
        name === "loanAmount" || name === "loanTenure" 
          ? (value === "" ? 0 : Number(value)) // Convert to number or set to 0 if empty
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = backendAPI + "/api/loan/add";
    console.log(formData);
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (response.status !== 200) {
        throw new Error("Error submitting loan application");
      }

      alert("Loan application submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the loan application.");
    }
  };

  return (
    <div>
      <form className="p-8 space-y-6 bg-gray-100 rounded-lg h-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">APPLY FOR A LOAN</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <input
            type="text"
            name="fullName"
            placeholder="Full name as it appears on bank account"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="number"
            name="loanAmount"
            placeholder="How much do you need?"
            value={formData.loanAmount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="loanTenure"
            placeholder="Loan tenure (in months)"
            value={formData.loanTenure}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="employmentStatus"
            placeholder="Employment status"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            name="reasonForLoan"
            placeholder="Reason for loan"
            value={formData.reasonForLoan}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
          ></textarea>
          <input
            type="text"
            name="employmentAddress"
            placeholder="Employment address"
            value={formData.employmentAddress}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="w-28 bg-green-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;

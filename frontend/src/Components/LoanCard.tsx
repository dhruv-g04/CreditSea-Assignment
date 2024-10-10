import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LoanCardProps } from "../Interface";
import { getRandomName } from "../Utility";
import { backendAPI } from '../App';

// Status color based on loan status
const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    APPROVED: "bg-blue-500 text-white",
    PENDING: "bg-yellow-500 text-white",
    REJECTED: "bg-red-500 text-white",
    VERIFIED: "bg-green-500 text-white", // Add more statuses as needed
  };
  return statusColors[status === "" ? "PENDING" : status] || "bg-gray-500 text-white";
};

const LoanCard: React.FC<LoanCardProps> = ({ loan, actions, role }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState(loan.status); // Initialize with loan status
  const dropdownRef = useRef<HTMLDivElement>(null);

  const actionOptions = role === "verifier"
    ? ["Verify", "Reject"]
    : role === "admin"
    ? ["Accept", "Reject"]
    : [];

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Log for debugging
  console.log("name: ", loan.fullName);
  console.log("status: ", status);

  // Handle action and status update
  const handleAction = async (action: string) => {
    const statusMap: Record<string, string> = {
      Verify: "VERIFIED",
      Reject: "REJECTED",
      Accept: "APPROVED",
    };
    const updatedStatus = statusMap[action];
    
    try {
      const officer_name: string = getRandomName();
      console.log(role);
      
      await axios.patch(backendAPI + /api/loans/${role}, {
        status: updatedStatus,
        loanOfficer: role === "verifier" ? officer_name : undefined,
        _id: loan._id
      });
      setStatus(updatedStatus);
    } catch (error) {
      console.error("Error updating loan status", error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b p-4 transition-all duration-200 relative">
      <div className="flex items-center">
        <img
          src={role === "user" ? https://i.pravatar.cc/40?u=${loan.loanOfficer} : 
            https://i.pravatar.cc/40?u=${loan.fullName}}
          alt={loan.loanOfficer}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-sm font-medium">{role === "user" ? loan.loanOfficer : loan.fullName}</h3>
          <p className="text-xs text-gray-500">Updated 1 day ago</p>
        </div>
      </div>
      <div className="text-sm text-gray-700">${loan.loanAmount}</div> {/* Use loanAmount here */}
      <div className="text-sm text-gray-500">{new Date(loan.createdAt).toLocaleDateString()}</div> {/* Format createdAt */}
      <span className={px-4 py-2 rounded-full text-sm ${getStatusColor(status)}}>
        {status}
      </span>

      {actions && (role === "admin" || role === "verifier") && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="ml-4 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-300 focus:outline-none"
          >
            &#x22EE;
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 z-10 bg-white shadow-md rounded-md w-40">
              {actionOptions.map((action) => (
                <li
                  key={action}
                  onClick={() => handleAction(action)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCard;
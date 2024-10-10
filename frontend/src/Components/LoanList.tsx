import LoanCard from "./LoanCard";
import { Loan } from "../Interface";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendAPI } from '../App'

const LoanList = ({ role }: { role: string }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  // Default role to "user" if it's undefined
  const finalRole = role || "user";

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        let resp;

        // Conditionally fetch data based on finalRole
        if (finalRole === "user") {
          resp = await axios.get(backendAPI + "/api/loans/user");
        } else if (finalRole === "admin" || finalRole === "verifier") {
          resp = await axios.get(backendAPI + `/api/loans?role=${finalRole}`);
        } else {
          setLoading(false); // Invalid role
          return;
        }

        setLoans(resp.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [finalRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {loans.length > 0 ? (
        loans.map((loan, index: number) => (
          <LoanCard key={index} loan={loan} actions={true} role={finalRole} />
        ))
      ) : (
        <div>No loans found</div>
      )}
    </div>
  );
};

export default LoanList;

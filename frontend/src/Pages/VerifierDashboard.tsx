import React,{useEffect,useState} from "react"
import { Summary } from "../Interface"
import axios from "axios"
import StatCard from "../Components/StatCard"
import Loans from "../Components/Loans"
import { backendAPI } from '../App'

const VerifierDashboard = () => {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(backendAPI + "/api/loans/summary");
        setSummary(response.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchSummary();
  }, []);

  const stats = [
    { label: "Cash Received", value: "100,000"},
    { label: "Loans", value: summary[0]?.approvedLoanCount || 0 },
    { label: "Borrowers", value: summary[0]?.borrowUserCount || 0 },
    { label: "Cash Disbursed", value: summary[0]?.totalDisbursedloanAmount || 0 },
    { label: "Savings", value: "40,000" },
    { label: "Repaid Loans", value: 30 },
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-200 flex-1 overflow-scroll">
          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <StatCard key={index} label={stat.label} value={`${stat.value}`} />
            ))}
          </div>
            {/* Loan List section */}
          <Loans role="verifier"/>
        </div>
      </div>
    </div>
  )
}

export default VerifierDashboard;
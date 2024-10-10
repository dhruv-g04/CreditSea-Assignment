import React,{useEffect,useState} from "react"
import { Summary } from "../Interface"
import axios from "axios"
import StatCard from "../Components/StatCard"
import Loans from "../Components/Loans"
import { backendAPI } from '../App'

const AdminDashboard = () => {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(backendAPI + "/api/loans/summary");
        setSummary(response.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchLoans();
  }, []); // Fetch loans on mount

  const stats = [
    { label: "Active Users", value: summary[0]?.activeUserCount || 0 },
    { label: "Loans", value: summary[0]?.approvedLoanCount || 0 },
    { label: "Borrowers", value: summary[0]?.borrowUserCount || 0 },
    { label: "Cash Disbursed", value: summary[0]?.totalDisbursedloanAmount || 0 },
    { label: "Savings", value: 450000 },
    { label: "Cash Received", value: 1000000 },
    { label: "Repaid Loans", value: 1000000 },
    { label: "Other Accounts", value: 10 },
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-200 flex-1 overflow-scroll">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <StatCard key={index} label={stat.label} value={`${stat.value}`} />
            ))}
          </div>

          {/* Loan List */}
          <Loans role="admin"/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
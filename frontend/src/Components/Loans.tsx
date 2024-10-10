import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loan } from '../Interface'
import LoanCard from './LoanCard'

import { backendAPI } from '../App'

const Loans = ({role}:{role:string}) => {
    // const role: string = "admin";
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [finalLoans, setFinalLoans] = useState<Loan[]>([]);
    const [sorting, setSorting] = useState<string>("price");
    const [filter, setFilter] = useState({ maxPrice: 1000000, lastDate: "" });

    // Default role to "user" if it's undefined
    const finalRole = role || "user";
    console.log("backendAPI: ",backendAPI);
    
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                let resp;
                if (finalRole === "user") {
                    resp = await axios.get(backendAPI + "/api/loans/user");
                } else if (finalRole === "admin" || finalRole === "verifier") {
                    resp = await axios.get(backendAPI + `/api/loans?role=${finalRole}`);
                } else {
                    setLoading(false);
                    return;
                }
                setLoans(resp.data);
                setFinalLoans(resp.data);
            } catch (error) {
                console.error("Error fetching loans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, [finalRole]);

    useEffect(() => {
        let currentData = loans;

        // Sorting logic
        if (sorting === "price") {
            currentData = [...currentData].sort((a, b) => a.loanAmount - b.loanAmount);
        } else if (sorting === "date") {
            currentData = [...currentData].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }

        // Filter logic
        currentData = currentData.filter(loan => loan.loanAmount <= filter.maxPrice);
        if (filter.lastDate) {
            currentData = currentData.filter(loan => new Date(loan.createdAt) >= new Date(filter.lastDate));
        }

        setFinalLoans(currentData);
    }, [sorting, filter, loans]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='loans'>
            <div className='row-1'
            style ={{overflowX:"scroll",
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                gap:"10px",
                width:"100%",            
            }}
            >
                <h1 style={{fontSize:"30px",width:"300px"}}>Recent Loans</h1>
                {/* <div className='col_2' style={{display:"flex",gap:"20px",width:"500px"}}>
                    <label htmlFor="sorting" className="mr-2">Sort by:</label>
                    <select
                        id="sorting"
                        value={sorting}
                        onChange={(e) => setSorting(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="price">Price</option>
                        <option value="date">Date</option>
                    </select>

                    <label htmlFor="maxPrice" className="ml-4 mr-2">Max Price:</label>
                    <input
                        id="maxPrice"
                        type="number"
                        value={filter.maxPrice}
                        onChange={(e) => setFilter({ ...filter, maxPrice: parseInt(e.target.value) || 0 })}
                        className="border rounded p-2"
                    />
                    <label htmlFor="lastDate" className="ml-4 mr-2">Created After</label>
                    <input
                        id="lastDate"
                        type="date"
                        value={filter.lastDate}
                        onChange={(e) => setFilter({ ...filter, lastDate: e.target.value })}
                        className="border rounded p-2"
                    />
                </div> */}
            </div>

            <div className="row-2 flex justify-between rounded-xl mb-5 items-center border-b p-4 hover:bg-gray-100 transition-all duration-200">
                <div className="text-gray-500">{role === "user" ? "Loan Officer" : "User Details"}</div>
                <div className="text-gray-500">Amount</div>
                <div className="text-gray-500">Date</div>
                <div className="text-gray-500">Status</div>
                {role === "user" ? <></> : <div className="text-gray-500">Action</div>}
            </div>

            <div className="row-3 bg-white rounded-lg shadow-lg p-4">
                {finalLoans.length > 0 ? (
                    finalLoans.map((loan, index: number) => (
                        <LoanCard key={index} loan={loan} actions={true} role={finalRole} />
                    ))
                ) : (
                    <div>No loans found</div>
                )}
            </div>
        </div>
    );
};

export default Loans;

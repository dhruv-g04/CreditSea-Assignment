import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "../Components/Modal";
import LoanForm from "../Components/LoanForm";
import LoanList from "../Components/LoanList";
import Loans from "../Components/Loans";
const User = () => {

  const [activeTab,setActiveTab] = useState<string>("borrow");
  const [formDisplay,setFormDisplay] = useState<boolean>(false);
  const handleGetLoanClick = () => {
    setFormDisplay(true);
    };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <div className="p-6 bg-gray-100 flex justify-center">
        <div className="p-6 max-w-4xl w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 w-5 text-white p-4 rounded-full"></div>
              <div>
                <h3 className="text-black-500 uppercase text-sm font-semibold">
                  Deficit
                </h3>
                <p className="text-green-500 text-2xl font-bold">₦ 0.0</p>
              </div>
            </div>

            <button
              onClick={handleGetLoanClick}
              className="bg-gray-500 hover:bg-gray-800 text-gray-100 font-semibold py-2 px-6 rounded-lg"
            >
              Get A Loan
            </button>
          </div>

          <div className="flex space-x-2 mb-4">
            {["borrow", "transact", "deposit"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 rounded-lg shadow ${
                  activeTab === tab
                    ? "bg-green-100 text-green-700"
                    : "bg-white text-gray-700 border"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Cash
              </button>
            ))}
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search for loans"
            />
            <FaSearch className="absolute top-4 left-4 text-gray-500" />
          </div>

          <div className="container max-w-5xl mx-auto px-4 py-8">
            {activeTab === "borrow" ? (
              <Loans role="user"/>
            ) : (
              <div className="flex justify-center items-center h-64">
                <h1 className="text-3xl font-semibold text-gray-500">
                  Coming Soon
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isVisible={formDisplay} onClose={() => setFormDisplay(false)}>
        <LoanForm/>
      </Modal>
    </div>
  )
}

export default User;
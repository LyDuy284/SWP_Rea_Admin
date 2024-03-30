import { Link } from "react-router-dom";

const VNPaySuccessPage= () => {
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your payment via VNPay was successful. Thank you for your purchase!</p>
      {/* You can add more details or links here */}
      <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default VNPaySuccessPage;

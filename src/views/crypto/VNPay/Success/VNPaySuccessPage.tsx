import { apiDoneTransfer, apiGetTransferById } from "@/services/TransferViewService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VNPaySuccessPage= () => {

  const handleDoneTransfer = async () => {
    const [loading, setLoading] = useState(false);
    const [transfer, setTransfer] = useState<any>();
    const [notification, setNotification] = useState<{ message: string, success: boolean } | null>(null);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
      // Check if 'id' is available
      if (!id) return;
      fetchTransferDetails();
      // Call the fetchTransferDetails function
    }, [id]);
  
    const fetchTransferDetails = async () => {
      try {
        setLoading(true); // Set loading to true
        const data = await apiGetTransferById({ id: id }); // Fetch transfer details
        setTransfer(data); // Update transfer state with fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching transfer details:', error);
        setLoading(false); // Set loading to false
      }
    };
    try {
      setLoading(true);
      
      await apiDoneTransfer({ id: id });
      await fetchTransferDetails();
      setNotification({ message: 'Transfer done successfully', success: true });
    } catch (error) {
      console.error('Error approving transfer:', error);
      setNotification({ message: 'Failed to done transfer', success: false });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your payment via VNPay was successful. Thank you for your purchase!</p>
      {/* You can add more details or links here */}
      <Link to="/transfer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
        Done
      </Link>
    </div>
  );
};

export default VNPaySuccessPage;

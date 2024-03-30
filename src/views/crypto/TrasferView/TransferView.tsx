// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@/components/shared';
import { apiApproveTransfer, apiGetTransferById, apiRejectTransfer } from '@/services/TransferViewService'; // Import function to fetch transfer details by ID
import useThemeClass from '@/utils/hooks/useThemeClass';
import axios from 'axios';



// Define the TransferView component
const TransferView = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams<{ id: string }>();
  const [transfer, setTransfer] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [notification, setNotification] = useState<{ message: string, success: boolean } | null>(null);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [fileInput, setFileInput] = useState<any>(null);
  const { textTheme } = useThemeClass();
  const [userId, setUserId] = useState<number | null>(null);
  const [propertyPrice, setPropertyPrice] = useState<number | null>(null);
  const [vnpayUrl, setVnpayUrl] = useState<string | null>(null);


  // Fetch transfer details when the component mounts or 'id' changes
  useEffect(() => {
    // Check if 'id' is available
    if (!id) return;
    fetchTransferDetails();
    fetchUserId();
    fetchPropertyPrice(); // Call the fetchTransferDetails function
  }, [id]);

  const fetchUserIdFromAPI = async () => {
    try {
      const response = await axios.get('API_ENDPOINT_TO_GET_USER_ID');
      if (response.data && response.data.userId) {
        setUserId(response.data.userId);
      } else {
        console.error('User ID not found in API response');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  // Call fetchUserIdFromAPI when component mounts
  useEffect(() => {
    fetchUserIdFromAPI();
  }, []);

  useEffect(() => {
    if (transfer) {
      const price = transfer?.property?.price;
      if (price) {
        const calculatedAmount = price * 0.1;
        makeVNPAYApiCall(calculatedAmount);
      }
    }
  }, [transfer]);
  const fetchUserId = () => {
    // Set userId when the user logs in
    const loggedInUserId = 123; // Replace with the actual logged-in user ID
    setUserId(loggedInUserId);
  };
  const fetchPropertyPrice = async () => {
    try {
      // Fetch property price from your API
      const response = await axios.get('API_ENDPOINT_TO_GET_PROPERTY_PRICE');
      if (response.data && response.data.price) {
        setPropertyPrice(response.data.price);
      } else {
        console.error('Property price not found in API response');
      }
    } catch (error) {
      console.error('Error fetching property price:', error);
    }
  };
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

  const handleApproveTransfer = async () => {
    try {
      setLoading(true); // Set loading to true
      // Send approval request to the backend API
      await apiApproveTransfer({ id: id });
      // Reload transfer details after approval
      await fetchTransferDetails();
      setNotification({ message: 'Transfer approved successfully', success: true });
    } catch (error) {
      console.error('Error approving transfer:', error);
      setNotification({ message: 'Failed to approve transfer', success: false });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleRejectTransfer = async () => {
    // Open reject popup
    setShowRejectPopup(true);
  };

  const submitRejectTransfer = async () => {
    try {
      setLoading(true);
      await apiRejectTransfer({ id: id, reason: rejectReason });
      await fetchTransferDetails();
      setNotification({ message: 'Transfer rejected successfully', success: true });
      setRejectReason('');
    } catch (error) {
      console.error('Error rejecting transfer:', error);
      setNotification({ message: 'Failed to reject transfer', success: false });
    } finally {
      setLoading(false);
      // Close reject popup after submission
      setShowRejectPopup(false);
    }
  };



  const calculateAmount = () => {
    if (propertyPrice !== null) {
      return propertyPrice * 0.1; // Calculate 10% of the property price
    }
    return null;
  };
  const makeVNPAYApiCall = async (amount: number) => {
    try {
      setLoading(true);
      if (userId !== null && amount !== null) {
        const response = await axios.get('https://reaauction.azurewebsites.net/v1/auction/VNPay', {
          params: {
            userId: userId,
            amount: amount
          }
        });
        if (response.status === 200) {
          const vnpayUrlFromAPI = response.data.result;

          setVnpayUrl(vnpayUrlFromAPI);

        } else {
          console.error('Failed to fetch VNPAY URL. Unexpected status:', response.status);
        }
      } else {
        console.error('User ID or amount is null');
      }
    } catch (error) {
      console.error('Error making VNPAY API call:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (vnpayUrl) {
      window.location.href = vnpayUrl;
    } else {
      console.error('VNPAY URL is not available');
    }
  };
  const uploadImages = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('files', fileInput.files[i]);
      }
      const headers = {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MTE4NTk2NDIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzciLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwIn0.Ys_kktCMNKwLRwzihoJnEKs_xnFBAE2DqrrHnKF3Df0"}`, // Replace "your_access_token" with your actual access token
      };
      const response = await fetch('https://reaauction.azurewebsites.net/v1/auction/storage/upload/multiple-files', {
        method: 'POST',
        headers: headers,
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();

        const url = {
          transactionImages: data.result
        }
        const res = await axios.put(`https://reaauction.azurewebsites.net/v1/auction/TransferForm/admin/${id}`, url, {
          headers: headers,
        });

        console.log(res);

        // Handle the response as needed
        setNotification({ message: 'Images uploaded successfully', success: true });
      } else {
        console.error('Failed to upload images:', response.statusText);
        setNotification({ message: 'Uploaded Failed', success: false });
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render the TransferView component
  return (
    <div className="w-full">
      <Loading loading={loading}> {/* Show loading spinner if data is loading */}
        {/* Display transfer details if available */}
        {transfer && (
          <div className="w-full flex flex-col">
            {/* Navigation links */}
            <div className="flex items-center gap-1 text-lg mb-4">
              <Link to="/app/transfer-list" className={`hover:${textTheme} transition-all`}>
                Transfer
              </Link>
              <div>/ Chi tiết</div>
            </div>
            {/* Display transaction image */}
            <div className="w-full">
              {transfer && transfer.transferImages && transfer.transferImages[0] && (
                <img
                  src={transfer.transferImages[0]} // Assuming transactionImages contains image URLs
                  className="w-full h-full object-cover rounded-sm"
                  alt="Transfer  Image"
                />
              )}
            </div>
            {/* Display transfer details */}
            <div className="mt-4">
              <h6>
                Tiêu đề: <span className="opacity-80">{transfer.title}</span>
              </h6>
              <h6>
                Nội dung: <span className="opacity-80">{transfer.content}</span>
              </h6>
              <h6>
                Price: <span className="opacity-80">{transfer.property.price}</span>
              </h6>
              {showRejectPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Reject Transfer</h2>
                    <input
                      type="text"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Enter reason for rejection"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                    />
                    <div className="flex justify-between ml-4 mr-4">
                      <button onClick={() => setShowRejectPopup(false)} className="bg-red-500 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Cancel
                      </button>
                      <button onClick={submitRejectTransfer} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className='flex justify-center'>
                <button onClick={handleApproveTransfer} className="mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Approve Transfer
                </button>
                <button onClick={handleRejectTransfer} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Reject Transfer
                </button>
              </div>
              <div className='flex justify-evenly' >
                <div className='flex justify-evenly w-1/4'>

                  <button onClick={handleButtonClick} className="mr-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    {loading ? 'Loading...' : vnpayUrl ? 'Go to VNPAY' : 'Get VNPAY URL'}
                  </button>
                  <form onSubmit={uploadImages} encType="multipart/form-data">

                    <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4">
                      Upload Image
                    </button>
                    <input type="file" onChange={(e) => setFileInput(e.target)} />
                  </form>
                </div>
              </div>

              {notification && (
                <div className={`mt-4 text-center ${notification.success ? 'text-green-600' : 'text-red-600'}`}>
                  {notification.message}
                </div>
              )}

            </div>
          </div>
        )}
      </Loading>

    </div>
  );
};

export default TransferView;

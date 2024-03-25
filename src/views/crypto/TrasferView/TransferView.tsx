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

  // Define state variables for transfer data and loading status
  const [transfer, setTransfer] = useState<any>(); // Adjust the type according to the response structure
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [notification, setNotification] = useState<{ message: string, success: boolean } | null>(null);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [fileInput, setFileInput] = useState<any>(null);
  // Custom hook to manage theme class
  const { textTheme } = useThemeClass();

  // Fetch transfer details when the component mounts or 'id' changes
  useEffect(() => {
    // Check if 'id' is available
    if (!id) return;
    fetchTransferDetails(); // Call the fetchTransferDetails function
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

  const makeVNPAYApiCall = async () => {
    try {
      // Make API call to VNPAY endpoint
      const response = await fetch('https://reaauction.azurewebsites.net/v1/auction/VNPay');
      if (response.ok) {
        // Process response if successful
        const data = await response.json();
        console.log('VNPAY API Response:', data);
        // Handle data as needed
      } else {
        // Handle errors if response is not okay
        console.error('VNPAY API Error:', response.status);
      }
    } catch (error) {
      console.error('Error making VNPAY API call:', error);
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
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MTE0NTA2NjMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzciLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwIn0.NEdW4SPHAL8rFt91Fhd8rBlPFWbEJGUra05HrO7I1bg"}`, // Replace "your_access_token" with your actual access token
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
        const res = await axios.put(`https://reaauction.azurewebsites.net/v1/auction/TransferForm/member/${id}`, url, {
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
                <div className='flex justify-evenly w-1/3'>
                  <button onClick={makeVNPAYApiCall} className="mr-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    VNPAY API
                  </button>
                  <form onSubmit={uploadImages} encType="multipart/form-data">
                    <input type="file" onChange={(e) => setFileInput(e.target)} />
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                      Upload Image
                    </button>
                  </form>
                </div>
              </div>
              
              {notification && (
                <div className={`mt-4 text-center ${notification.success ? 'text-green-600' : 'text-red-600'}`}>
                  {notification.message}
                </div>
              )}
              {/* Add more details as needed */}
            </div>
          </div>
        )}
      </Loading>

    </div>
  );
};

export default TransferView;

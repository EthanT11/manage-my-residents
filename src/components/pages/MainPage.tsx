import { useEffect, useState } from 'react';
import { NewInformationPanel } from '../InformationPanel';
import { useNavigate } from 'react-router-dom';
import useSupabase from '@/hooks/useSupabase';

export default function MainPage() {
  const { fetchUser } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser().then(({ user }) => {
      if (!user) {
        console.log('User not found');
        navigate('/sign-in');
      }
    });
  }, []);


  // TODO: factor out SideManager
  // Route the links to the appropriate pages
  function SideManager() {
    return (
      <div className="flex flex-col w-64 bg-blue-00 text-white shadow-md">
        
        <h1 className="text-2xl font-bold mb-4">Manage My Residents</h1>    
          <ul>
            <li className="p-4 hover:bg-blue-800 cursor-pointer">Home</li>
            <li className="p-4 hover:bg-blue-800 cursor-pointer">Account</li>
            <li className="p-4 hover:bg-blue-800 cursor-pointer">SignOut</li>
          </ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col font-roboto h-screen bg-gray-100"> {/* Container for the entire page */}
      <div className="flex flex-1 shadow-lg h-full overflow-auto">
        <div className="flex bg-blue-700">
          <SideManager />
        </div>
        <div className='w-3/4 flex flex-col p-4'>
          <NewInformationPanel />
        </div>
      </div>
    </div>
  );
};
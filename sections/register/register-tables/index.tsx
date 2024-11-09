'use client';

import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import RegisterTablePage from './register-table';

export default function RegisterTable() {

  const [data, setData] = useState<AdminRegisterUsers[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);
  const [preparingCount, setPreparingCount] = useState<number>(0); // Count of "preparing" items

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Payment redeems
        const registerResponse = await fetch('/api/admin/getregister'); // Your API for redeems
        const registerResult = await registerResponse.json();
        
        // Fetch Admin Register Users
        const usersResponse = await fetch('/api/admin/getregister'); // Your API for users
        const usersResult = await usersResponse.json();
        
        const combinedData = registerResult.data.flatMap((registerEntry:any) => 
          registerEntry.register.map((register: UserRegister) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === register.id);          
            return { ...register, user }; 
          })
        );

        // Calculate count of items with status "preparing"
        const preparingItemsCount = combinedData.filter((item) => item.status === 'preparing').length;

        // Set data, total counts, and preparing count
        setData(combinedData);
        setTotalData(registerResult.totalCount); // Adjust if necessary
        setPreparingCount(preparingItemsCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  }

  return (
    <div className="space-y-4 ">
      <div className='text-red-500 font-medium'>Pending Request Count: {preparingCount}</div>
      <RegisterTablePage columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}

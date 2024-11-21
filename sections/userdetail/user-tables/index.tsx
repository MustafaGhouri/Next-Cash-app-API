'use client';

import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import UserdetailTablePage from './userdetail-table';
import UserdetailInfo from './userdetail-info';

export default function UserdetailTable() {
  const [data, setData] = useState<AdminRegisterUsers[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const UserResponse = await fetch('/api/admin/getregisteruser');
        const UserResult = await UserResponse.json();

        const usersResponse = await fetch('/api/admin/getregisteruser');
        const usersResult = await usersResponse.json();

        const combinedData = UserResult.data.flatMap((registerEntry: any) =>
          registerEntry.register.map((register: UserRegister) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === register.id);
            return { ...register, user };
          })
        );

        setData(combinedData);
        setTotalData(UserResult.totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:flex">
      <div className='w-full lg:w-[400px]'>
      <UserdetailInfo />
      </div>
      <div className='w-full ml-2 mt-5 lg:mt-0'>
      <UserdetailTablePage columns={columns} data={data} totalItems={data.length} />
      </div>
    </div>
  );
}

'use client';
import { AdminRegisterUsers, Paymentredeems } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<AdminRegisterUsers & Paymentredeems>[] = [
  {
    accessorKey: 'paymenttype',
    header: 'Type'
  },
  {
    accessorKey: 'date',
    header: 'TIME',
    cell: ({ row }) => {
      const date = new Date(row.original.date); // Pass the date string to the Date constructor
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11) and pad with leading zero
      const day = String(date.getDate()).padStart(2, '0'); // Get day (1-31) and pad with leading zero
      const year = date.getFullYear(); // Get full year
      const hours = String(date.getHours()).padStart(2, '0'); // Get hours (0-23) and pad with leading zero
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes (0-59) and pad with leading zero
  
      // Format like "10/16 24 15:16"
      return `${month}/${day} ${year.toString().slice(-2)} ${hours}:${minutes}`;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `$${row.original.amount}` 
  },
  {
    accessorKey: 'paymentstatus',
    header: 'Status'
  },
];

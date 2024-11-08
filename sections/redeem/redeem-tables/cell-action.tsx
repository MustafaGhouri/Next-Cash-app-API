'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CheckCircle, MoreHorizontal, Send, Trash, X } from 'lucide-react';
import { useTransition } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import { AdminRegisterUsers } from '@/constants/data';

interface CellActionProps {
  data: AdminRegisterUsers;
}

export const CellAction: React.FC<CellActionProps> = ({ redeemDate, userId }: any) => {

  const { dismiss } = useToast();
  const [loading, startTransition] = useTransition();

  const redeem = async () => {
    startTransition(async () => {
      try {
        const response = await userredeemCheck({
          id: userId,
          paymentstatus: "complete",
          date: redeemDate,
        });

        if (response.error) {
          return;
        }

        toast({
          title: 'Accept Successful!',
          description: 'You have accepted successful!',
          action: <button onClick={dismiss}>Accept</button>,
        });

        location.reload();

      } catch (error) {
        toast({
          title: 'Accept Failed!',
          description: 'Your action has been failed. Please try again!',
        });
      }
    });
  };

  const userredeemCheck = async (userData: { paymentstatus: string, id: string; date: any }) => {
    try {
      const response = await fetch('/api/admin/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'redeem failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const unredeem = async () => {
    startTransition(async () => {
      try {
        const response = await userUnredeemCheck({
          id: userId,
          paymentstatus: "decline",
          date: redeemDate,
        });

        if (response.error) {
          return;
        }

        toast({
          title: 'Decline Successful!',
          description: 'You have declined successful!',
          action: <button onClick={dismiss}>Decline</button>,
        });

        location.reload();

      } catch (error) {
        toast({
          title: 'redeem Failed!',
          description: 'Your action has been failed. Please try again!',
        });
      }
    });
  };

  const userUnredeemCheck = async (userData: { paymentstatus: string, id: string; date: any }) => {
    try {
      const response = await fetch('/api/admin/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'redeem failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  
  }
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={redeem}
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Accept
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={unredeem}
          >
            <X className="mr-2 h-4 w-4" /> Decline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

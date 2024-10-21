'use client';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';

import useSocket from '@/lib/socket';

const {socket} = useSocket();


interface UserData {
  codenumber: string;
  phonenumber: string;
  status: string;
}

export const CodeAction = ({ phoneNumber, codeNumber, userName }: { phoneNumber: string; codeNumber?: string; userName: string }) => {
  
  const { dismiss } = useToast();
  const [codenum, setCodenum] = useState(codeNumber || ""); // Initialize with codeNumber if available

  const userData: UserData = {
    codenumber: codenum,
    phonenumber: phoneNumber,
    status: "preparing"
  }

  // Example signUp function
  const onSubmit = async (userData: UserData) => {
    try {
      const response = await fetch('/api/admin/coderegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Code sending failed' }; // Handle response error
      }

      toast({
        title: 'Code Sending Successful!',
        description: 'Welcome! Your code sending has been successful.',
        action: <button onClick={dismiss}>Code Sending</button>,
      });
      
      socket.emit("adminRegister", {receiveuserId: userName, message:"Client sent codenumber to you!"} )

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      toast({
        title: 'Code Sending Failed!',
        description: 'Your code sending has failed. Please try again.',
      });
      throw error; // Rethrow or return an error response
    }
  };

  // Function to handle button click
  const handleButtonClick = async () => {
    const response = await onSubmit(userData);

    // Handle the response or error here
    if (response && response.error) {
      console.error(response.error);
    } else {
      console.log("Success:", response);
    }
  };

  // Set codenum whenever codeNumber prop changes
  useEffect(() => {
    if (codeNumber) {
      setCodenum(codeNumber);
    } else {
      setCodenum(""); // Reset if codeNumber is none or invalid
    }
  }, [codeNumber]);

  return (
    <div className='relation flex justify-center'>
      <input
        className=' w-20 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        maxLength={6}
        value={codenum} // Set input value to codenum
        onChange={(e) => setCodenum(e.target.value)}
        disabled={codeNumber && codeNumber !== "none"}
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
      />
      <Button className='h-8 w-10 text-xs bg-white' onClick={handleButtonClick} disabled={codeNumber && codeNumber !== "none"} >
        SEND
      </Button>
    </div>
  );
};

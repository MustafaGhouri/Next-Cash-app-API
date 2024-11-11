'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import useSocket from '@/lib/socket';

interface UserData {
  phonenumber: string;
  codenumber: string;
}

const {socket} = useSocket();
const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export const CodeAction = ({ codeNumber, statusNow, phoneNumber }:{codeNumber: string, statusNow: string, phoneNumber: string}) => {
  
  const [codenum, setCodenum] = useState("");
  const {dismiss} = useToast();
  const [isCooldown, setIsCooldown] = useState(false);

  const userData = {
    token: userInfo.token,
    phonenumber: phoneNumber,
    codenumber: codenum,
    status: "complete",
  }

  const onSubmit = async (userData: UserData) => {
    try {
      const response = await fetch('/api/customer/coderegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'UserRegister failed' };
      }

      socket.emit("userVerify", {userId: userInfo.userId, message:`${userInfo.name} received login id and password code!`});

      location.reload();
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const onVerify = async () => {
    const response = await onSubmit(userData);
    if (response && response.error) {
      toast({
        title: 'Codenumber Verify Failed',
        description: 'Please try again.'
      });
    } else {
      toast({
        title: 'Codenumber Verify Successful',
        description: 'Welcome! Your codenumber has been verified.',
        action: <button onClick={dismiss}>CodeNumber Verify</button>,
      });
      
      // Start the cooldown after successful submission
    }
  };

  useEffect(() => {
    if (statusNow === "complete" && codeNumber) {
      setCodenum(codeNumber);
    } else {
      setCodenum("");
    }
  }, [codeNumber, statusNow]);
  
  return (
    <div className='flex w-full justify-center'>
      <input
        value={codenum}
        className='w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        onChange={(e) => setCodenum(e.target.value)}
        disabled={statusNow === "complete" || isCooldown} // Disable input during cooldown
      />
      <Button 
        className='h-8 w-12 ml-1 text-xs bg-green-500 text-white' 
        handleClick={onVerify} 
        disabled={codeNumber === "none" || statusNow === "complete" || isCooldown} // Disable button during cooldown
      >
        Verify
      </Button>
    </div>
  );
};

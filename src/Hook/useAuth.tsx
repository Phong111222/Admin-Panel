import { useEffect, useState } from 'react';

export default function useAuth() {
  const [jwt, setJwt] = useState<string | null>(null);
  useEffect(() => {
    setJwt(window.localStorage.getItem('token'));
  }, [jwt]);
  return jwt;
}

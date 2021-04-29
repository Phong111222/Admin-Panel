import { useState } from 'react';

export default function useAuth() {
  const [jwt, setJwt] = useState<string | null>(
    window.localStorage.getItem('token')
  );

  return jwt;
}

import { useState } from 'react';

export default function useAuth() {
  const [jwt] = useState<string | null>(window.localStorage.getItem('token'));

  return jwt;
}

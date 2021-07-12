import jwt_decode from 'jwt-decode';
import { FC, ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../Hook/useAuth';

interface Props {
  children: ReactNode;
}

const WrappedAuth: FC<Props> = ({ children }) => {
  const jwtAuth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!jwtAuth) {
      history.push('/logout');
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (jwtAuth) {
      const currentDate = Date.now();
      const jwt_decoded = jwt_decode<{ exp: number; iat: number }>(jwtAuth);
      if (jwt_decoded.exp * 1000 < currentDate) {
        history.push('/logout');
      }
    }
    // eslint-disable-next-line
  }, []);
  return <>{children}</>;
};

export default WrappedAuth;

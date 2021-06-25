import useAuth from '../../../Hook/useAuth';
import jwt_decode from 'jwt-decode';
import { FC, ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';

interface Props {
  children: ReactNode;
}

const WrappedAuth: FC<Props> = ({ children }) => {
  const jwtAuth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!jwtAuth) {
      history.replace('/login');
    }
  }, [jwtAuth, history]);
  useEffect(() => {
    if (jwtAuth) {
      const currentDate = Date.now();
      const jwt_decoded = jwt_decode<{ exp: number; iat: number }>(jwtAuth);
      if (jwt_decoded.exp * 1000 < currentDate) {
        history.replace('/logout');
      }
    }
    // eslint-disable-next-line
  }, [jwtAuth, history]);
  return <>{children}</>;
};

export default WrappedAuth;

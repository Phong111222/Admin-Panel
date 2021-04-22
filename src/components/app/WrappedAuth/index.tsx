import useAuth from '../../../Hook/useAuth';

import { FC, ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
interface Props {
  children: ReactNode;
}

const WrappedAuth: FC<Props> = ({ children }) => {
  const jwtAuth = useAuth();
  //   const history = useHistory();
  //       useEffect(() => {
  //           if (!jwtAuth||jwt.verify(jwtAuth)) {
  //          history.push('/logout')
  //      }
  //   },[])
  return <>{children}</>;
};

export default WrappedAuth;

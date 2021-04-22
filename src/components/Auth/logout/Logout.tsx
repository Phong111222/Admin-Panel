import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../../store/Auth/actions';
import { ResetUser } from '../../../store/user/actions';

const LogOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(ResetUser());
    dispatch(logout());
    window.localStorage.removeItem('token');
    history.push('/login');
    // eslint-disable-next-line
  }, []);

  return null;
};

export default LogOut;

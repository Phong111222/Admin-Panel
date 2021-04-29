import { FC } from 'react';
import WrappedAuth from '../WrappedAuth';
import WrappedLayout from '../WrappedLayout';

const Home: FC = () => {
  return (
    <WrappedAuth>
      <div>Home</div>
    </WrappedAuth>
  );
};

export default Home;

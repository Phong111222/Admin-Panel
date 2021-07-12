import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        right: 0,
      }}>
      <LoadingOutlined style={{ fontSize: 100 }} />
    </div>
  );
};

export default Loading;

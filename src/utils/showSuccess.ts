import { notification } from 'antd';

const ShowSuccess = (successMsg: string) => {
  notification.success({
    message: 'SUCCESS',
    duration: 3,
    description: successMsg,
    onClose: () => notification.destroy(),
  });
};

export default ShowSuccess;

import { FormInstance, notification } from 'antd';

const ShowError = (
  error: any,
  fieldNames: string[],
  form: FormInstance,
  cb: Function
) => {
  const { message } = error.response.data;
  const index = fieldNames.findIndex((ele) => ele === Object.keys(message)[0]);
  form.scrollToField(fieldNames[index]);
  form.setFields([
    {
      name: fieldNames[index],
      errors: [message[fieldNames[index]]],
    },
  ]);
  notification.error({
    message: 'ERROR',
    duration: 3,
    description: message[fieldNames[index]] || 'ERROR',
    onClose: () => notification.destroy(),
  });
  cb();
};

export default ShowError;

import { Typography } from 'antd';

import { FC, ReactNode } from 'react';
const { Title, Text } = Typography;
const Label: FC<{ children: ReactNode }> = ({ children }) => (
  <Title level={5}>
    <Text>{children}</Text>
  </Title>
);
export default Label;

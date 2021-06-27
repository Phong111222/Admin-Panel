import { Typography } from 'antd';

import { CSSProperties, FC, ReactNode } from 'react';
const { Title, Text } = Typography;
const Label: FC<{ children: ReactNode; style?: CSSProperties }> = ({
  children,
  style,
}) => (
  <Title style={style} level={5}>
    <Text>{children}</Text>
  </Title>
);
export default Label;

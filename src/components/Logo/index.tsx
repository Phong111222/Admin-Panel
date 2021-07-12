import React from "react";

interface Props {
  height?: string | number;
  width?: string | number;
  src?: string;
}
const Logo: React.FC<Props> = ({ height = 100, width = 100, src }) => {
  return (
    <>
      <img src={src ? src : "/logo.png"} style={{ height, width }} alt="logo" />
    </>
  );
};

export default Logo;

import { Icon } from 'antd';
import React from 'react';

export default function IconCircle(props) {
  const {
    size = 50,
    style,
    type,
    color = 'brightindigo',
    theme = 'outlined',
    ...moreProps
  } = props;
  return (
    <div
      style={{
        fontSize: 30,
        height: size,
        width: size,
        borderRadius: '50%',
        ...style,
      }}
      className={`bg-${color} text-dark center-contents`}
      {...moreProps}
    >
      <Icon type={type} theme={theme} />
    </div>
  );
}

import React from 'react';

import * as Ant from 'antd';

export default function Modal(props) {
  return (
    <Ant.Modal
      title={false}
      footer={false}
      closable={false}
      bodyStyle={{
        padding: 0,
        backgroundImage: `url('/static/graphics/indigo-blob.svg'), url('/static/graphics/pink-blob.svg')`,
        backgroundSize: '100%, 100%',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: '-150px -220px, 70px -220px',
        borderRadius: 4,
      }}
      destroyOnClose
      {...props}
    />
  );
}

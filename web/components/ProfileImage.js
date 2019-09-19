import React from 'react';

export default function ProfileImage(props) {
  const {
    size = 50,
    style,
    url,
    color, // If not null, then add a tint
    ...moreProps
  } = props;
  return (
    <div
      style={{
        height: size,
        width: size,
        borderRadius: '50%',
        overflow: 'hidden',
        ...(color && { backgroundColor: color }),
        ...style,
      }}
      {...moreProps}
    >
      <img src={url} style={{ objectFit: 'cover', opacity: color ? 0.7 : 1 }} />
    </div>
  );
}

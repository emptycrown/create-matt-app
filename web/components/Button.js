import React, { useState } from 'react';

import * as R from 'ramda';
import { Icon } from 'antd';
import Color from 'color';
import styled from 'styled-components';

const _Button = ({
  type = 'button',
  loading = false,
  disabled,
  icon,
  iconTheme,
  onClick,
  children,
  ...rest
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  loading = loading || internalLoading;

  // Only display a spinner if the button is loading, override all passed in
  // props
  if (loading) {
    icon = 'loading';
    children = null;
    disabled = true;
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={async e => {
        if (!loading && onClick) {
          try {
            setInternalLoading(true);
            await onClick(e);
          } finally {
            setInternalLoading(false);
          }
        }
      }}
      {...rest}
    >
      {icon && (
        <Icon
          type={icon}
          theme={iconTheme}
          style={children ? { marginRight: 8 } : { transform: 'scale(1.5)' }}
        />
      )}
      {children}
    </button>
  );
};

const Button = styled(
  ({
    backgroundColor,
    activeBackgroundColor,
    hoverColor,
    hoverBackgroundColor,
    borderColor,
    colorScheme,
    large,
    ...rest
  }) => <_Button {...rest} />
).attrs(
  ({
    backgroundColor = '#E2E8F0',
    hoverBackgroundColor = '#5A2EFF',
    colorScheme,
    large,
    ...rest
  }) => {
    const className = `w-full p-4 ${
      large ? 'text-lg' : 'py-2'
    } text-center border rounded overflow-hidden focus:outline-none`;

    let palette = R.map(c => Color(c), {
      color: '#2D3748',
      borderColor: 'transparent',
      hoverColor: 'white',
      backgroundColor,
      hoverBackgroundColor,
    });

    if (colorScheme) {
      const scheme = Color(colorScheme);
      palette = {
        color: scheme,
        backgroundColor: scheme.fade(0.8),
        borderColor: scheme.fade(0.7),
        hoverBackgroundColor: scheme.fade(0.6),
      };
    }

    palette.activeBackgroundColor = palette.hoverBackgroundColor.darken(0.15);

    return { className, ...R.map(c => c.hsl().string(), palette) };
  }
)`
  font-family: 'montbold', 'Arial';
  transition: all 0.4s, color 0.3s;
  color: ${R.prop('color')};
  background: ${R.prop('backgroundColor')};
  border-color: ${R.prop('borderColor')};
  :hover {
    color: ${R.prop('hoverColor')};
    background: ${R.prop('hoverBackgroundColor')};
  }
  :disabled {
    cursor: not-allowed;
  }
  :active {
    background-color: ${R.prop('activeBackgroundColor')};
  }
`;

const GoogleAuth = ({ primary = true, ...rest }) => (
  <Button
    large
    colorScheme={primary ? 'hsl(5, 69%, 54%)' : 'white'}
    icon="google"
    className="mt-6"
    {...rest}
  />
);

const FacebookAuth = ({ primary = true, ...rest }) => (
  <Button
    large
    colorScheme={primary ? 'hsl(221, 44%, 41%)' : 'white'}
    icon="facebook"
    iconTheme="filled"
    className="mt-6"
    {...rest}
  />
);

Button.GoogleAuth = GoogleAuth;
Button.FacebookAuth = FacebookAuth;
export default Button;

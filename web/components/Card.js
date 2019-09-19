import Color from 'color';
import styled from 'styled-components';

const Standard = styled.div.attrs(props => ({
  className: 'w-full p-4 overflow-hidden relative rounded-lg',
}))`
  box-shadow: 0 20px 30px hsl(0, 0%, 10%, 0.15);
`;

const Transparent = styled(Standard).attrs(props => {
  if (props.color) {
    const scheme = Color(props.color);
    return {
      color: scheme.hsl().string(),
      backgroundColor: scheme
        .fade(0.8)
        .hsl()
        .string(),
      borderColor: scheme
        .fade(0.7)
        .hsl()
        .string(),
    };
  }
})`
  box-shadow: none;
  border: ${props =>
    props.borderColor ? `solid 1px ${props.borderColor}` : 'none'};
  color: ${props => props.color || '#2D3748'};
  background: ${props => props.backgroundColor || '#E2E8F0'};
`;

const Solid = styled(Standard).attrs(props => {
  if (props.color) {
    const scheme = Color(props.color);
    return {
      color: scheme
        .darken(0.3)
        .hsl()
        .string(),
      backgroundColor: scheme
        .lighten(0.3)
        .hsl()
        .string(),
    };
  }
})`
  box-shadow: none;
  color: ${props => props.color || '#2D3748'};
  background: ${props => props.backgroundColor || '#E2E8F0'};
`;

export default {
  Standard,
  Transparent,
  Solid,
};

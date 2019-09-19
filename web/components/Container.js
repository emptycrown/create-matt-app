// TODO @melissa: I copy pasted this to a new file since I needed to use it
// twice -- no idea what to do with it

import styled from 'styled-components';

const Container = styled.div.attrs(props => ({
  className: `relative w-full overflow-hidden text-white opacity-100 rounded ${props.className}`,
}))``;

export default Container;

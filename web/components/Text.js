import Color from 'color';
import styled from 'styled-components';

// LEVEL 1 HEADINGS: Use **only 1** per page
const Title = styled.h1.attrs(props => ({
  className: 'text-xl uppercase tracking-widest',
}))`
  font-family: 'rubik', 'Arial';
  letter-spacing: 3.5px;
`;

// Smaller version of title for **non-structural** use.
// Note the <p> tag, and not <h{x}>
const Subtitle = styled.div.attrs(props => ({
  className: 'text-base uppercase tracking-widest',
}))`
  font-family: 'rubik', 'Arial';
  letter-spacing: 3px;
`;

// Use only for brandname.
// Note the <p> tag, and not <h{x}>
const Brand = styled(Title).attrs(props => ({
  as: 'p',
}))`
  font-family: 'montbold';
`;

// LEVEL 2 HEADINGS: For sections in pages
const Heading = styled.h2.attrs(props => ({
  className: 'text-3xl',
}))`
  font-family: 'montbold';
`;

// LEVEL 3 HEADINGS: For subsections
const SubHeading = styled.h3.attrs(props => ({
  className: 'text-2xl',
}))`
  font-family: 'proxima-nova';
`;

// LEVEL 4 HEADINGS: For captioning chunks of text
const Caption = styled.p.attrs(props => ({
  className: 'uppercase text-sm',
}))`
  font-family: 'montbold';
`;

// Links with on hover + active properties
const Link = styled.a.attrs(props => ({
  linkColor: props.color || props.theme.colors.bluegray,
  className: 'no-underline',
}))`
  color: ${props => props.linkColor};
  :hover {
    color: ${props =>
      Color(props.linkColor)
        .lighten(0.2)
        .hsl()
        .string()};
  }
  :active {
    color: ${props => props.linkColor};
  }
  transition: 0.2s;
`;

export default {
  Title,
  Subtitle,
  Brand,
  Heading,
  SubHeading,
  Caption,
  Link,
};

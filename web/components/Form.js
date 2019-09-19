import React from 'react';

import { Button } from '~/components';
import Color from 'color';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

// Info
// ==========================================================================

export const Label = styled.label.attrs(props => ({
  className: 'block uppercase text-sm font-bold mb-2',
}))`
  font-family: 'montbold';
`;

export const Error = styled(Label)`
  color: ${props => props.theme.colors.warning};
`;

// Input
// ==========================================================================

const Input = styled.input.attrs(props => ({
  className: `appearance-none block w-full p-4 ${
    props.large ? 'text-lg' : 'py-2'
  } border rounded mb-3 focus:outline-none`,
  color: Color(props.color || props.theme.colors.bluegray),
}))`
  transition: all 0.4s, color 0.3s;
  color: ${props => props.color};
  background: ${props =>
    props.color
      .fade(0.8)
      .hsl()
      .string()};
  border-color: ${props =>
    props.color
      .fade(0.7)
      .hsl()
      .string()};
  :focus {
    background: ${props =>
      props.color
        .fade(0.6)
        .hsl()
        .string()};
    border-color: ${props =>
      props.color
        .fade(0.5)
        .hsl()
        .string()};
  }
`;

const Money = styled(NumberFormat).attrs(props => ({
  prefix: '$ ',
  thousandSeparator: true,
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: false,
  customInput: Input,
  color: Color(props.color || props.theme.colors.bluegray),
}))``;

Input.Money = Money;
export { Input };

// Misc.
// ==========================================================================

const MultipleChoiceAnswer = styled(props => <Button large {...props} />)``;

function MultipleChoice({
  choices,
  renderChoice = props => <MultipleChoiceAnswer {...props} />,
  onClickChoice = () => {},
  horizontal,
  value,
}) {
  return choices.map(choice =>
    renderChoice({
      key: choice,
      onClick: () => onClickChoice(choice),
      children: choice,
      ...(horizontal && { className: 'inline-block' }),
    })
  );
}
MultipleChoice.Answer = MultipleChoiceAnswer;
export { MultipleChoice };

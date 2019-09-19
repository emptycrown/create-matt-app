// Docs:
// https://github.com/stripe/react-stripe-elements
// https://stripe.com/docs/recipes/elements-react
// Sample:
// https://stripe.dev/react-stripe-elements/
import React, { useEffect, useRef, useState } from 'react';

import { CardElement, Elements, injectStripe } from 'react-stripe-elements';
import { Dropdown, Icon, Menu } from 'antd';
import { ME_CARDS } from './stripeGql';
import { STRIPE_CARD_BRAND_TO_SVG } from '~/lib/payments';
import { Text } from '~/components';
import { StripeProvider as _StripeProvider } from 'react-stripe-elements';
import { colors } from '~/styles/theme';
import { createContextProviderAndConsumerHook } from '~/lib/context';
import { useQuery } from '@apollo/react-hooks';
import Color from 'color';

// Provider component to be used at top-level of App
export function StripeProvider({ children }) {
  const [stripe, setStripe] = useState(null);
  useEffect(() => {
    setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY));
  }, []);
  return <_StripeProvider stripe={stripe}>{children}</_StripeProvider>;
}

function useStripePaymentProviderValue() {
  const submitToken = useRef(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Given a Stripe payment method + a corresponding payload, construct a
  // paymentInfo object to send to server
  const submitPayment = async () => {
    let payload;
    if (!selectedCardId) {
      // Make sure submitToken.current has been initialized, i.e. by _CardForm
      const tokenId = await submitToken.current();
      payload = { stripeMethod: 'NEW_CARD', tokenId };
    } else {
      payload = { stripeMethod: 'EXISTING_CARD', cardId: selectedCardId };
    }
    return { method: 'STRIPE', payload };
  };

  return {
    ready: true,
    value: [
      { submitPayment, selectedCardId },
      { setSubmitToken: f => (submitToken.current = f), setSelectedCardId },
    ],
  };
}

const [
  StripePaymentProvider,
  useStripePaymentContext,
] = createContextProviderAndConsumerHook(
  useStripePaymentProviderValue,
  'StripePayment'
);
export { StripePaymentProvider, useStripePaymentContext };

const cardElementsStyle = {
  base: {
    fontSize: '18px',
    fontFamily: 'Source Code Pro, monospace',
    color: Color(colors.dark).hex(),
    '::placeholder': {
      color: Color(colors.bluegray).hex(),
    },
  },
  invalid: {
    color: Color('red').hex(),
  },
};

function isClientError(error) {
  return error.type === 'validation_error';
}

function _CardForm({ stripe }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [_, { setSubmitToken }] = useStripePaymentContext();

  const onChange = ({ error }) => {
    if (error && isClientError(error)) setErrorMessage(error.message);
    else setErrorMessage('');
  };

  const submitToken = async () => {
    const { token, error } = await stripe.createToken();
    if (error && isClientError(error)) {
      setErrorMessage(error.message);
      return null;
    } else {
      return token.id;
    }
  };

  // When initialized, expose `submitToken` to context provider
  useEffect(() => {
    if (stripe) setSubmitToken(submitToken);
  }, [stripe]);

  return (
    <div>
      <CardElement onChange={onChange} style={cardElementsStyle} />
      {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
    </div>
  );
}

const CardForm = injectStripe(_CardForm);
export function StripeEnterCard(props) {
  return (
    <div {...props}>
      <Elements>
        <CardForm />
      </Elements>
    </div>
  );
}

export function StripeSelectCard({ cards, ...rest }) {
  const [_, { setSelectedCardId }] = useStripePaymentContext();

  const cardOptions = (
    <Menu
      onClick={({ key }) => {
        setSelectedCardId(key === 'NEW_CARD' ? null : key);
      }}
    >
      {cards.map(card => (
        <Menu.Item key={card.id}>
          <CreditCard card={card} />
        </Menu.Item>
      ))}
      <Menu.Item key={'NEW_CARD'}>Use a new card</Menu.Item>
    </Menu>
  );

  return (
    <div {...rest}>
      <Dropdown overlay={cardOptions}>
        <Text.Link className="bg-gray-100 rounded p-2">
          Change payment method <Icon type="down" />
        </Text.Link>
      </Dropdown>
    </div>
  );
}

function CreditCard({ card }) {
  const { brand, expires, last4 } = card;
  return (
    <span className="overflow-x-auto" style={cardElementsStyle.base}>
      <img
        className="h-6 mr-2"
        style={{ display: 'inline-block' }}
        src={STRIPE_CARD_BRAND_TO_SVG[brand]}
      />
      ••••
      {last4} {expires}
    </span>
  );
}

export function StripeEnterOrSelectCard() {
  // If selectedCardId exists, will display the selected card. If null or
  // undefined, shows new-card flow
  const [{ selectedCardId }, { setSelectedCardId }] = useStripePaymentContext();
  const { data } = useQuery(ME_CARDS, { fetchPolicy: 'network-only' });
  const savedCards = data?.me?.stripeCards || [];
  const selectedCard = savedCards.find(({ id }) => id === selectedCardId);

  useEffect(() => {
    setSelectedCardId(savedCards?.[0]?.id);
  }, [data]);

  return (
    <div className="mb-6">
      {selectedCard ? <CreditCard card={selectedCard} /> : <StripeEnterCard />}
      {savedCards?.length > 0 && (
        <StripeSelectCard cards={savedCards} className="mt-4" />
      )}
    </div>
  );
}

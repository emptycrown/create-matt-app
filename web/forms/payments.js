import React from 'react';

import { Button } from '~/components';
import { useStripePaymentContext } from '~/integrations/stripe';

// Button that generates stripe payment payload info from fields in new-card
// input or selected existing-card. Then sets fieldValue in form.
export function StripeSubmitButton({ children = 'Submit' }) {
  const [{ submitPayment }] = useStripePaymentContext();

  return (
    <Button
      onClick={async () => {
        const payload = await submitPayment();
        // TODO: submit
        console.log('payload', payload);
      }}
    >
      {children}
    </Button>
  );
}

import { UserError } from '~/graphql/errors';
import _stripe from 'stripe';
const stripe = _stripe(process.env.STRIPE_SECRET_KEY);

const wrapWithUserError = (context, func) => async (...args) => {
  try {
    return await context[func].call(context, ...args);
  } catch (err) {
    if (err.rawType === 'card_error') throw new UserError(err.message);
    throw err;
  }
};

stripe.charges.createWithWrapper = wrapWithUserError(stripe.charges, 'create');
stripe.customers.createSourceWithWrapper = wrapWithUserError(
  stripe.customers,
  'createSource'
);

export default stripe;

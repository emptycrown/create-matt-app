import moment from 'moment';
import stripe from '~/integrations/stripe';

export const resolvers = {
  StripeCard: {
    // moment's months are 0-indexed... o-o
    expires: ({ exp_month, exp_year }) =>
      moment([exp_year, exp_month - 1]).format('MM/YYYY'),
  },

  User: {
    // https://stripe.com/docs/api/cards/list
    stripeCards: async ({ stripeCustomerId }) => {
      const { data } = await stripe.customers.listSources(stripeCustomerId);
      return data;
    },
  },
};

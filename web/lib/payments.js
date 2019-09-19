// http://muffinresear.ch/payment-icons/
import amex from 'payment-icons/min/flat/amex.svg';
import diners from 'payment-icons/min/flat/diners.svg';
import discover from 'payment-icons/min/flat/discover.svg';
import jcb from 'payment-icons/min/flat/jcb.svg';
import mastercard from 'payment-icons/min/flat/mastercard.svg';
import unionpay from 'payment-icons/min/flat/unionpay.svg';
import visa from 'payment-icons/min/flat/visa.svg';

export const STRIPE_CARD_BRAND_TO_SVG = {
  'American Express': amex,
  'Diners Club': diners,
  Discover: discover,
  JCB: jcb,
  MasterCard: mastercard,
  UnionPay: unionpay,
  Visa: visa,
};

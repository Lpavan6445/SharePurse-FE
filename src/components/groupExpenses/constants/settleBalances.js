
export const SETTLE_UP_PERSONS_VIEW = "SETTLE_UP_PERSONS_VIEW";
export const CONFIR_SETTLE_FORM = "CONFIR_SETTLE_FORM";

export const PAYMENT_METHOD = 'payments';
export const SETTLE_BALANCES = {
  [PAYMENT_METHOD]: {
      name: PAYMENT_METHOD,
      labelText: 'Payment method *',
      placeholder: 'Select method',
      autocomplete: 'payment_mathod',
      validations: {
          required: {
            message: 'Required',
            value: true,
          },
      }
  },
}

export const PAYMENT_METHODS = [
  {
    id: 'CASH',
    title: 'Cash',
  },
  {
    id: 'ONLINE',
    title: 'Online',
  }
]
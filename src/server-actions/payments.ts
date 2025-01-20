const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const getStripePaymentIntent = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: 'CREAVIN-CLINIC APPOINTMENT',
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(paymentIntent)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

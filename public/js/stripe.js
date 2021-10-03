import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51JgE9GDQTIcfXAX8coQ4jTeZTLwTL3Uit3ppeuWfcNNccxFdltFy8CZXVgCy7JfXnjjBKcYvS2XcXjRglkwoOAnv00DSOkgiVV'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get Checkout Session from API
    const session = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });
    // 2) Create a checkout form + credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', err);
  }
};

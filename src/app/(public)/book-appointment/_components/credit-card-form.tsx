import React, { useState } from 'react';
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, message, Modal } from 'antd';

interface CreditCardFormProps {
  showCreditCardForm: boolean;
  setShowCreditCardForm: (value: boolean) => void;
  onPaymentSuccess: (paymentId: string) => void;
}
function CreditCardForm({
  showCreditCardForm,
  setShowCreditCardForm,
  onPaymentSuccess,
}: CreditCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        },
        redirect: 'if_required',
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success('Payment successful');
        onPaymentSuccess(result.paymentIntent.id);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      open={showCreditCardForm}
      title="Enter your bank"
      onCancel={() => setShowCreditCardForm(false)}
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ allowedCountries: ['US'], mode: 'billing' }}
        />
        <div className="flex justify-end gap-5 mt-5">
          <Button
            disabled={isLoading}
            onClick={() => setShowCreditCardForm(false)}
          >
            Cancel
          </Button>
          <Button type="primary" loading={isLoading} htmlType="submit">
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreditCardForm;

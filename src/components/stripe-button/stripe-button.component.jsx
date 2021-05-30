import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51IwfKgSBZjykRoG5XpQgyy1FcujmIqwjKGGnz0VFEjyoEdb3cNG0XXYXEGSsFtRSnypzaPbbXh6w00rWEkMKhsPn00PCyw78fU';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return(
        <StripeCheckout 
          label= 'Pay Now'
          name = 'CRWN Clothing Ltd.'
          billingAddress
          shippingAddress
          image='https://sendeyo.com/en/f3eb2117da'
          description={`your total is $${price}`}
          amount= {priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishablekey}

        />
    );
};

export default StripeCheckoutButton; 
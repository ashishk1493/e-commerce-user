import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onGotoStep, onBackStep, onNextStep, applyShipping } from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider } from '../../../../components/hook-form';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import { orderGenerate, verifyPayment } from 'services/products.service';
import { useEffect } from 'react';

// ----------------------------------------------------------------------
var keyId = 'rzp_test_EkIEkhaxbaftUk';
var keySecret = 'Y1KHS0epX20bL2O39Wd46CrG';
const DELIVERY_OPTIONS = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 100,
    title: 'Fast delivery (₹100,00)',
    description: 'Delivered on Monday, August 5',
  },
];

const PAYMENT_OPTIONS = [
  {
    value: 'razorpay',
    title: 'Net Banking',
    description: 'We support Mastercard, Visa Card, Discover and Razorpay.',
    icons: [],
    // icons: ['/home/razorpay.webp'],
    // icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  // {
  //   value: 'credit_card',
  //   title: 'Credit / Debit Card',
  //   description: 'We support Mastercard, Visa, Discover and Stripe.',
  //   icons: [
  //     'https://minimal-assets-api.vercel.app/assets/icons/ic_mastercard.svg',
  //     'https://minimal-assets-api.vercel.app/assets/icons/ic_visa.svg',
  //   ],
  // },
  {
    value: 'cash',
    title: 'Cash on CheckoutDelivery',
    description: 'Pay with cash when your order is delivered.',
    icons: [],
  },
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

export default function CheckoutPayment() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { total, discount, subtotal, shipping, billing } = checkout;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    console.log('call thay use effect');
  }, []);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  });

  const defaultValues = {
    delivery: shipping,
    payment: '',
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  console.log(total, subtotal, discount, shipping, 'infoalfefe#-');

  const handlePaymentStatus = async (res) => {
    let verifBody = {
      address_id: billing?.id,
      payment_method: 'NET_BANKING',
      shipping_cost: Number(shipping),
      discount: Number(discount),
      razorpay_order_id: res.razorpay_order_id,
      razorpay_payment_id: res.razorpay_payment_id,
      razorpay_signature: res.razorpay_signature,
    };
    let verifyPaymentRes = await verifyPayment(verifBody);
    if (verifyPaymentRes.data?.success == 'true') {
      handleNextStep();
    }
  };

  const onSubmit = async (data) => {
    console.log(data, 'data-');
    // try {
    //   // handleNextStep();
    //   let res = await orderGenerate({
    //     address_id: billing?.id,
    //     payment_method: 'NET_BANKING',
    //     shipping_cost: Number(shipping),
    //     discount: Number(discount),
    //   });
    //   console.log(res, 'res--');
    //   if (res.data.success == 'true') {
    //     const options = {
    //       key: keyId,
    //       amount: Number(100),
    //       currency: 'INR',
    //       name: 'PA',
    //       description: 'Place Order',
    //       // image: "/512x512.png",
    //       order_id: res.data.data.transaction_id,
    //       handler: function (result) {
    //         handlePaymentStatus(result);
    //         console.log('call thay gyu handler', result);
    //       },
    //       prefill: {
    //         contact: billing?.phone,
    //       },
    //       theme: {
    //         color: '#FF7878',
    //       },
    //       retry: { enabled: false },
    //     };
    //     const rzp = new window.Razorpay(options);
    //     rzp.open();
    //     rzp.on('payment.failed', function (result) {
    //       // router.push({
    //       //   pathname: /child/${ kidId } / subscription - fail,
    //       //   query: {
    //       //   kidId: kidId,
    //       // },
    //       // });
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CheckoutDelivery onApplyShipping={handleApplyShipping} deliveryOptions={DELIVERY_OPTIONS} />
          <CheckoutPaymentMethods cardOptions={CARDS_OPTIONS} paymentOptions={PAYMENT_OPTIONS} />
          <Button
            size="small"
            color="inherit"
            onClick={handleBackStep}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutBillingInfo onBackStep={handleBackStep} />

          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => handleGotoStep(0)}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Complete Order
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

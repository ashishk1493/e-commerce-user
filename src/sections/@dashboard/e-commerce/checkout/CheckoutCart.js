import sum from 'lodash/sum';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  getCartProducts,
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import { useEffect } from 'react';
import { addProductToCart } from 'services/products.service';
import { ToastContainer } from 'react-toastify';
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart?.map((item) => item.quantity));

  const isEmptyCart = cart?.length === 0;

  // getCartProducts
  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = async (product_id) => {
    // dispatch(increaseQuantity(productId));
    const response = await addProductToCart(product_id, 1);
    if (response.data.success == 'true') {
      console.log(response.data.message, 'response true');
      PAnotifySuccess(response.data.message);
      dispatch(getCartProducts());
    } else {
      PAnotifyError(response.data.message);
      console.log(response.data.message, 'response false');
    }
  };

  const handleDecreaseQuantity = async (product_id) => {
    // dispatch(increaseQuantity(productId));
    const response = await addProductToCart(product_id, -1);
    if (response.data.success == 'true') {
      console.log(response.data.message, 'response true');
      PAnotifySuccess(response.data.message);
      dispatch(getCartProducts());
    } else {
      PAnotifyError(response.data.message);
      console.log(response.data.message, 'response false');
    }
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Card
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={cart}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <NextLink href={PATH_DASHBOARD.eCommerce.root} passHref>
          <Button color="inherit" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
            Continue Shopping
          </Button>
        </NextLink>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart?.length === 0}
          onClick={handleNextStep}
        >
          Check Out
        </Button>
      </Grid>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </Grid>
  );
}

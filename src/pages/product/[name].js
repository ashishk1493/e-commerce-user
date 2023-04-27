import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getProduct,
  addCart,
  onGotoStep,
  addTocart,
  getCartProducts,
  getProducts,
  getProductsBycat,
} from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { getFirstCharacter } from 'src/components/utlis';
import { addProductToCart } from 'services/products.service';
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first
import PAProductHomeSlider from 'src/sections/home/PAProductHomeSlider';
import { getAuth } from 'services/identity.service';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

EcommerceProductDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductDetails() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const auth = getAuth();

  const [value, setValue] = useState('1');
  const [cartQty, setCartQty] = useState(1);

  const { query, push } = useRouter();

  const { name } = query;

  const { productSimiler, products, product, error, checkout } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (product) {
      if (product.category_id) {
        dispatch(getProductsBycat(product.category_id, name));
      }
    }
  }, [product]);

  const handleAddCart = async (product_id) => {
    if (auth) {
      const response = await addProductToCart(product_id, cartQty);
      if (response?.data?.success == 'true') {
        PAnotifySuccess(response.data.message);
        dispatch(getCartProducts());
      } else {
        if (response?.data?.message) {
          PAnotifyError(response.data.message);
        }
        if (response?.message) {
          PAnotifyError(response.message);
        }
      }
    } else {
      let objCart = { product_id, cartQty };
      localStorage.setItem('objCart', JSON.stringify(objCart));
      push({
        pathname: '/auth/login',
        query: { isCartAction: true },
      });
    }
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(0));
  };

  return (
    <Page title="Ecommerce: Product Details">
      <Container maxWidth={themeStretch ? false : 'lg'} style={{ marginTop: '80px' }}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Shop',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { name: product ? getFirstCharacter(product.name) : '' },
          ]}
        />

        {auth && <CartWidget />}

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    product={product}
                    cart={checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                    cartQty={cartQty}
                    setCartQty={setCartQty}
                  />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      // label={`Review (${product.reviews.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ProductDetailsReview product={product} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}
        <div>
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 3, md: 3 },
              mt: { xs: 3, md: 3 },
            }}
          >
            <div>
              <Typography variant="h3">Related Products</Typography>
            </div>
          </Box>
          <PAProductHomeSlider products={productSimiler} />
        </div>
        {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </Page>
  );
}

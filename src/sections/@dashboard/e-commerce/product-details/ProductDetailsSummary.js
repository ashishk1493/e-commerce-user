import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Link, Stack, Button, Rating, Divider, IconButton, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../../components/hook-form';
import { getFirstCharacter } from 'src/components/utlis';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.shape({
    available: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    id: PropTypes.string,
    inventoryType: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    totalRating: PropTypes.number,
    totalReview: PropTypes.number,
  }),
};

export default function ProductDetailsSummary({ cart, product, onAddCart, onGotoStep, cartQty, setCartQty, ...other }) {
  const theme = useTheme();

  const { push } = useRouter();

  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    qty,
    priceSale,
    totalRating,
    totalReview,
    inventoryType,
    mrp,
  } = product;

  // const alreadyProduct = cart.map((item) => item.id).includes(id);

  // const isMaxQuantity = cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= qty;

  const defaultValues = {
    id,
    name,
    cover,
    qty,
    price,
    color: colors[0],
    size: sizes[4],
    quantity: qty < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    //   try {
    //     if (!alreadyProduct) {
    //       onAddCart({
    //         ...data,
    //         subtotal: data.price * data.quantity,
    //       });
    //     }
    //     onGotoStep(0);
    //     push(PATH_DASHBOARD.eCommerce.checkout);
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  const handleAddCart = async () => {
    try {
      onAddCart(product.id, cartQty, push);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(qty, 'inventoryType-');
  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={qty > 0 ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase' }}
        >
          {qty == 0 ? 'Out of Stock' : sentenceCase(inventoryType || '')}
        </Label>

        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block',
            color: status === 'sale' ? 'error.main' : 'info.main',
          }}
        >
          {status}
        </Typography>

        <Typography variant="h5" paragraph>
          {getFirstCharacter(name)}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={totalRating} precision={0.1} readOnly />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReview)}
            reviews)
          </Typography>
        </Stack>

        <Typography variant="h4" sx={{ mb: 3 }}>
          <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
            {mrp && fCurrency(mrp)}
          </Box>
          &nbsp;{fCurrency(price)}
        </Typography>
        {colors.length ? <Divider sx={{ borderStyle: 'dashed' }} /> : ''}

        {colors.length ? (
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Color
            </Typography>

            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <ColorSinglePicker
                  colors={colors}
                  value={field.value}
                  onChange={field.onChange}
                  sx={{
                    ...(colors.length > 4 && {
                      maxWidth: 144,
                      justifyContent: 'flex-end',
                    }),
                  }}
                />
              )}
            />
          </Stack>
        ) : (
          ''
        )}

        {sizes.length ? (
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Size
            </Typography>

            <RHFSelect
              name="size"
              size="small"
              fullWidth={false}
              FormHelperTextProps={{
                sx: { textAlign: 'right', margin: 0, mt: 1 },
              }}
              helperText={
                <Link underline="always" color="text.secondary">
                  Size Chart
                </Link>
              }
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </RHFSelect>
          </Stack>
        ) : (
          ''
        )}

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

          <div>
            <Incrementer
              name="quantity"
              quantity={cartQty}
              available={qty}
              onIncrementQuantity={() => setCartQty(cartQty + 1)}
              onDecrementQuantity={() => setCartQty(cartQty - 1)}
            />
            <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
              Available: {qty}
            </Typography>
          </div>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={qty == 0}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add to Cart
          </Button>

          <Button disabled={qty == 0} fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}

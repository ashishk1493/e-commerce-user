import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { commanCart } from 'src/utils/product-utils';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { push } = useRouter();

  console.log(product, "product---");
  const { name, price, colors, status, priceSale, images } = product;
  const [style, setStyle] = useState({ display: 'none' });

  // const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));
  const linkTo = `/product/${product.id}`

  const handleAddCart = async () => {
    try {
      commanCart(product.id, 1, push);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{ margin: "10px" }}
      onMouseEnter={e => {
        setStyle({ display: 'flex' });
      }}
      onMouseLeave={e => {
        setStyle({ display: 'none' })
      }}
    >
      <Box sx={{ position: 'relative', padding: '8px', borderRadius: "10px" }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <div style={{
          ...style,
          bottom: 16,
          right: 16,
          zIndex: 9,
          position: 'absolute',
          textTransform: 'uppercase',
          backgroundColor: 'rgb(255, 171, 0)',
          height: '48px',
          width: '48px',
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}
          onClick={() => handleAddCart()}
        >
          <AddShoppingCartIcon style={{ color: 'black' }} />
        </div>
        <Image alt={name} src={`http://localhost:8080${images[0]}`} ratio="1/1" style={{ borderRadius: "10px" }} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <NextLink href={linkTo} passHref>
          <Link color="inherit">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
        </NextLink>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {priceSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

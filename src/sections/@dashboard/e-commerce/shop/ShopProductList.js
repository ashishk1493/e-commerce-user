import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import ShopProductCard from './ShopProductCard';
import Typography from 'src/theme/overrides/Typography';
import EmptyContent from 'src/components/EmptyContent';

// ----------------------------------------------------------------------

ShopProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default function ShopProductList({ products, loading }) {
  console.log(products, 'products');
  return (
    <Box
      sx={{
        display: 'grid',
        mb: '40px',
        gap: 1,
        gridTemplateColumns:
          products.length == 0
            ? {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(1, 1fr)',
              }
            : {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
      }}
    >
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? <ShopProductCard key={product.id} product={product} /> : <SkeletonProductItem key={index} />
      )}
      {(loading ? [...Array(12)] : products).length == 0 && (
        <EmptyContent
          title="No Product found"
          description="Look like there is no any product that match with filters."
          img="/home/empty_cart.svg"
        />
      )}
    </Box>
  );
}

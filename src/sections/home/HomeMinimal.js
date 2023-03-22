import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import { ShopProductCard } from '../@dashboard/e-commerce/shop';
import { SkeletonProductItem } from 'src/components/skeleton';
import { APproduct } from 'src/_mock/ecomProduct';
import { getAllProducts } from '../../../services/products.service'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'src/redux/slices/product';
import APEcommerceWelcome from '../@dashboard/general/e-commerce/APEcommerceWelcome';
import PAProductHomeSlider from './PAProductHomeSlider';
// ----------------------------------------------------------------------
const products = [{
  "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
  "cover": "https://minimal-assets-api.vercel.app/assets/images/products/product_1.jpg",
  "images": [
    "https://minimal-assets-api.vercel.app/assets/images/products/product_1.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_2.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_3.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_4.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_5.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_6.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_7.jpg",
    "https://minimal-assets-api.vercel.app/assets/images/products/product_8.jpg"
  ],
  "name": "Nike Air Force 1 NDESTRUKT",
  "code": "38BEE270",
  "sku": "WW75K5210YW/SV",
  "tags": [
    "Dangal",
    "The Sting",
    "2001: A Space Odyssey",
    "Singin' in the Rain"
  ],
  "price": 16.19,
  "priceSale": 16.19,
  "totalRating": 2.5,
  "totalReview": 7652,
  "ratings": [
    {
      "name": "1 Star",
      "starCount": 5799,
      "reviewCount": 6109
    },
    {
      "name": "2 Star",
      "starCount": 1327,
      "reviewCount": 9205
    },
    {
      "name": "3 Star",
      "starCount": 6428,
      "reviewCount": 2151
    },
    {
      "name": "4 Star",
      "starCount": 7550,
      "reviewCount": 3766
    },
    {
      "name": "5 Star",
      "starCount": 897,
      "reviewCount": 8512
    }
  ],
  "reviews": [
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      "name": "Jayvion Simon",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg",
      "comment": "Assumenda nam repudiandae rerum fugiat vel maxime.",
      "rating": 2.5,
      "isPurchased": true,
      "helpful": 6048,
      "postedAt": "2023-03-10T16:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      "name": "Lucian Obrien",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg",
      "comment": "Quis veniam aut saepe aliquid nulla.",
      "rating": 2,
      "isPurchased": true,
      "helpful": 578,
      "postedAt": "2023-03-09T15:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
      "name": "Deja Brady",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg",
      "comment": "Reprehenderit ut voluptas sapiente ratione nostrum est.",
      "rating": 4.9,
      "isPurchased": true,
      "helpful": 8305,
      "postedAt": "2023-03-08T14:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      "name": "Harrison Stein",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg",
      "comment": "Error ut sit vel molestias velit.",
      "rating": 2,
      "isPurchased": false,
      "helpful": 2157,
      "postedAt": "2023-03-07T13:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
      "name": "Reece Chung",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg",
      "comment": "Quo quia sit nihil nemo doloremque et.",
      "rating": 4,
      "isPurchased": false,
      "helpful": 7046,
      "postedAt": "2023-03-06T12:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
      "name": "Lainey Davidson",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg",
      "comment": "Autem doloribus harum vero laborum.",
      "rating": 5,
      "isPurchased": true,
      "helpful": 8339,
      "postedAt": "2023-03-05T11:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
      "name": "Cristopher Cardenas",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg",
      "comment": "Tempora officiis consequuntur architecto nostrum autem nam adipisci.",
      "rating": 4.9,
      "isPurchased": false,
      "helpful": 107,
      "postedAt": "2023-03-04T10:28:24.028Z"
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
      "name": "Melanie Noble",
      "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg",
      "comment": "Voluptas sunt magni adipisci praesentium saepe.",
      "rating": 5,
      "isPurchased": false,
      "helpful": 4013,
      "postedAt": "2023-03-03T09:28:24.028Z"
    }
  ],
  "status": "sale",
  "inventoryType": "out_of_stock",
  "sizes": [
    "6",
    "7",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "13"
  ],
  "available": 96,
  "description": "\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n",
  "sold": 828,
  "createdAt": "2023-03-10T16:28:24.029Z",
  "category": "Shose",
  "gender": "Women",
  "colors": [
    "#00AB55",
    "#000000"
  ]
},]
const CARDS = [
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_design.svg',
    title: 'UI & UX Design',
    description:
      'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.',
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_code.svg',
    title: 'Development',
    description: 'Easy to customize and extend each component, saving you time and money.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Branding',
    description: 'Consistent design in colors, fonts ... makes brand recognition easy.',
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 5 },
          }}
        >
          <div variants={varFade().inDown}>
            <Typography variant="h3">BEST SELLERS</Typography>
          </div>
        </Box>

        <PAProductHomeSlider products={products} />
        {/* <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, lg: 3 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {products.map((product, index) =>
            product ? <ShopProductCard key={product.id} product={product} /> : <SkeletonProductItem key={index} />
          )}
        </Box> */}

        <APEcommerceWelcome />

        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 5 },
            my: { xs: 5, md: 5 },
          }}
        >
          <div variants={varFade().inDown}>
            <Typography variant="h3">NATIONAL CREATIVE DIRECTOR'S PICKS</Typography>
          </div>
        </Box>
        <PAProductHomeSlider products={products} />

        {/* <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {products.map((product, index) =>
            product ? <ShopProductCard key={product.id} product={product} /> : <SkeletonProductItem key={index} />
          )}
        </Box> */}
      </Container>
    </RootStyle>
  );
}

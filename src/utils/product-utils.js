import { getAuth } from 'services/identity.service';
import { addProductToCart } from 'services/products.service';
import { PAnotifyError, PAnotifySuccess } from './tostMessage';
import { dispatch } from 'src/redux/store';
import { getCartProducts } from 'src/redux/slices/product';
import { useRouter } from 'next/router';

export const commanCart = async (product_id, cartQty, push) => {
    const auth = getAuth();

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
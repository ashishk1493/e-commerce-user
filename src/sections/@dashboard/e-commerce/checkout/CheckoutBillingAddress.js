import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onBackStep, onNextStep, createBilling } from '../../../../redux/slices/product';
// _mock_
import { _addressBooks } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import { getAllAddressSlice } from 'src/redux/slices/address';
import { deleteAddressById } from 'services/address.service';
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first
import styled from '@emotion/styled';
// ----------------------------------------------------------------------

const NewAddressBtn = styled(Button)({
  backgroundColor: '#0080003d',
  padding: '0 10px',
  '&:hover': {
    backgroundColor: '#00800094',
  },
});

export default function CheckoutBillingAddress() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { total, discount, subtotal } = checkout;

  const [open, setOpen] = useState(false);
  const [lstSorted, setLstSorted] = useState([]);
  const { userBillAddressList } = useSelector((state) => state.address);

  const getAddressesInLocal = () => {
    return dispatch(getAllAddressSlice());
  };
  useEffect(() => {
    getAddressesInLocal();
  }, [dispatch]);

  useEffect(() => {
    if (userBillAddressList.length) {
      let lstTmp = userBillAddressList.slice().sort((a, b) => Number(b.is_default) - Number(a.is_default));
      setLstSorted(lstTmp);
    }
  }, [userBillAddressList]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  const deleteAddress = async (addressId) => {
    // dispatch(increaseQuantity(productId));
    const response = await deleteAddressById(addressId);
    if (response.data.success == 'true') {
      console.log(response.data.message, 'response true');
      PAnotifySuccess(response.data.message);
      getAddressesInLocal();
    } else {
      PAnotifyError(response.data.message);
      console.log(response.data.message, 'response false');
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* const trueFirst = arr.sort((a, b) => Number(b.bool) - Number(a.bool)); */}

          {lstSorted.length &&
            lstSorted.map((address, index) => (
              <AddressItem
                key={index}
                address={address}
                onNextStep={handleNextStep}
                onCreateBilling={handleCreateBilling}
                deleteAddress={deleteAddress}
              />
            ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
            >
              Back
            </Button>
            <NewAddressBtn size="small" onClick={handleClickOpen} startIcon={<Iconify icon={'eva:plus-fill'} />}>
              Add new address
            </NewAddressBtn>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onCreateBilling={handleCreateBilling}
        PAnotifySuccess={PAnotifySuccess}
        PAnotifyError={PAnotifyError}
        getAddressesInLocal={getAddressesInLocal}
      />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </>
  );
}

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  address: PropTypes.object,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

function AddressItem({ address, onNextStep, onCreateBilling, deleteAddress }) {
  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{address.full_name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({address.place})
        </Typography>
        {address.is_default && (
          <Label color="info" sx={{ ml: 1 }}>
            Default
          </Label>
        )}
      </Box>
      <Typography variant="body2" gutterBottom>
        {address.address}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {address.phone}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 },
        }}
      >
        {!address.is_default && (
          <Button variant="outlined" size="small" color="inherit" onClick={() => deleteAddress(address.id)}>
            Delete
          </Button>
        )}
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={handleCreateBilling}>
          Deliver to this Address
        </Button>
      </Box>
    </Card>
  );
}

import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// _mock
import { countries } from '../../../../_mock';
import { FormProvider, RHFCheckbox, RHFSelect, RHFTextField, RHFRadioGroup } from '../../../../components/hook-form';
import { addNewAddress } from 'services/address.service';
// import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first
import { getAllAddressSlice } from 'src/redux/slices/address';

// ----------------------------------------------------------------------

CheckoutNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutNewAddressForm({ open, onClose, onNextStep, onCreateBilling, PAnotifySuccess, PAnotifyError, getAddressesInLocal }) {
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });

  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: countries[0].label,
    zipcode: '',
    isDefault: true,
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      let response = await addNewAddress({
        full_name: data.receiver,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        pin_code: data.zipcode,
        country: data.country,
        place: data.addressType,
        is_default: data.isDefault
      })
      console.log(response.data, "response.data");
      if (response.data.success == "true") {
        console.log(response.data.message, "response true");
        onClose()
        getAddressesInLocal()
        PAnotifySuccess(response.data.message)
        reset({});
      } else {
        PAnotifyError(response.data.message)
        console.log(response.data.message, "response false");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCloseLocal = () => {
    reset({});
    onClose()
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Add new address</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <RHFRadioGroup name="addressType" options={['Home', 'Office']} />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="receiver" label="Full Name" />
              <RHFTextField name="phone" label="Phone Number" />
            </Box>

            <RHFTextField name="address" label="Address" />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="city" label="Town / City" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="zipcode" label="Zip / Postal Code" />
            </Box>

            <RHFSelect name="country" label="Country">
              {countries.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>

            <RHFCheckbox name="isDefault" label="Use this address as default." sx={{ mt: 3 }} />
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onCloseLocal}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
      {/* <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      /> */}
    </Dialog>
  );
}

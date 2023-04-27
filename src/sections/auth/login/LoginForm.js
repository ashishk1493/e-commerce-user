import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { login_user_slice } from 'src/redux/slices/userInfo';
import { dispatch, useSelector } from 'src/redux/store';
// next
import { useRouter } from 'next/router';
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const { login } = useAuth();
  const { pathname, push } = useRouter();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'laxit@l.com',
    password: '123456',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // const { objUserDetails } = useSelector(state => state.userInfo)
  const { objUserDetails } = useSelector((state) => state.userInfo);

  console.log(objUserDetails, "objUserDetails-");
  const onSubmit = async (data) => {
    try {
      let res = await dispatch(login_user_slice(data.email, data.password))
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  // useEffect(() => {
  //   console.log(props, "lalalal");
  // }, [props.router]);

  useEffect(() => {
    if (objUserDetails) {
      if (objUserDetails.success == "true") {
        redirectAfterLogin()
      } else if (objUserDetails.success == "false") {
        PAnotifyError(objUserDetails.message)
      }
    }
  }, [objUserDetails])

  const redirectAfterLogin = () => {
    let objCart = localStorage.getItem('objCart')
    console.log(objCart, "objCart");
    if (objCart) {
      push('/dashboard/e-commerce/checkout/')
    } else {
      push('/');
    }
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </FormProvider>
  );
}

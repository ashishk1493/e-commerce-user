// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first
import { useRouter } from 'next/router';
import { getAuth } from 'services/identity.service';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  const { objUserDetails } = useSelector((state) => state.userInfo);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (router.query?.isLoggedin) {
      if (auth) {
        PAnotifySuccess(objUserDetails.message);
      } else if (objUserDetails.success == 'false') {
        PAnotifyError(objUserDetails.message);
      }
    }
  }, [objUserDetails]);

  // useEffect(() => {
  //   if (objUserDetails) {
  //     if (objUserDetails.success == 'true') {
  //       PAnotifySuccess(objUserDetails.message);
  //     } else if (objUserDetails.success == 'false') {
  //       PAnotifyError(objUserDetails.message);
  //     }
  //   }
  // }, [objUserDetails]);

  return (
    <Page title="The starting point for your next project" style={{ marginTop: '80px' }}>
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomeMinimal />

          <HomeHugePackElements />

          {/* <HomeDarkMode />

          <HomeColorPresets />

          <HomeCleanInterfaces />

          <HomePricingPlans />

          <HomeLookingFor />

          <HomeAdvertisement /> */}
        </ContentStyle>
      </RootStyle>
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

import React from 'react';
import Nav from './Nav';
import HsectionOne from './HsectionOne';
import HsectionSecond from './HsectionSecond';
import HSectionThird from './HSectionThird';
import Hsection4 from './Hsection4';
import Hsection5 from './Hsection5';
import Hsction8 from './Hsction8';
import Hfotter from './Hfotter';
import { ToastContainer } from 'react-toastify';
import HomeTSlide from './HomeTSlide';
import HomeBSlide from './HomeBSlide';

const Home = () => {
  return (
    <>
      {/* Full width components */}
      <Nav />
      <ToastContainer />
      <HsectionOne />

      {/* Centered content block */}
      <main className="container my-5">
        <HsectionSecond />
        <HSectionThird />
        <HomeTSlide />
        <Hsection4 />
        <Hsection5 />
        <HomeBSlide />
        <Hsction8 />
      </main>

      {/* Full width footer */}
      <Hfotter />
    </>
  );
};

export default Home;
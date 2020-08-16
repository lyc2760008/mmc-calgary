import React, { Component } from "react";
import NavBar from "./components/NavBar";
import HeroSliderTwo from "./components/HeroSliderTwo";
import VideoCta from "./components/VideoCta";
import ProjectSliderTwo from "./components/ProjectSliderTwo";
import ServiceTab from "./components/ServiceTab";
import TestimonialSlider from "./components/TestimonialSlider";
//import BrandLogoSlider from "./components/BrandLogoSlider";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";

class HomeTwo extends Component {
  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* Hero slider */}
        <HeroSliderTwo />

        {/* Video CTA */}
        <VideoCta />

        {/* Service Tab */}
        <ServiceTab />

        {/* Project Slider */}
        <ProjectSliderTwo />

        {/* Testimonial Slider */}
        <TestimonialSlider />

        {/* Team job */}

        {/* Brand logo */}
        {/* <BrandLogoSlider background="grey-bg" /> */}

        {/* Blog grid */}

        {/* Footer */}
        <Footer />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    );
  }
}

export default HomeTwo;

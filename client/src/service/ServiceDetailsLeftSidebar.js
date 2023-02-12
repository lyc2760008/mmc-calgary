import React, {Component} from 'react';
import NavBar from '../components/NavBar';
import Sidebar from './components/Sidebar';
import ServiceGallery from './components/ServiceGallery';
//import BrandLogoSlider from '../components/BrandLogoSlider';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';
import CourseRegister from '../blog/CourseRegister'

class ServiceDetailsLeftSidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          selectedVideo: null,
        };
      }

      async componentDidMount() {
        try {
          const url = "/course/" + this.props.match.params.id;
            const response = await fetch(url);
            const jsonData=await response.json()
            this.setState( {data: jsonData} );
            console.log(jsonData);      
            }
            catch (error) {
              console.error(error);
            }
      }

    render(){
        let course = this.state.data[0];
        return(
            course !== undefined && 
            <div>
                {/* Navigation bar */}
                <NavBar/>

                {/* breadcrumb */}
                {/*====================  breadcrumb area ====================*/}
                <div className="breadcrumb-area breadcrumb-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="page-banner text-center">
                                    <h1>Course Details</h1>
                                    <ul className="page-breadcrumb">
                                        <li><a href="/">Home</a></li>
                                        <li>Service Details</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*====================  End of breadcrumb area  ====================*/}

                <div className="page-wrapper section-space--inner--120">
                    {/*Service section start*/}
                    <div className="service-section">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-12 order-1 order-lg-2">
                            <div className="service-details">
                                {/* service gallery */}
                                <ServiceGallery/>

                                <div className="content section-space--top--30">
                                    <div className="row">
                                        <div className="col-12">
                                        <h2>{course.courseName}</h2>
                                        <p>{course.courseDescriptions.courseDescription}</p>
                                        <p>{course.courseDescriptions.longDescription}</p>
                                        </div>
                                        <div className="col-lg-6 col-12 section-space--top--30">
                                        <h3>Learning Plan</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                        </div>
                                        <div className="col-lg-6 col-12 section-space--top--30">
                                        <h3>Learning Analysis</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                        </div>
                                        <div className="col-lg-6 col-12 section-space--top--30">
                                        <h3>Learning strategy</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                        </div>
                                        <div className="col-lg-6 col-12 section-space--top--30">
                                        <h3>Learning Outcomes</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, animi? Vel quas in minima qui totam, aliquid dolores quaerat voluptatum?</p>
                                        </div>
                                    </div>
                                    <div className="content section-space--top--30" style={{textAlign:"center"}}>
                                        <CourseRegister id={this.props.match.params.id}/>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-4 col-12 order-2 order-lg-1">
                                <Sidebar />
                            </div>
                        </div>
                        </div>
                    </div>
                    {/*Service section end*/}
                    </div>

                {/* Brand logo */}
                {/* <BrandLogoSlider background = "grey-bg" /> */}

                {/* Footer */}
                <Footer/>

                {/* Mobile Menu */}
                <MobileMenu/>

            </div>
        )
    }
}


export default ServiceDetailsLeftSidebar;
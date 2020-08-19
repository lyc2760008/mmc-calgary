import React, { Component } from "react";
import {Link} from "react-router-dom";
//import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import axios from "axios";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
//import {StripeProvider, Elements} from 'react-stripe-elements';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//import PaymentForm from './PaymentForm'
import CheckoutForm from './CheckoutForm'
//import CheckoutForm2 from './CheckoutForm2'


//import VideoList from "./VideoList";
//import VideoDetail from "./VideoDetail";

class BlogDetailsLeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: JSON.parse(localStorage.getItem("userid")),
      userRole: JSON.parse(localStorage.getItem("userRole")),
      selectedVideo: null,
      enrolled: "",
      buttonclass: "",
      payShow: false,
      amt: 0,
      courseName:"",
      courseId:"",
    };
  }

  handleClose = () => {
    //close Pay Modal  
      this.setState({payShow: false})
  }

  handleShow = () => {
    //show Pay Modal
      this.setState({payShow: true})
  }

  async componentDidMount() {

    try {
      const url = "/course/" + this.props.match.params.id;
        const response = await fetch(url);
        const jsonData=await response.json()
        this.setState( {amt: jsonData[0].price} );
        this.setState( {courseName: jsonData[0].courseName} );
        this.setState( {courseId:jsonData[0]._id} );
        console.log(jsonData);      
        }
        catch (error) {
          console.error(error);
        }

    const response = await axios
      .get("/course/" + this.props.match.params.id)
      .then(result => {
        console.log(
          "/checkenrollment?id=" +
            this.state.user +
            "&&courseid=" +
            this.props.match.params.id
        );
        axios
          .get(
            "/checkenrollment?id=" +
              this.state.user +
              "&&courseid=" +
              this.props.match.params.id
          )
          .then(result => {
            if (result.data) {
              this.setState({
                enrolled: "ALREADY ENROLLED",
                buttonclass: "btn btn-danger"
              });
            } else {
              this.setState({
                enrolled: `Register for ${this.state.courseName}`,
                buttonclass: "btn btn-success"
              });
            }
          });
        //console.log(result);
        return result;
      });

    this.setState({
      data: response.data,
    });
  }

  render() {
    const promise = loadStripe("pk_test_51HGSPHEKz6NW9w2TRPkTwVwpAZ3UMek59RpJbQpxB6kcy2yIEmwcPQcXH45gqTbWUh39IwH2HosGBy8d8q2OZesp00jM0L4Ylz")
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />
        {/* breadcrumb */}
        {/*====================  breadcrumb area ====================*/}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>Course Details</h1>
                  <ul className="page-breadcrumb">
                  <li>
                      {/* <a href="/"> */}
                      <Link to = '/'>
                        Home
                      {/* </a> */}
                      </Link>
                    </li>
                    <li>
                      <Link to = '/services'>
                        All Courses
                      </Link>
                    </li>
                    <li>Course Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        {/*====================  project details page content ====================*/}
        <div className="page-wrapper section-space--inner--120">
          {/*Projects section start*/}
          <div className="project-section">
            <div className="container">
              {/* <SearchBar onFormSubmit={this.onTextSubmit} /> */}
              <div className="row">
                <div className="col-12 section-space--bottom--40">
                  <div className="ui container">
                    <div className="ui grid">
                      <div className="ui row">
                      {this.state.data[0]&&
                      <div>
                        <h3>{this.state.data[0].courseName}</h3>  
                        <h5>{this.state.data[0].courseDescription}</h5>
                        <h5>This Course is scheduled from:{this.state.data[0].courseSchedule}</h5>
                      </div>  
                      }

                        <div className="five wide column">
                          {/* <VideoList
                            onVideoSelect={this.onVideoSelect}
                            videos={this.state.videos}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-12 section-space--bottom--30 pl-30 pl-sm-15 pl-xs-15">
                  <div className="project-details">
                    {/* <h2>
                      {" "}
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.title
                        : this.state.status}
                    </h2>
                    <p>
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.course.courseDescription
                        : this.state.status}
                    </p> */}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div>
                    {this.state.enrolled !== "ALREADY ENROLLED" ?
                    <Button variant="primary" className={this.state.buttonclass} onClick={this.handleShow}>
                      {this.state.enrolled}
                    </Button>
                    :
                    <Button variant="primary" className={this.state.buttonclass}>
                      {this.state.enrolled}
                    </Button>
                    }
                    <Modal show={this.state.payShow} onHide={this.handleClose}>
                      <Modal.Header>
                      <Modal.Title>You are paying for: {this.state.courseName}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <h5>Price: ${this.state.amt/100}</h5>

                        <Elements stripe={promise}>
                          <CheckoutForm 
                            amt = {this.state.amt}
                            courseId = {this.state.courseId}  
                          />
                        </Elements>
                        
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>

                {/* <div className="col-12">
                  <PhotoGallery />
                </div> */}
              </div>
            </div>
          </div>
          {/*Projects section end*/}
        </div>

        {/*====================  End of project details page content  ====================*/}


        {/* Footer */}
        <Footer />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    );
  }
}

export default BlogDetailsLeftSidebar;

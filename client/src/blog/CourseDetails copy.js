import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
//import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import axios from "axios";

import Modal from 'react-bootstrap/Modal'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
//import {StripeProvider, Elements} from 'react-stripe-elements';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from './PaymentForm'
import CheckoutForm from './CheckoutForm'
import CheckoutForm2 from './CheckoutForm2'


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
      addcourse: false
    };

    this.onClick = this.onClick.bind(this);
  }

  handleClose = () => {
    //close About Modal  
      this.setState({payShow: false})
  }

  handleShow = () => {
    //show About Modal
      this.setState({payShow: true})
  }

  // onRegister(e){
  //   e.preventDefault();
  //   console.log("register botton clicked");
  //   this.setState({payShow:true});
  // }

  onClick(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented
    // this.setState({
    //     course: this.props.match.params.id,
    //     student: '5d3b601b4b04af228ab854a1',
    //     approved: true
    // });
    console.log(`Form submitted:`);

    console.log(`Todo studentid: ` + this.state.user);
    console.log(`Todo courseid: ` + this.props.match.params.id);
    //console.log(`Todo approved: `);

    const newTodo = {
      student: this.state.user,
      course: this.props.match.params.id,
      approved: true
    };
    if (this.state.buttonclass === "btn btn-success") {
      axios
        .post("/enrollbystudent/add", newTodo)
        .then(result => {
          //this.props.history.push("/addtoplaylist/"+this.props.match.params.id)
          toast.success("Added successfully");
        })
        .catch(err => {
          // then print response status
          toast.error("Course not added");
        });
        this.setState({
          enrolled: "ALREADY ENROLLED",
          buttonclass: "btn btn-danger"
        });
    } else {
      console.log(this.state.buttonclass);
      toast.error("Course already added");
    }
  }
  async componentDidMount() {
    if (this.state.userRole === "student") {
      this.setState({
        addcourse: true
      });
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
                enrolled: "ADD TO COURSE LIST",
                buttonclass: "btn btn-success"
              });
              console.log(result.data);
            }
            //return result;
          });
        console.log(result);
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
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/services">All Courses</a>
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
                    <ToastContainer />
                    <button
                      type="button"
                      style={this.state.addcourse ? {} : { display: "none" }}
                      className={this.state.buttonclass}
                      onClick={this.onClick}
                    >
                      {this.state.enrolled}
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.onRegister}
                    >
                      Register
                    </button> */}
                    <Button variant="primary" className="btn btn-success" onClick={this.handleShow}>
                      Register
                    </Button>
                    <Modal show={this.state.payShow} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>COMP4513 - Assignment1</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Group member: Yichen Li</p>asd

                        <Elements stripe={promise}>
                          <CheckoutForm amt = {8000}/>
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

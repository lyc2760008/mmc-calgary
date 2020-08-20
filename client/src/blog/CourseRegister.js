import React, { Component } from "react";
import axios from "axios";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from './CheckoutForm'


class CourseRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("userid")),
      userRole: JSON.parse(localStorage.getItem("userRole")),
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
      window.location.reload(false);
  }

  handleShow = () => {
    //show Pay Modal
      this.setState({payShow: true});
  }

  async componentDidMount() {

    try {
      const url = "/course/" + this.props.id;
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
      .get("/course/" + this.props.id)
      .then(result => {
        console.log(
          "/checkenrollment?id=" +
            this.state.user +
            "&&courseid=" +
            this.props.id
        );
        axios
          .get(
            "/checkenrollment?id=" +
              this.state.user +
              "&&courseid=" +
              this.props.id
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
        return result;
      });

    this.setState({
      data: response.data,
    });
  }

  render() {
    const promise = loadStripe("pk_test_51HGSPHEKz6NW9w2TRPkTwVwpAZ3UMek59RpJbQpxB6kcy2yIEmwcPQcXH45gqTbWUh39IwH2HosGBy8d8q2OZesp00jM0L4Ylz")
    return (

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
    );
  }
}

export default CourseRegister;

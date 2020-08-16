import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import axios from "axios";

export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [user] = useState(JSON.parse(localStorage.getItem("userid")));
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [{ 
                      //id: "xl-tshirt", 
                      amt: props.amt,
                     }] 
            // amt: [{ amt: props.amt }]
        })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, [props.amt]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: email,
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
            name: ev.target.name.value
            }
        }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    console.log(payload);
    // console.log(`Form submitted:`);
    // console.log(`Todo studentid: ` + user);
    // console.log(`Todo courseid: ` + props.courseId);
    //console.log(`Todo approved: `);

    const newTodo = {
      student: user,
      course: props.courseId,
      approved: true
    };
    axios
    .post("/enrollbystudent/add", newTodo)

    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
     <div className={succeeded ? "hidden" : "shown"}>
     <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address for your invoice"
      />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinnerPayment" id="spinnerPayment"></div>
          ) : (
            "Pay Now"
          )}
        </span>
      </button>
      </div>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {/* <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p> */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see &nbsp;
        <a
          href={
            `${process.env.PUBLIC_URL}/` +
            `servicesforstudent-` +
            user
          }
        >
          {" "}
          My Courses
        </a> &nbsp;for more information. Or refresh the page to see the changes.
      </p>
    </form>
  );
}
import React, { Component } from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'

class PaymentForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
                      name: "",
                      amount: ""
                      };
       }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
        } catch (e) {
            throw e
        }
    }

    render() {
        return (
            <main className="container">
                <form 
                    className="form-group mt-3 border border-primary rounded shadow-lg p-3"
                    onSubmit={this.handleSubmit} 
                >
                    <label>Name</label>
                    <input 
                        type="text"
                        className="input-group my-1 p-1 border border-dark"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <label>Amount</label>
                    <input 
                        type="text"
                        className="input-group my-1 p-1 border border-dark"
                        name="name"
                        value={this.state.amount}
                        onChange={this.onChange}
                    />
                    <label>CC Number --Exp.Date --CVC</label>
                    <CardElement className="p-2 border border-dark" />
                    <button className="btn btn-primary border border-dark shadow">Charg it!</button>
                </form>
            </main>
        )
    }
}

export default injectStripe(PaymentForm);

import React, { Component } from "react";
import { FormControl, FormGroup, Container } from 'react-bootstrap'


const validFeedback = "Looks Good!";

export default class SignUpComponent extends Component {

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() { 
        const disclaimerEmail = "We'll never share your email with anyone else";
        const disclaimerPassword = 'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.';
        const style = {
            width: '400px'
          };
        
        return (
        <Container>
        <article className="card-body mx-auto" style={style}>
            <h4 className="card-title mt-3 text-center"> Create an account </h4>

            <form className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate>
                    
                <div className="form-row">
                    <div className="col">
                        <TextEntry label = {"First Name"}
                        changeHandler = {this.changeHandler}
                        feedback = "Please enter your first name!"/>
                    </div>

                    <div className="col">
                        <TextEntry label = {"Last Name"}
                         feedback = "Please enter your last name!" />
                    </div>
                </div>
   
                <EmailEntry label = {"E-mail"} 
                disclaimer = {disclaimerEmail}
                feedback = "Don't forget your e-mail!"/>

                <Username label = {"Username"}
                disclaimer = {disclaimerEmail} 
                feedback = "Please pick a username!"/>

                <Password label = {"Password"}
                disclaimer = {disclaimerPassword}
                feedback = "Please choose a password!" />

                <Button label = {"Submit"} />

            </form>
        </article>
        </Container>

        ); 
    }

}

function TextEntry(props) {
    return (
        <FormGroup>
            <label for="inputText">{props.label}</label>
            <FormControl 
            id="inputText" 
            placeholder={props.label} 
            type="text" 
            onChange={props.changeHandler} 
            required/>
            <ValidFeedback feedback = {validFeedback}/>
            <InvalidFeedback feedback = {props.feedback} />
        </FormGroup>
    );
}

function EmailEntry(props) {
    return (
        <FormGroup>
            <label for="inputEmail">{props.label}</label>
            <FormControl placeholder={props.label} type="email" required/>
            <small id="emailHelp" className="form-text text-muted">{props.disclaimer}</small>
            <ValidFeedback feedback = {validFeedback}/>
            <InvalidFeedback feedback = {props.feedback} />
        </FormGroup>
    );
}

function Username(props) {
    return (
        <FormGroup>
            <label for="Username">{props.label}</label>
            <div className="form-group input-group-prepend">
                <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                </div>
                <input name="" 
                className="form-control" 
                placeholder={props.label} 
                type="text" 
                maxLength={30}
                required/>
            </div>
            <ValidFeedback feedback = {validFeedback}/>
            <InvalidFeedback feedback = {props.feedback} />
        </FormGroup>
    );
}

function Password(props) {
    return (
        <FormGroup>
            <label for="inputEmail">{props.label}</label>
            <FormControl placeholder={props.label} type="password" required/>
            <small id="passwordHelpBlock" className="form-text text-muted">
                {props.disclaimer}
            </small>
            <ValidFeedback feedback = {validFeedback}/>
            <InvalidFeedback feedback = {props.feedback} />
        </FormGroup>
    
        );
}

function Button(props) {
    return (
        <button type="submit" className="btn btn-primary">{props.label}</button>
    );
}

function ValidFeedback(props) {
    return (
        <div className="valid-feedback">
        {props.feedback}
        </div>
    );

}

function InvalidFeedback(props) {
    return (
        <div className="invalid-feedback">
          {props.feedback}
        </div>
 
    );
}
import React, { Component } from "react";


export default class SignUpComponent extends Component {

    render() { 
        const firstName = 'First Name';
        const lastName = 'Last Name';
        const email = 'E-mail';
        const disclaimerEmail = "We'll never share your email with anyone else";
        const username = "Username";
        const password = "Password";
        const disclaimerPassword = 'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.';
        const button = "Submit";
        const style = {
            width: '400px'
          };
        
        return (
        <div className="container">
        <article className="card-body mx-auto" style={style}>
            <h4 className="card-title mt-3 text-center"> Create an account </h4>

            <form className="needs-validation" novalidate>
                <div className="form-row">
                    <div className="col">
                        <TextEntry label = {firstName}/>
                    </div>

                    <div className="col">
                        <TextEntry label = {lastName} />
                    </div>
                </div>
   
                <EmailEntry label = {email} />

                <Username label = {username}
                disclaimer = {disclaimerEmail} />

                <Password label = {password}
                disclaimer = {disclaimerPassword} />

                <Button label = {button} />

            </form>
        </article>
        </div>

        ); 
    }

}

function TextEntry(props) {
    return (
        <div className="form-group">
            <label for="inputText">{props.label}</label>
            <input name="" class="form-control" id="inputText" placeholder={props.label} type="text" required />
        </div>
    );
}

function EmailEntry(props) {
    return (
        <div className="form-group">
            <label for="inputEmail">{props.label}</label>
            <input name="" className="form-control" placeholder={props.label} type="email" />
            <small id="emailHelp" className="form-text text-muted">{props.disclaimer}</small>
        </div>
    );
}

function Username(props) {
    return (
        <div className="form-group">
            <label for="Username">{props.label}</label>
            <div className="form-group input-group-prepend">
                <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                </div>
                <input name="" className="form-control" placeholder={props.label} type="text" />
            </div>
        </div>
    );
}

function Password(props) {
    return (
        <div>
        <div class="form-group">
            <label for="inputEmail">{props.label}</label>
            <input name="" className="form-control" placeholder={props.label} type="password"/>
        </div>
            <small id="passwordHelpBlock" className="form-text text-muted">
                {props.disclaimer}
            </small>
        </div>
    
        );
}

function Button(props) {
    return (
        <button type="submit" className="btn btn-primary">{props.label}</button>
    );
}
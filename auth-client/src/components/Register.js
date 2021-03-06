import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: '',
  password: '',
  department: '',
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: '',
    }
  }

  inputHandler =  (event) => {
    const { name, value } = event.target;
    this.setState({user: {...this.state.user, [name]: value}});
  }

  submitHandler = (event) => {
    console.log('hello')
    event.preventDefault();
    axios.post(`${url}/api/register`, this.state.user)
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          this.setState({
            message: 'Registration Successful!',
            user: {...initialUser},
          })
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.dir(err);
        this.setState({
          message: 'Registration Failed!',
          user: {...initialUser},
        })
      });

  }

  render() {
    return (
    <div>
    <form onSubmit={this.submitHandler}>
      <label htmlFor="username">Username</label>
      <input 
        type='text' 
        id='username' 
        name='username' 
        value={this.state.user.username}
        onChange={this.inputHandler}></input>

      <label htmlFor="password">Password</label>
      <input 
      type='text' 
      id='password' 
      name='password' 
      value={this.state.user.password}
      onChange={this.inputHandler}></input>

      <label htmlFor="department">Department</label>
      <input 
      type='text' 
      id='department' 
      name='department' 
      value={this.state.user.department}
      onChange={this.inputHandler}></input>
      
      <button type="submit">Submit</button>
    </form>

    { this.state.message 
        ? (<h3>{this.state.message}</h3>)
        : undefined
    }
    
    </div>

    );
  }
}
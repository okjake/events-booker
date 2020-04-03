import React ,{Component}from 'react';
import axios from 'axios';

 class RegisterUser extends Component {
  state = {
    first_name: '',
    last_name:'',
    location:'',
    email:''
  }

  firstNameChange = event => {
    this.setState({ first_name: event.target.value });
  }
  lastNameChange = event => {
    this.setState({ last_name: event.target.value });
  }
  emailChange = event => {
    this.setState({ email: event.target.value });
  }
  locationChange = event => {
    this.setState({ location: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
  }
  regiserUser=()=>{
      console.log('hello from func');
    const userInfo = {
        first_name: this.state.first_name,
        last_name:this.state.last_name,
        location:this.state.location,
        email:this.state.email,
        mobile:this.props.mobileNo,
      };
    axios.post(`/register`, { userInfo })
      .then(res => {
        console.log(res);
      })
    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" name="firstName" value={this.state.first_name} onChange={this.firstNameChange} />
            <input type="text" name="lastName" onChange={this.lastNameChange} />
            <input type="text" name="email" onChange={this.emailChange} />
            <input type="text" name="location" onChange={this.locationChange} />
          <button type="submit" onClick={this.regiserUser}>Add</button>
        </form>
      </div>
    )
  }
}

export default RegisterUser;
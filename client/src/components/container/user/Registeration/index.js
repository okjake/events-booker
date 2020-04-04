import React ,{Component}from 'react';
import axios from 'axios';


 class RegisterUser extends Component {
  state = {
    firstName: '',
    lastName:'',
    location:'',
    email:'',
    error:'',
    isLoaded:false,
  }

  firstNameChange = event => {
    this.setState({ firstName: event.target.value });
  }
  lastNameChange = event => {
    this.setState({ lastName: event.target.value });
  }
  emailChange = event => {
    this.setState({ email: event.target.value });
  }
  locationChange = event => {
    this.setState({ location: event.target.value });
  }
  
  regiserUser=(event)=>{
    event.preventDefault();

    const userInfo = {
        firstName: this.state.firstName,
        lastName:this.state.lastName,
        location:this.state.location,
        email:this.state.email,
        mobile:this.props.mobileNo,
      };
    axios.post(`/api/v1/register`, { userInfo }).then(res => {
        this.setState({isLoaded:true})
        console.log(res);
      }).catch(e => {
        this.setState({error:e,isLoaded:true})
    });
    }
  render() {
      if(this.state.error&&this.state.isLoaded){
          return <div>error on register</div>
      }
      else{
    return (
      <div>
        <form onSubmit={this.regiserUser}>
            <input type="text" name="firstName" onChange={this.firstNameChange} />
            <input type="text" name="lastName" onChange={this.lastNameChange} />
            <input type="text" name="email" onChange={this.emailChange} />
            <input type="text" name="location" onChange={this.locationChange} />
          <button>Add</button>
        </form>
      </div>
    )
  }}
}

export default RegisterUser;
import React ,{Component}from 'react';
import axios from 'axios';


 class RegisterUser extends Component {
  state = {
    first_name: '',
    last_name:'',
    location:'',
    email:'',
    error:'',
    isLoaded:false,
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
    const userInfo = {
        first_name: this.state.first_name,
        last_name:this.state.last_name,
        location:this.state.location,
        email:this.state.email,
        mobile:this.props.mobileNo,
      };
    axios.post(`http://localhost:8000/api/v1/register`, { userInfo },
    {"Clear-Site-Data": "*"})
      .then(res => {
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
        <form onSubmit={this.handleSubmit}>
            <input width="200px" type="text" name="firstName" value={this.state.first_name} onChange={this.firstNameChange} />
            <input type="text" name="lastName" onChange={this.lastNameChange} />
            <input type="text" name="email" onChange={this.emailChange} />
            <input type="text" name="location" onChange={this.locationChange} />
          <button type="primary" onClick={this.regiserUser}>Add</button>
        </form>
      </div>
    )
  }}
}

export default RegisterUser;
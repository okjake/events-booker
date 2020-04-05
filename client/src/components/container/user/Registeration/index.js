import React ,{Component}from 'react';
import axios from 'axios';
import { Button } from 'antd';


class RegisterUser extends Component {
  state = {
    firstName: '',
    lastName:'',
    location:'',
    email:'',
    error:'',
    isLoaded:false,
  }
  onChangeValue=e=>{
    const value=e.target.value;
    this.setState({ [e.target.name]:value });

  }
  
  regiserUser=event=>{
    event.preventDefault();
    const {firstName,lastName,location,email}=this.state;
    const { match: { params } } = this.props;
    const {mobileNo,eventProg,eventCode}=params
    const userInfo = {
        firstName,
        lastName,
        location,
        email,
        mobile:mobileNo,
        eventProg,
        eventCode,
      };
    axios.post(`/api/v1/register`, { userInfo }).then(res => {
        this.setState({isLoaded:true})
        console.log(res);
      }).catch(error => {
        this.setState({error,isLoaded:true})
    });
    }
  render() {
    const {error,isLoaded}=this.state;
    if(error&&isLoaded){
      console.log(error);
      return <div>error on register</div>
      }
    else{
      return (
        <div>
          <form onSubmit={this.regiserUser}>
            <input type="text" name="firstName" onChange={this.onChangeValue} />
            <input type="text" name="lastName" onChange={this.onChangeValue} />
            <input type="email" name="email" onChange={this.onChangeValue} />
            <input type="text" name="location" onChange={this.onChangeValue} />
          <Button>Add</Button>
          </form>
        </div>
      )
  }}
}

export default RegisterUser;
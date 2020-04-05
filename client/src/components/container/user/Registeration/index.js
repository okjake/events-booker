import React ,{Component}from 'react';
import axios from 'axios';
import './style.css'
import { Button ,Form,Input,} from 'antd';


class RegisterUser extends Component {
  state = {
    firstName: '',
    lastName:'',
    location:'',
    email:'',
    error:'',
    isLoaded:false,
  }
  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  taillayout = {
    wrapperCol: { offset: 8, span: 16 },
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
          <div className="header">
            <h1>welcome to GSG event app</h1>
            <h2>register your data to show the available events and choose your favorite</h2>
          </div>
          <Form  {...this.layout}
          name="basic"
          onSubmit={this.regiserUser}
          className="regForm"
          >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your firstName!' }]}
            onChange={this.onChangeValue}
        
          >
            <Input className="inputs" name="firstName" placeholder="enter your fisrt name"/>
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your lastName!' }]}
            onChange={this.onChangeValue}
          >
            <Input className="inputs" name="lastName" placeholder="enter your last name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email' , message: 'Please input your email!' }]}
            onChange={this.onChangeValue}
          >
            <Input className="inputs" name="email" placeholder="enter your email" />
          </Form.Item>

          <Form.Item
            name="location"
            rules={[{ required: true, message: 'Please input your location!' }]}
            onChange={this.onChangeValue}
          >
            <Input className="inputs" name="location" placeholder="enter your location" />
          </Form.Item>
          <div className="btn-g">
          <Form.Item {...this.taillayout}>
            <Button className="btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item {...this.taillayout}>
            <Button className="btn" htmlType="submit">
              exit
            </Button>
          </Form.Item></div>
          </Form>
        </div>
      )
  }}
}


export default RegisterUser;
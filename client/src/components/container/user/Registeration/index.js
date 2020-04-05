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
    responseMsg:''
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
    axios.post(`/api/v1/register`,
      { firstName,
      lastName,
      location,
      email,
      mobile:mobileNo,
      eventProg,
      eventCode }).then(res => {
        this.setState({responseMsg:res.data.msg})
      })
    }
    onFinishFailed = ({ errorFields }) => {
      Form.scrollToField(errorFields[0].name);
    };  
    
  render() {
      return (
        <div className="main">
          <div className="s1">
            <img alt="logo" src="https://raw.githubusercontent.com/GSG-G8/ca-wiki/master/client/public/favicon.ico"/>
            <h1><span className="blue">welcome to</span> GSG event app</h1>
            <h2>Register your data to show the available events and choose your favorite</h2>
            <Form onFinish={this.regiserUser} onFinishFailed={this.onFinishFailed}>
              <Form.Item name="firstName" 
              onFinish={this.onChangeValue}
              rules={[{ required: true, message: 'Please input your firstName!'}]}>
                <Input placeholder="fisrt name" />
              </Form.Item>

              <Form.Item name="lastName" 
              onFinish={this.onChangeValue}
              rules={[{ required: true, message: 'Please input your lastName!'}]}>
                <Input placeholder="last name" />
              </Form.Item>

              <Form.Item name="email" 
              onFinish={this.onChangeValue}
              rules={[{ required: true, message: 'Please input your email!'}]}>
                <Input placeholder="email" />
              </Form.Item>

              <Form.Item name="location" 
              onFinish={this.onChangeValue}
              rules={[{ required: true, message: 'Please input your location!'}]}>
                <Input placeholder="location" />
              </Form.Item>
              <Button type="primary"> Submit </Button>
              <Button> Exit </Button>
            </Form>
          </div>
          <div className="s2">
            <img alt="img" src="https://www.thebalancesmb.com/thmb/E6hp3YFsPw8mCK_39bw94CxE4Vk=/3456x3456/smart/filters:no_upscale()/asian-businesswoman-leading-meeting-at-boardroom-table-504987926-5ad21419c5542e0036d7003e.jpg" />
          </div>
        </div>
      )
  }
}

export default RegisterUser;
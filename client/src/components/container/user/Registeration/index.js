import React ,{Component}from 'react';
import axios from 'axios';
import './style.css'
import { Button ,Form,Input} from 'antd';
import PropTypes from 'prop-types';

class RegisterUser extends Component {
  state = {
    responseMsg:''
  }
    onFinishFailed = ({ errorFields }) => {
      Form.scrollToField(errorFields[0].name);
    };  
    onFinish=value=>{
      const {firstName,lastName,location,email}=value
      const { match: { params } } = this.props;
      const {mobileNo,eventCode}=params
      axios.post(`/api/v1/register`,
      {firstName,lastName,location,email,mobile:mobileNo,eventCode }).then(res => {
        this.setState({responseMsg:res.data.msg})
      })
    }

  render() {
      return (
        <div className="main">
          <div className="s1">
            <img alt="logo" src="https://raw.githubusercontent.com/GSG-G8/ca-wiki/master/client/public/favicon.ico"/>
            <h1><span className="blue">welcome to</span> GSG event app</h1>
            <h2>Register your data to show the available events and choose your favorite</h2>
            <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>

              <Form.Item name="firstName" 
              rules={[{ required: true, message: 'Please input your firstName!'}]}>
                <Input name="firstName"  placeholder="fisrt name" />
              </Form.Item>

              <Form.Item name="lastName" 
              rules={[{ required: true, message: 'Please input your lastName!'}]}>
                <Input name="lastName" placeholder="last name" />
              </Form.Item>

              <Form.Item name="email" 
              rules={[{ required: true, message: 'Please input your email!'}]}>
                <Input name="email" placeholder="email" />
              </Form.Item>

              <Form.Item name="location" 
              rules={[{ required: true, message: 'Please input your location!'}]}>
                <Input name="location" placeholder="location" />
              </Form.Item>
              <Button htmlType="submit" type="primary"> Submit </Button>
              <Button type="danger"> Exit </Button>
            </Form>
          </div>
          <div className="s2">
            <img alt="img" src="https://www.thebalancesmb.com/thmb/E6hp3YFsPw8mCK_39bw94CxE4Vk=/3456x3456/smart/filters:no_upscale()/asian-businesswoman-leading-meeting-at-boardroom-table-504987926-5ad21419c5542e0036d7003e.jpg" />
          </div>
        </div>
      )
  }
}
RegisterUser.propTypes = {
  mobileNo: PropTypes.string,
  eventCode:PropTypes.number

};

export default RegisterUser;
import React ,{Component}from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button ,Form,Input,Alert,Spin ,message} from 'antd';
import { UserOutlined,LoadingOutlined } from '@ant-design/icons';
import {HomeOutlined,MailOutlined} from '@ant-design/icons';

import './style.css'

class RegisterUser extends Component {
  state = {
    emailMsg:'',
    isLoade:false,
    serverError:''
  }
    onFinish=({ firstName, lastName, location, email })=>{
      this.setState({isLoade:true})
      const {
        match: { params : {mobile, eventCode} },history:{push}
      } = this.props;
      axios.post(`/api/v1/register`,
      {firstName,lastName,location,email,mobile,eventCode }).then(res => {
        const {data}=res
        if(res.status===200 && data.message){
          message.success(data.message);
          push('/')
        }
        else{
          this.setState({emailMsg:data.msg})
        }
        this.setState({isLoade:false})
      }).catch(err=>{
        this.setState({serverError:"Internal server error !!",isLoade:false})
      })
    }
    goBack=()=>{
      message.warning('you has not registered yet !!');
      const {
      history:{goBack}} = this.props;
      goBack()

    }
  render() {
        const {emailMsg,serverError  ,isLoade} = this.state;
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

      return (
        <div className="main">
          <div className="s1">
            <img alt="logo" src="https://www.wegrowwithc3.com/soon/wp-content/uploads/2015/08/hhfsyd25_400x400.png"/>
            <h1><span className="blue">welcome to</span> GSG event app</h1>
            <h2>Register your data to show the available events and choose your favorite</h2>
            <Form onFinish={this.onFinish} >

              <Form.Item name="firstName" 
              className="messageColor"
              rules={[{ required: true, message: 'Please input your firstName!'}]}>
                <Input  placeholder="fisrt name"     
                prefix={<UserOutlined className="site-form-item-icon" />}/>
              </Form.Item>

              <Form.Item name="lastName" 
              className="messageColor"
              rules={[{ required: true, message: 'Please input your lastName!'}]}>
                <Input placeholder="last name"
                prefix={<UserOutlined className="site-form-item-icon" />
              } />
              </Form.Item>

              <Form.Item name="email"
              className="messageColor" 
              rules={[{ required: true, message: 'Please input your email!'}]}>
                <Input placeholder="email" 
                prefix={<MailOutlined />}/>
              </Form.Item>

              <Form.Item name="location" 
              className="messageColor"
              rules={[{ required: true, message: 'Please input your location!'}]}>
                <Input placeholder="location"
                prefix={<HomeOutlined />} />
              </Form.Item>

              <Button htmlType="submit" 
              type="primary"> {isLoade&& (<Spin indicator={antIcon}/>)}Submit </Button>

              <Button type="danger" onClick={this.goBack}> Exit </Button>

              {emailMsg&& <Alert message={emailMsg} type="error" />}
              {serverError&& <Alert message={serverError} type="error" />}

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
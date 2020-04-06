import React ,{Component}from 'react';
import axios from 'axios';
import { Button ,Form,Input} from 'antd';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './style.css'

class RegisterUser extends Component {
  state = {
    success : false,
    redirect: false,
    message:''
  }
    
    
    onFinish=({ firstName, lastName, location, email })=>{
      const {
        match: { params : {mobileNo, eventCode} },
      } = this.props;
      axios.post(`/api/v1/register`,
      {firstName,lastName,location,email,mobile:mobileNo,eventCode }).then(res => {
        this.setState({ redirect: true, success : true })
      }).catch(err=>{
        console.log(err.Error);
        this.setState({message:"error on registration"})
      })
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/events' />
      }
    }

  render() {
      const {
        match: { params : {eventCode} },} = this.props;
        const { redirect , success,message } = this.state;
      return (
        <div className="main">
          <div className="s1">
            <img alt="logo" src="https://raw.githubusercontent.com/GSG-G8/ca-wiki/master/client/public/favicon.ico"/>
            <h1><span className="blue">welcome to</span> GSG event app</h1>
            <h2>Register your data to show the available events and choose your favorite</h2>
            <Form onFinish={this.onFinish} >

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
              {message&&<div className="errorHandel">{message}</div>}
              <Button htmlType="submit" type="primary"> Submit </Button>
              
              {redirect && (<Redirect to={{pathname: `/event/${eventCode}`
              ,state: { success }, }} />)}
              <Button type="danger" onClick={() => this.setState({ redirect: true })}> Exit </Button>
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
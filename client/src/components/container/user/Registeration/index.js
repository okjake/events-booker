import React ,{Component}from 'react';
import axios from 'axios';
import { Button ,Form,Input,Alert, } from 'antd';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './style.css'

class RegisterUser extends Component {
  state = {
    success : false,
    redirect: false,
    successMsg:'',
    emailMsg:'',
    isLoade:false,
    serverError:''
  }
     
    onFinish=({ firstName, lastName, location, email })=>{
      this.setState({isLoade:true})
      const {
        match: { params : {mobileNo, eventCode} },
      } = this.props;
      axios.post(`/api/v1/register`,
      {firstName,lastName,location,email,mobile:mobileNo,eventCode }).then(({data}) => {
        console.log(data);
        if(data.status===200){
        this.setState({successMsg:data.message ,success : true,})
      }
        else{
          this.setState({emailMsg:data.message})
        }
        this.setState({ redirect: true,isLoade:false})
      }).catch(err=>{
        this.setState({emailMsg:"email exists !!",isLoade:false})
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
        const { redirect , success,emailMsg ,successMsg ,isLoade} = this.state;

        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
              {emailMsg&& <Alert message={emailMsg} type="error" />}


              <Form.Item name="location" 
              rules={[{ required: true, message: 'Please input your location!'}]}>
                <Input name="location" placeholder="location" />
              </Form.Item>
              {success && (<Alert message={successMsg} type="success" showIcon />)}

              {successMsg  && (<Redirect to={{pathname: `/event/${eventCode}`
              ,state: { success,successMsg }, }} />)}

              <Button htmlType="submit" 
              type="primary" 
              >{isLoade&& (<Spin indicator={antIcon} />)}
               Submit </Button>
              
              {redirect && (<Redirect to={{pathname: `/event/${eventCode}`
              ,state: { success,successMsg }, }} />)}

              <Button type="danger" 
              onClick={() => this.setState({ redirect: true })}> Exit </Button>
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
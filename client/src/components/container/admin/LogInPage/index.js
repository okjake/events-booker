import React, {Component} from 'react';
import axios from 'axios';
import { Button ,Form,Input, Alert,message} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';

import './style.css'
import logo from './images/logo.svg';
import adminLoginImg from './images/adminlogin.png';

class AdminLogin extends Component {
    state ={
        error:'',
        isLoaded: false,
    }

    onFinish=({email, password})=>{
        this.setState({isLoaded:true})


    axios.post(`/api/v1/login`, {email,password}).then(({data})=>{
        if(data.status === 400){
           this.setState({error:data.msg})
            return data.msg
        }
         else if (data.status === 401){
            this.setState({error:data.msg})
            return data.msg;
        } else{
            const {history:{push}} = this.props;
            push('/admin/dashboard')
        }
    }).catch((err)=>{
        this.setState({error:"Internal server error !!",isLoaded:false})
        })

    }


 render(){

    const {error} = this.state;


    return(
        <div class="container">
            <div class="main-section">
                <img class="logo" src= {logo} alt="logo" />
                <h1 class="main-header"><b><span className="span">welcome to</span> GSG event app</b></h1>
                <h2 class="sub-header"><b>ADMIN LOGIN</b></h2>

                <Form onFinish={this.onFinish} >

                    <Form.Item name="email"
                    className="messageColor" 
                    rules={[{ required: true, message: 'Please input your email!'}]}>
                    <Input placeholder="email" 
                    prefix={<MailOutlined />}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="password" 
                        prefix={<LockOutlined/>}/>
                    </Form.Item>

                 
                        <Button type="primary" htmlType="submit">
                        Login
                        </Button>

                    {error&& <Alert message={error} type="error" />}

                  
                </Form>

            </div>

            <div class="img-container">
                <img class="main-img" src={adminLoginImg} alt='grass' />
            </div>
        </div>
    )
}
}


export default AdminLogin;


import React, {Component} from 'react';
import axios from 'axios';
import { Button ,Form,Input, Alert,message, Spin} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';

import './style.css'
import  Logo from './images/logo.svg';
import adminLoginImg from './images/adminlogin.png';

class AdminLogin extends Component {
    state ={
        error:'',
        isLoaded: false,
    }

    onFinish=({email, password})=>{
        this.setState({isLoaded:true})
        axios.post(`/api/v1/login`, {email,password}).then(({data})=>{
        if(data.status === 201){
            const {history:{push}} = this.props;
            message.success(data.msg)
            push('/admin/dashboard')
        }
         else {
            this.setState({error:data.msg})
        } 
        
        this.setState({isLoaded:false})

    }).catch((err)=>{
        this.setState({error:"Internal server error !!",isLoaded:false})
        })

    }


 render(){

    const {error, isLoaded} = this.state;
    return(
        <div class="container">
            <div class="main-section">
                <img class="logo" src= {Logo} alt="logo" />
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
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>

                 
                        <Button type="primary" htmlType="submit">
                    {isLoaded ? <Spin /> : "Login"}
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


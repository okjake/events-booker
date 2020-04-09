import React, {Component} from 'react';
import axios from 'axios';
import { Button ,Form,Input,Alert,Spin ,message} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';

import './style.css'
import './images'

class adminLogin extends component {
    state ={
        error:'',
        isLoaded: false
    }


    onFinish=({ email, password })=>{
        this.setState({isLoaded:true})

    /*  const
      { match: { params : {email, password} },history:{push}
    } = this.props;*/

    axios.post(`/api/v1/login`, {email, password}).then(({data})=>{
        if(data.status === 200){
            message.success('You logged in successfully');
            push('/dashboard')
        }
        else {
        this.setState({isLoaded:false})
        }
    }).catch(err=>{
        this.setState({error:'You password or email is wrong', isLoaded:false})
    })
}

render(){
    const {error,isLoaded} = this.state;

    return(
        <div class="main-section">
            <div class="container">
                <img src="" alt="logo" />
                <h1><span className="span">welcome to</span> GSG event app</h1>

                <Form onFinish={this.onFinish} >

                    <Form.Item name="email"
                    className="messageColor" 
                    rules={[{ required: true, message: 'Please input your email!'}]}>
                    <Input placeholder="email" 
                    prefix={<MailOutlined />}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="password" 
                        prefix={<LockOutlined/>}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Login
                        </Button>
                    </Form.Item>
                    
                                    


                    {emailMsg&& <Alert message={emailMsg} type="error" />}
                    {serverError&& <Alert message={serverError} type="error" />}

                </Form>

            </div>

            <div class="img-container">
                <img src='' alt='grass image' />
            </div>
        </div>
    )
}
}


export default adminLogin;
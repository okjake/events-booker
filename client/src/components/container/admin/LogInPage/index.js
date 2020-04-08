

























// Admin login
import React,{component} from 'react';
import axios from 'axios';
import { Button ,Form,Input,Alert,Spin ,message} from 'antd';

import './style.css';

class AdminLogIn extends component{
    state = {
        error:''
    }


    axios.post(`/api/v1/register`,{ email , password}).then(res=>{
        const{data}=res
        if(res.status===200 &&)
    })
}



render(){
    return()
}
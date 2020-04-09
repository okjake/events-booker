import React ,{Component} from "react";
import {Button} from "antd"
import Axios from 'axios'
import { PlusSquareFilled } from '@ant-design/icons';

import "./style.css"

class Dashboard extends Component {
    state={
        name:"",
        img:"",
        error:""
    }
    componentDidMount(){
        Axios.get('/api/v1/admin').then(({data})=>{
            console.log(data[0]);
            const {name,img}=data[0]
            this.setState({name,img})
        }).catch(err=>{
            this.setState({error:err.msg})
        })
    }
    logout=()=>{
        Axios.get('/api/v1/logout').then((res)=>{
            this.props.history.push('/login');
        }).catch(err=>{
            this.setState({error:err.msg})
        })
    }

    render(){
        const {name,img}=this.state
        return(
            <div className="dashboard">
                <div className="header">
                    <h1 className="logo">Dashboard </h1>
                    <Button type="danger" onClick={this.logout} >log out</Button>
                </div>
                <div className="main-el">
                <aside className="menue">
                    <div className="adminInfo">
                        <img alt="admin img" src={img}/>
                        <h3>{name}</h3>
                    </div>
                    <div className="btn-g">
                        <Button className="add-btn">add event <PlusSquareFilled /></Button>
                        <Button>users</Button>
                        <Button>events</Button>
                    </div>
                </aside>
                <div className="block-el">

                </div></div>

            </div>
        )
    }
}
export default Dashboard;
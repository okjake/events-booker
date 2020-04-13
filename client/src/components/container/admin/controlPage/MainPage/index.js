import React ,{Component} from "react";
import {Button} from "antd"
import Axios from 'axios'
import { PlusSquareFilled } from '@ant-design/icons';
import AddEvent from '../component/AddEvent'
import ViewEvents from '../component/ViewEvents/ViewEvents'
import ViewUsers from '../component/ViewUsers/ViewUsers'
import {Alert,message} from "antd"

import "./style.css"

class Dashboard extends Component {
    state={
        name:"",
        img:"",
        adminError:"",
        renderView:"add"
    }
    componentDidMount(){
        Axios.get('/api/v1/admin').then(({data})=>{
            const {name,img}=data[0]
            this.setState({name,img})
        }).catch(err=>{
            this.setState({adminError:"failed to get admin data"})
        })
    }
    logout=()=>{
        Axios.get('/api/v1/logout').then((res)=>{
            const {history:{push}}=this.props
            push('/login');
        }).catch(err=>{
            message.error('failed on logout process');
        })
    }

    clickBtn = ({target:{value}}) => {
        this.setState({renderView:value});
    }
        
    render(){
        const {name,img,adminError,renderView}=this.state
        const arr=["add","users","events"]
        const buttons=arr.map(el=>{
            if(el==="add"){
                return(<Button value={el} className="add-btn"
                key={el}
                onClick={this.clickBtn}>add event 
                <PlusSquareFilled /></Button>) 
            }
            return <Button value={el} key={el}
                    onClick={this.clickBtn}>{el}</Button>
        })
        return(
            <div className="dashboard">
                <div className="header">
                    <h1 className="logo">Dashboard </h1>
                    <Button type="danger" onClick={this.logout} >log out</Button>
                </div>
                <div className="main-el">
                    <aside className="menue">
                        {(adminError)? <Alert message={adminError} type="error" />:
                        (<div className="adminInfo">
                            <img alt="admin img" src={img}/>
                            <h3>{name}</h3>
                        </div>)}
                        
                        <div className="btn-g">
                            {buttons}
                        </div>
                    </aside>
                    <div className="block-el">
                            {renderView==="add" &&
                            <div className="form-div">
                                <h1>Add Event</h1>
                                <AddEvent className="addEvC"/>
                            </div>}
                            {renderView ==="users" && 
                            <div className="user-div">
                                <h1>Users</h1>
                                <ViewUsers/>
                            </div>}
                            {renderView ==="events" &&
                            <div className="event-div">
                                <h1>events</h1>
                                <ViewEvents/>
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;
import React ,{Component} from "react";
import {Button} from "antd"
import Axios from 'axios'
import { PlusSquareFilled } from '@ant-design/icons';

import "./style.css"

class Dashboard extends Component {
    state={
        name:"",
        img:"",
        addEvent:true,
        users:false,
        events:false,
        error:""
    }
    componentDidMount(){
        Axios.get('/api/v1/admin').then(({data})=>{
            console.log(data[0]);
            const {name,img}=data[0]
            this.setState({name,img})
        }).catch(err=>{
            this.setState({error:err})
        })
    }
    logout=()=>{
        Axios.get('/api/v1/logout').then((res)=>{
            this.props.history.push('/login');
        }).catch(err=>{
            this.setState({error:err.msg})
        })
    }
    handleClickbtn1=()=> {
        this.setState({addEvent: true,events:false,users: false} )
        }
    handleClickbtn2=()=> {
        this.setState({users:true,addEvent:false,events:false})
        }
    handleClickbtn3=()=> {
        this.setState({events:true,addEvent:false,users:false})
        }

    render(){
        const {name,img,error,addEvent,events,users}=this.state
        if(error){
            return (<div>error</div>)
        }
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
                            <Button className="add-btn"onClick={this.handleClickbtn1}>add event 
                            <PlusSquareFilled /></Button>
                            <Button  onClick={this.handleClickbtn2}>users</Button>
                            <Button  onClick={this.handleClickbtn3}>events</Button>
                        </div>
                    </aside>
                    <div className="block-el">
                            {addEvent && <div>componant add event</div>}
                            {users && <div>componant show users</div>}
                            {events && <div>componant show events</div>}
                    </div>
                </div>

            </div>
        )
    }
}
export default Dashboard;
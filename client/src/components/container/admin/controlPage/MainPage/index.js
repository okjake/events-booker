import React ,{Component} from "react";
import {Button} from "antd"
import Axios from 'axios'
import { PlusSquareFilled } from '@ant-design/icons';

import "./style.css"

class Dashboard extends Component {
    state={
        name:"",
        img:"",
        error:"",
        renderView:"add"
    }
    componentDidMount(){
        Axios.get('/api/v1/admin').then(({data})=>{
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

    clickBtn = ({target:{value}}) => {
        this.setState({renderView:value});
    }
        
    render(){
        const {name,img,error,renderView}=this.state
        const arr=["add","users","events"]
        const buttons=arr.map(el=>{
            if(el==="add"){
                return(<Button value={el} className="add-btn"
                onClick={this.clickBtn}>add event 
                <PlusSquareFilled /></Button>) 
            }
            return <Button value={el} onClick={this.clickBtn}>{el}</Button>
        })
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
                            {buttons}
                        </div>
                    </aside>
                    <div className="block-el">
                            {renderView==="add" && <div>componant add event</div>}
                            {renderView ==="users" && <div>componant show users</div>}
                            {renderView ==="events" && <div>componant show events</div>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;
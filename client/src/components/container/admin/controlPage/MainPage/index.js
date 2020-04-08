import React ,{Component} from "react";
import {Button} from "antd"
import "./style.css"
class Dashboard extends Component {

    render(){
        return(
            <div className="dashboard">
                <div className="header">
                    <img className="logo" src="https://www.wegrowwithc3.com/soon/wp-content/uploads/2015/08/hhfsyd25_400x400.png" alt="logo"/>
                    <Button>log out</Button>
                </div>
                <aside className="menue">
                    <div className="adminInfo">
                        <img alt="admin img" src=""/>
                        <p>admin name</p>
                    </div>
                    <div className="btn-g">
                        <Button>add event</Button>
                        <Button>users</Button>
                        <Button>events</Button>
                    </div>
                </aside>

            </div>
        )
    }
}
export default Dashboard;
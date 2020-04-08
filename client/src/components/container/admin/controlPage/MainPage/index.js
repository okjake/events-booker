import React ,{Component} from "react";
import {Button} from "antd"
import { PlusSquareFilled } from '@ant-design/icons';

import "./style.css"
class Dashboard extends Component {

    render(){
        return(
            <div className="dashboard">
                <div className="header">
                    <img className="logo" src="https://www.wegrowwithc3.com/soon/wp-content/uploads/2015/08/hhfsyd25_400x400.png" alt="logo"/>
                    <Button type="danger">log out</Button>
                </div>
                <div className="main-el">
                <aside className="menue">
                    <div className="adminInfo">
                        <img alt="admin img" src="https://geographical.co.uk/media/k2/items/cache/eb8c0a46c2085216dea7d19f92a60fd7_XL.jpg"/>
                        <h3>Admin name</h3>
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
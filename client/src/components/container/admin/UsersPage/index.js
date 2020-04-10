import React,{Component} from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Axios from "axios";

import "./style.css"

class UsersPage extends Component {
    state={
        users:[],
        isLoaded:false,
        error:null
    }
    componentDidMount(){
        const {match:{params:{eventcode}}}=this.props
        Axios.get(`/api/v1/event/${eventcode}/users`)
        .then(({data})=>{
            this.setState({users:data,isLoaded:true})
        })
        .catch(error=>{
            this.setState({error,isLoaded:true})
        })
    }
    render(){
        const { error, isLoaded, users } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="eventusers"
                    sheet="tablexls"
                    buttonText="export users to xls"/>
                <table id="table-to-xls">
                <thead>
                <tr>
                    <th>user name</th>
                    <th>mobile</th>
                    <th>email</th>
                    <th>location</th>
                </tr>
                </thead>
                <tbody>
                {users.map(({first_name,last_name,location,email,mobile}) => (
                    <tr key={first_name}>
                    <td>{first_name+" "+ last_name} </td>
                    <td>{mobile}</td>
                    <td>{email}</td>
                    <td>{location}</td>
                    </tr>
                ))}
                </tbody>
                </table>

            </div>
            );
        }
    }   
    
}


export default UsersPage
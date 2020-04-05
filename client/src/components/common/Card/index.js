//react function component 
import React from 'react';
//import '../Card/style.css'
import { Button } from "antd";
//import 'antd/dist/antd.css';



const Card = (props)=> {
    const {image,title,category,date} = props;
    console.log(props);

    return(
        <div>

        <img src='https://www.thebalancesmb.com/thmb/E6hp3YFsPw8mCK_39bw94CxE4Vk=/3456x3456/smart/filters:no_upscale()/asian-businesswoman-leading-meeting-at-boardroom-table-504987926-5ad21419c5542e0036d7003e.jpg' alt=""/>
        <p>Event</p>
        <p>coding</p>
        <p>12/12</p>
        
        <div>
        <Button type="primary">Primary</Button>
        </div>
    </div>
    );

}

export default Card;

///
///<div>
          //  <img src={image} alt=""/>
            //<p>{title}</p>
            //<p>{category}</p>
            //<p>{date}</p>
            //<Button type="primary">Primary</Button>
       // </div>
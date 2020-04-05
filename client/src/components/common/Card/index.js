//react function component 
import React from 'react';
import './style.css'
import { Button } from "antd";



const Card = (props)=> {
    const {image,title,category,date} = props;
    console.log(props);

    return(
        <div class="container">
        <div class="card">
            <div class="card__image-container">
            <img class="card__image"  src={image} alt=""/>
            </div>
            <div class="card__content">
            <p class='card__p'><b>Event Title :</b> {title}</p>
            <p class='card__p'><b>Event category :</b> {category}</p>
            <p class='card__p'><b>Event Date :</b> {date}</p>
            </div>
            <div class='card__button'>
                <Button type="primary">See More</Button>
            </div>
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

// This code to see the final result of the card 
/* <div class="container">
<div class="card">
<div class="card__image-container">
<img class="card__image"  src='https://www.thebalancesmb.com/thmb/E6hp3YFsPw8mCK_39bw94CxE4Vk=/3456x3456/smart/filters:no_upscale()/asian-businesswoman-leading-meeting-at-boardroom-table-504987926-5ad21419c5542e0036d7003e.jpg' alt=""/>
</div>
<div class="card__content">
<p class='card__p'><b>Event Title :</b> Coding For Everyone</p>
<p class='card__p'><b>Event category :</b> Coding</p>
<p class='card__p'><b>Event Date :</b> 12/12/2020</p>
</div>
<div class='card__button'>
    <Button type="primary">See More</Button>
</div>
</div>
</div>*/
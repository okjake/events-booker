import React from 'react';
import { Button } from "antd";

import './style.css'



const Card = ({image,title,category,date})=> {

    return(
        <div class="container">
        <div class="card">

            <div class="card__image-container">
                <img class="card__image"  src={image} alt="{title}"/>
            </div>

            <div class="card__content">
                <h3 class='card__p'><b>{title}</b></h3>
                <p class='card__p'><b>By :</b> {category}</p>
                <p class='card__p'><b>Date :</b> {date}</p>
            </div>

            <div class='card__button'>
                <Button type="primary">See More</Button>
            </div>
        </div>
    </div>
    )

}

export default Card;


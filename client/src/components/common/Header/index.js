import React from "react";
import "./style.css";

const Header = () => {
  return (
    <div className="header">
      <div>
        <img
          className="header_logo"
          src="https://2.bp.blogspot.com/-Prc3AXiGhIk/W6DKt3VuGVI/AAAAAAAAeGI/A-aOvZb3isIwSY5zk-JIWahjQUVsBgx5gCLcBGAs/s320/1-logo-GSG.png"
          alt="GSG Logo"
        />
      </div>

      <div>
        <h3 className="header_title">
          Events <span className="header_subTitle">Booker</span>
        </h3>
      </div>
    </div>
  );
};

export default Header;

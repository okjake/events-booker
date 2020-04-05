import React from "react";


const Footer= () => {
  return (
      <footer>
          <div>
            <h5 className="title">Footer Content</h5>
            <p>
             Here you can use rows and columns here to organize your footer
             content.
            </p> 
          </div>
          
          <div>

            <h5 className="title">Links</h5>
            <ul>
                <li className="list-unstyled">
                    <a href="#!">Link 1</a>
                </li>
                <li className="list-unstyled">
                    <a href="#!">Link 2</a>
                </li>
                <li className="list-unstyled">
                    <a href="#!">Link 3</a>
                </li>
                <li className="list-unstyled">
                    <a href="#!">Link 4</a>
                </li>
            </ul>
          </div>

          <div>
            <p>&copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a></p> 
          </div>
      </footer>
  )
}

export default Footer;


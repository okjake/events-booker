import React from "react";
import './style.css'


const Footer= () => {
  return (
      <div>
         
          <footer class="footer-distributed">

			<div class="footer-left">
				<h3>EVENTS<span>BOOKER</span></h3>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p>UNWRA HQ Square, Almotaz 3 Building, Mezzanine level</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+972 8-282-6331</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="info@gazaskygeeks.com">Email: info@gazaskygeeks.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About Our App:</span>
					Our app is a tool to help GSG in organizing the registration for the events that they held there. 

				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fab fa-youtube"></i></a>
					<a href="#"><i class="fab fa-instagram"></i></a>

				</div>

			</div>

		</footer>
      </div>
  )
}

export default Footer;




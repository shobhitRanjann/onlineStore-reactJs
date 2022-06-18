import React from "react"

const footerbody = {
  color: "black",
  backgroundColor: "aliceblue",
  
}

const Footer = () => <footer className="page-footer font-small blue pt-4" style={footerbody}>
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Footer Content</h5>
                <p>If someone wants to sell their products, they can contact us via email 'xyz@smallstore.com' you will get your reply soon, we dont provide seperate admin page, you need to mail all the details of your actual profession, after that we will look into it and will contact you shortly!</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="https://amazon.com">amazon</a></li>
                    <li><a href="https://flipkart.com">flipkart</a></li>
                    <li><a href="https://meesho.com/">meesho</a></li>
                    <li><a href="https://sviet.ac.in">SVIET</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Coming Soon</a></li>
                    <li><a href="#!">Coming Soon</a></li>
                    <li><a href="#!">Coming Soon</a></li>
                    <li><a href="#!">Coming Soon</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 Copyright:
        <a> smallstore.com</a>
    </div>

</footer>

export default Footer
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => (
  <footer className="footer container-fluid">
    <div className="row align-items-center py-2">
      <div className="col">
        <div className="row align-items-center gy-2">
          <div className="col d-flex justify-content-center justify-content-md-start order-last order-md-first copyright">
            &copy; 2022 WebDevHod All Rights Reserved
          </div>
          <div className="col d-flex justify-content-center">
            <img src="content/img/ContactPro.png" height="50" />
          </div>
          <div className="col-12 col-md d-flex justify-content-center justify-content-md-end">
            <a href="https://github.com/webdevhod/ContactPro" className="socialicons me-2" target="_blank">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/daniel-ho-6305193b/" className="socialicons" target="_blank">
              <i className="bi bi-linkedin p-2 "></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
// import './footer.scss';

// import React from 'react';

// import { Col, Row } from 'reactstrap';

// const Footer = () => (
//   <div className="footer page-content">
//     <Row>
//       <Col md="12">
//         <p>This is your footer</p>
//       </Col>
//     </Row>
//   </div>
// );

// export default Footer;

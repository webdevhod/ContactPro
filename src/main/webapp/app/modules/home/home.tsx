import React from 'react';

export const Home = () => {
  return (
    <div className="row align-items-center h-100">
      <div className="col-12 col-md-6 col-lg-5 order-last order-md-first">
        <div className="ms-5">
          <h1 className="heroTitle">
            All your <span className="texthighlight">contacts</span> in one place
          </h1>
          <div className="subtitle">
            Organize your events by keeping everyone in the loop. Experience the power of ContactPro demo it today!
            <br />
            <br />
            <strong>Built with pride using cutting edge tech:</strong>
            <br />
            <i className="devicon-spring-plain-wordmark colored icon"></i>
            <i className="devicon-java-plain-wordmark colored icon"></i>
            <i className="devicon-react-original-wordmark colored icon"></i>
            <i className="devicon-javascript-plain colored icon"></i>
            <i className="devicon-postgresql-plain-wordmark colored icon"></i>
            <i className="devicon-bootstrap-plain-wordmark colored icon"></i>
          </div>
          <div className="text-start mt-5">
            <a className="btn btn-lg btn-primary rounded-pill w-25">DEMO</a>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-7 text-center">
        <img src="content/img/contactProLanding.png" className="img-fluid" />
      </div>
    </div>
  );
};

export default Home;
// import './home.scss';

// import React from 'react';
// import { Link } from 'react-router-dom';

// import { Row, Col, Alert } from 'reactstrap';

// import { useAppSelector } from 'app/config/store';

// export const Home = () => {
//   const account = useAppSelector(state => state.authentication.account);

//   return (
//     <Row>
//       <Col md="3" className="pad">
//         <span className="hipster rounded" />
//       </Col>
//       <Col md="9">
//         <h2>Welcome, Java Hipster!</h2>
//         <p className="lead">This is your homepage</p>
//         {account?.login ? (
//           <div>
//             <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>
//           </div>
//         ) : (
//           <div>
//             <Alert color="warning">
//               If you want to
//               <span>&nbsp;</span>
//               <Link to="/login" className="alert-link">
//                 sign in
//               </Link>
//               , you can try the default accounts:
//               <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (login=&quot;user&quot; and
//               password=&quot;user&quot;).
//             </Alert>

//             <Alert color="warning">
//               You don&apos;t have an account yet?&nbsp;
//               <Link to="/account/register" className="alert-link">
//                 Register a new account
//               </Link>
//             </Alert>
//           </div>
//         )}
//         <p>If you have any question on JHipster:</p>

//         <ul>
//           <li>
//             <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
//               JHipster homepage
//             </a>
//           </li>
//           <li>
//             <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
//               JHipster on Stack Overflow
//             </a>
//           </li>
//           <li>
//             <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
//               JHipster bug tracker
//             </a>
//           </li>
//           <li>
//             <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
//               JHipster public chat room
//             </a>
//           </li>
//           <li>
//             <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
//               follow @jhipster on Twitter
//             </a>
//           </li>
//         </ul>

//         <p>
//           If you like JHipster, don&apos;t forget to give us a star on{' '}
//           <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
//             GitHub
//           </a>
//           !
//         </p>
//       </Col>
//     </Row>
//   );
// };

// export default Home;

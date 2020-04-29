import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import {getUser} from "../../redux/actions";

const Landing = (props) => {
    console.log("isUserRetrieved", props.isUserRetrieved)
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
        <h1>EVENT HORIZON</h1>
        <h2>an event planner</h2>
        <section>
            <h3>AVAILABILITY</h3>
            <div>See days where everyone is free at a glance</div>
        </section>
        <section>
            <h3>COST SPLIT</h3>
            <div>Divide group costs evenly</div>
        </section>
        <section>
            <h3>CHECKLIST</h3>
            <div>Ensure nothing is forgotten</div>
        </section>
        <button onClick={() => loginWithRedirect({redirect_uri: 'http://localhost:3000/events'})}>SIGN IN</button>
        
    </div>
  );
};

const mapStateToProps = ({ user, events }) => ({
    isUserRetrieved: user.isUserRetrieved,
  });
  
const mapDispatchToProps = dispatch =>
bindActionCreators(
    {
        getUser
    },
    dispatch
);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Landing);
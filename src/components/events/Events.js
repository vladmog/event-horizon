import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useAuth0 } from "../../react-auth0-spa";

import {getUser} from "../../redux/actions";

const Events = (props) => {

    const { user } = useAuth0();
    console.log(user)

  return (
    <div>
        <h1>Events</h1>
        <h2>Hello {user.email}</h2> 
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
)(Events);
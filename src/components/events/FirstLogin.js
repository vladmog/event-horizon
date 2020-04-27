import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import {getUser} from "../../redux/actions";

const FirstLogin = (props) => {


  return (
    <div>
        <h1>FirstLogin</h1>     
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
)(FirstLogin);
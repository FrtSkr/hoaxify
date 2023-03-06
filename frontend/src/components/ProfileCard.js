import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    let message = "We cannot edit";

    if (pathUsername === props.loggedInUsername) {
        message = "We can edit";
    }

    return (
        <div>
            {message}
        </div>
    );
};

const mapStateToProps = store => {
    return {
        loggedInUsername: store.username
    };
};

const ProfileCardWithRouter = withRouter(ProfileCard);
export default connect(mapStateToProps)(ProfileCardWithRouter);
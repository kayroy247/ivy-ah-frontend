import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/auth';
import { fetchProfile } from '../actions/profile';
import ProfileContainer from './ProfileContainer';

const AuthButtonContainer = ({
  token, signup, login, signupClass, loginClass, containerClass, onClick, getProfile
}) => {
  const click = (islogin) => {
    if (islogin) { login(); } else { signup(); }
    if (onClick) { onClick(); }
  };
  return !token ? (
    <div className={containerClass}>
      <button onClick={() => click(true)} type="button" className={signupClass}>Sign In</button>
      <button onClick={() => click(false)} type="button" className={loginClass}>Sign Up</button>
    </div>
  ) : (
    <ProfileContainer />
  );
};

const mapDispatchToProps = dispatch => ({
  signup: () => dispatch(toggleModal('sign up')),
  login: () => dispatch(toggleModal('sign in')),
  getProfile: () => dispatch(fetchProfile())
});

const mapStateToProps = ({ auth, profileReducer }) => ({
  token: auth.token
});

AuthButtonContainer.propTypes = {
  token: PropTypes.oneOf([PropTypes.string, null]).isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  loginClass: PropTypes.string.isRequired,
  signupClass: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

AuthButtonContainer.defaultProps = {
  onClick: false
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtonContainer);
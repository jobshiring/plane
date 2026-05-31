import React from 'react';
import ResetPasswordForm from 'src/components/forms/reset-password';
import PropTypes from 'prop-types';

const ResetPasswordMain = (props) => {
  const { token } = props;
  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordMain;

ResetPasswordMain.propTypes = {
  token: PropTypes.string.isRequired,
};
import React from 'react';

import ResetPasswordForm from 'src/components/forms/reset-password';

const ResetPasswordMain = (props) => {
  const { token } = props;
  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordMain;

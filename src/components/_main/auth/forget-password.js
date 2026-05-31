'use client';
import React, { useState } from 'react';
import { useRouter } from '@bprogress/next';
import { Box, Button, Typography } from '@mui/material';

import ForgetPasswordForm from 'src/components/forms/forget-password';
import { CiCircleCheck } from 'react-icons/ci';

export default function ForgetPasswordMain() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate backend call (UI only)
  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Email sent successfully!');
    }, 1500);
  };

  return (
    <>
      {!sent ? (
        <Box>
          <Typography variant="h3" textAlign="center" paragraph>
            Forget Password
          </Typography>
          <Typography color="text.secondary" mb={5} textAlign="center">
            Please enter the email address associated with your account and we
            will email you a link to reset your password.
          </Typography>

          <ForgetPasswordForm
            onSent={() => setSent(true)}
            onGetEmail={(value) => setEmail(value)}
          />

          <Button
            fullWidth
            size="large"
            onClick={() => router.push('/auth/login')}
            className="full-width-btn"
            sx={{ mt: 1 }}
          >
            back
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <Box
            sx={{
              mb: 5,
              mx: 'auto',
              display: 'inline-block',
            }}
          >
            <CiCircleCheck fontSize={160} />
          </Box>

          <Typography variant="h3" gutterBottom>
            Request Sent
          </Typography>
          <Typography mb={5}>
            Email has been sent to <strong>{email}</strong>.
          </Typography>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            onClick={handleResend}
          >
            resend
          </Button>

          <Button
            size="large"
            fullWidth
            onClick={() => router.push('/auth/login')}
            className="full-width-btn"
            sx={{ mt: 1 }}
          >
            back
          </Button>
        </Box>
      )}
    </>
  );
}

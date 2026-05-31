"use client";

import React, { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useRouter } from "@bprogress/next";
import toast from "react-hot-toast";

export default function AccountChangePassword() {
  const pathname = usePathname();
  const router = useRouter();

  // Simulated user JSON data
  const [user, setUser] = useState({
    _id: "u12345",
    role: "user", // or "admin"
    password: "oldpass123",
  });

  const [loading, setLoading] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Validation Schema
  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm your new password"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setTimeout(() => {
        // Mock password change logic (no API)
        if (values.oldPassword !== user.password) {
          toast.error("Old password is incorrect!");
        } else {
          setUser((prev) => ({ ...prev, password: values.newPassword }));
          toast.success("Password updated successfully!");
          resetForm();
        }
        setLoading(false);
      }, 1000);
    },
  });

  // Redirect admins away from user route
  useEffect(() => {
    if (!pathname.includes("admin") && user.role === "admin") {
      router.push("/admin/settings/change-password");
      toast("User can't access this page.", { duration: 6000 });
    }
  }, [pathname, router, user.role]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Old Password */}
            <Stack spacing={1}>
              <Typography
                variant="overline"
                color="text.primary"
                htmlFor="old-password"
                component="label"
              >
                Old Password
              </Typography>
              <TextField
                id="old-password"
                {...getFieldProps("oldPassword")}
                fullWidth
                type={oldPasswordVisible ? "text" : "password"}
                error={Boolean(touched.oldPassword && errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setOldPasswordVisible((prev) => !prev)}
                      >
                        {oldPasswordVisible ? (
                          <MdOutlineVisibility size={24} />
                        ) : (
                          <MdOutlineVisibilityOff size={24} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* New Password */}
            <Stack spacing={1}>
              <Typography
                variant="overline"
                color="text.primary"
                htmlFor="new-password"
                component="label"
              >
                New Password
              </Typography>
              <TextField
                id="new-password"
                {...getFieldProps("newPassword")}
                fullWidth
                type={newPasswordVisible ? "text" : "password"}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={
                  (touched.newPassword && errors.newPassword) ||
                  "Password must be minimum 6+"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setNewPasswordVisible((prev) => !prev)}
                      >
                        {newPasswordVisible ? (
                          <MdOutlineVisibility size={24} />
                        ) : (
                          <MdOutlineVisibilityOff size={24} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Confirm Password */}
            <Stack spacing={1}>
              <Typography
                variant="overline"
                color="text.primary"
                htmlFor="confirm-new-password"
                component="label"
              >
                Confirm New Password
              </Typography>
              <TextField
                id="confirm-new-password"
                {...getFieldProps("confirmPassword")}
                fullWidth
                type={confirmPasswordVisible ? "text" : "password"}
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setConfirmPasswordVisible((prev) => !prev)
                        }
                      >
                        {confirmPasswordVisible ? (
                          <MdOutlineVisibility size={24} />
                        ) : (
                          <MdOutlineVisibilityOff size={24} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={loading}
              fullWidth
            >
              Save
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}

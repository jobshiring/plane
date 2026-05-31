// "use client"; // Ensures this component runs on the client side
// import React from "react"; // Importing React for component rendering

// // Importing next component
// import { useRouter } from "@bprogress/next";
// // Importing api
// import * as api from "src/services";
// import { useMutation } from "@tanstack/react-query";

// // Importing toast
// import { toast } from "react-hot-toast";
// // Importing UI components from MUI
// import { Box, Card, Stack, Container, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import LoadingButton from "@/components/loadingButton";
// // Importing react outer component
// import OtpInput from "react-otp-input";
// import Countdown from "react-countdown";

// // Renderer callback with condition
// const renderer = ({ ...props }) => {
//   const { minutes, seconds } = props;
//   return (
//     <>
//       <Stack
//         direction="row"
//         gap={0.5}
//         sx={{
//           bgcolor: "background.default",
//           border: (theme) => "1px solid " + theme.palette.divider,
//           p: 1,
//           borderRadius: "4px",
//           maxWidth: 100,
//           mx: "auto",
//           mt: 2,
//           color: "text.primary",
//         }}
//       >
//         <Stack
//           justifyContent="center"
//           alignItems="center"
//           gap={0}
//           sx={{
//             height: 28,
//             width: 28,
//             borderRadius: "2px",
//           }}
//         >
//           <Typography
//             variant="body1"
//             color="text.primary"
//             fontWeight={800}
//             fontSize={14}
//             lineHeight={1}
//           >
//             {minutes}
//           </Typography>
//           <Typography
//             variant="body1"
//             color="text.primary"
//             fontSize={8}
//             fontWeight={400}
//             lineHeight={1}
//           >
//             MIN
//           </Typography>
//         </Stack>
//         <Typography variant="body1" color="common.white">
//           :
//         </Typography>
//         <Stack
//           justifyContent="center"
//           alignItems="center"
//           gap={0}
//           sx={{
//             height: 28,
//             width: 28,
//             borderRadius: "2px",
//           }}
//         >
//           <Typography
//             variant="body1"
//             color="text.primary"
//             fontWeight={800}
//             fontSize={14}
//             lineHeight={1}
//           >
//             {seconds}
//           </Typography>
//           <Typography
//             variant="body1"
//             color="text.primary"
//             fontSize={8}
//             fontWeight={400}
//             lineHeight={1}
//           >
//             SEC
//           </Typography>
//         </Stack>
//       </Stack>
//     </>
//   );
// };
// export default function VerifyOTPForm() {
//   const router = useRouter();
//   const theme = useTheme();

//   const [loading, setLoading] = React.useState(false);
//   const [resendLoading, setResendLoading] = React.useState(false);
//   const [otp, setOtp] = React.useState("");
//   const [complete, setComplete] = React.useState(false);
//   const [countdownDate, setCountdownDate] = React.useState(Date.now() + 60000); // Add this state

//   const onOtpChange = (value) => {
//     setOtp(value);
//     setComplete(false); // Reset complete state
//   };
//   const { mutate: verifyOTPMutate, isPending: isVerifying } = useMutation({
//     mutationFn: api.verifyOTP,
//     retry: false,
//     onSuccess: async () => {
//       toast.success("OTP verified");
//       router.push("/");
//     },
//     onError: () => {
//       toast.error("Invalid OTP.");
//     },
//   });

//   // 🔹 Resend OTP Mutation
//   const { mutate: resendOTPMutate, isPending: isResending } = useMutation({
//     mutationFn: api.resendOTP,
//     retry: false,
//     onSuccess: async () => {
//       toast.success("OTP resent");
//     },
//     onError: () => {
//       toast.error("Invalid OTP.");
//     },
//   });

//   const onResend = () => {
//     setResendLoading(true);
//     resendOTPMutate();
//     setCountdownDate(Date.now() + 60000); // Reset countdown date on OTP change
//   };
//   return (
//     <Container maxWidth="sm">
//       <Card
//         sx={{
//           p: 3,
//           my: 4,
//         }}
//       >
//         <Stack>
//           <Typography textAlign="center" mb={1} variant="h4" gutterBottom>
//             Verify OTP
//           </Typography>
//           <Typography textAlign="center" color="text.secondary" mb={3}>
//             Please enter OTP to continue
//           </Typography>
//           <Box
//             sx={{
//               textAlign: "center",
//               "& > div": {
//                 justifyContent: "center",
//               },
//               span: {
//                 fontSize: 22,
//                 p: 0.5,
//               },
//               input: {
//                 minWidth: 40,
//                 height: 80,
//                 borderRadius: "8px",
//                 fontSize: 24,
//                 fontWeight: 700,
//                 bgcolor: theme.palette.background.default,
//                 color: "text.primary",
//                 border: `1px solid ${theme.palette.divider}`,
//               },
//             }}
//           >
//             <OtpInput
//               value={otp}
//               onChange={onOtpChange}
//               numInputs={6}
//               renderSeparator={<span>-</span>}
//               renderInput={(props) => <input {...props} />}
//               shouldAutoFocus
//             />

//             <LoadingButton
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 maxWidth: 300,
//                 mx: "auto",
//                 mt: 2,
//               }}
//               loading={loading}
//               disabled={otp.length < 6 || loading || (complete && loading)}
//               onClick={() => {
//                 setLoading(true);
//                 verifyOTPMutate({
//                   otp,
//                 });
//               }}
//             >
//               Verify
//             </LoadingButton>
//           </Box>
//           {complete ? (
//             <LoadingButton
//               loading={resendLoading}
//               onClick={onResend}
//               variant="contained"
//               color="secondary"
//               fullWidth
//               sx={{
//                 maxWidth: 300,
//                 mx: "auto",
//                 mt: 2,
//               }}
//             >
//               Resend OTP
//             </LoadingButton>
//           ) : (
//             <Countdown
//               date={countdownDate}
//               renderer={renderer}
//               onComplete={() => setComplete(true)}
//             />
//           )}
//         </Stack>
//       </Card>
//     </Container>
//   );
// }
import React from 'react';

export default function otp() {
  return <div>otp</div>;
}

"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const faqs = [
  {
    question: "What is Reactflights?",
    answer:
      "Reactflights is a powerful and user-friendly flight booking system. It’s designed to make managing and booking flights easy with modern features and seamless integration.",
  },
  {
    question: "How do I get started with Reactflights?",
    answer:
      "Getting started is simple! Just request a demo on our website, and we’ll walk you through everything you need to know to get set up and running.",
  },
  {
    question: "What features does Reactflights offer?",
    answer:
      "Reactflights offers a range of features like easy flight searches, smooth integration with top suppliers, support for multiple languages, and flexible payment options—all designed to enhance your booking experience.",
  },
  {
    question: "Is Reactflights customizable?",
    answer:
      "Absolutely! Reactflights is highly customizable. You can adjust the interface, set up different modules, and tweak settings to fit your specific needs and preferences.",
  },
  {
    question: "Can I integrate Reactflights with other systems?",
    answer:
      "Yes, Reactflights integrates effortlessly with major flight suppliers like Amadeus and Duffel, and supports various payment gateways to streamline your operations.",
  },
  {
    question: "What kind of support is available?",
    answer:
      "We’ve got you covered with detailed documentation, helpful tutorials, and friendly customer support to assist you with any questions or issues you might have.",
  },
  {
    question: "How secure is Reactflights?",
    answer:
      "Your security is our priority. Reactflights uses robust security measures to protect your data and transactions, ensuring a safe and secure experience for you and your customers.",
  },
  {
    question: "What are the pricing options?",
    answer:
      "For information on pricing, head over to our Pricing page or reach out to us directly. We’ll be happy to discuss your needs and find the best plan for you.",
  },
  {
    question: "Can I try Reactflights before buying?",
    answer:
      "Yes, you can! Request a demo to explore Reactflights and see how it works before making any decisions. We want you to be confident that it’s the right fit for you.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Need help? You can get in touch with our support team via the Contact page on our website or email us directly at support@reactflights.com. We’re here to assist you!",
  },
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<MdOutlineArrowForwardIos style={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...(theme.palette.mode === "dark" && {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function MainFaqs() {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Stack gap={2} sx={{ maxWidth: 700, mx: "auto", py: 5 }}>
      <Typography variant="h2" color="text.primary" textAlign="center">
        Why Choose Reactflights?
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        pb={3}
      >
        Explore key advantages of Reactflights, from cutting-edge technology to
        flexible payment options, all designed to streamline your flight booking
        process.
      </Typography>

      <div>
        {faqs.map((item, i) => (
          <Accordion
            key={i}
            expanded={expanded === i}
            onChange={handleChange(i)}
            sx={{
              mb: 1,
              borderBottom: (theme) =>
                "1px solid " + theme.palette.divider + "!important",
              boxShadow: "none",
            }}
          >
            <AccordionSummary>
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Stack>
  );
}

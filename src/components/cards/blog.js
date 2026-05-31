"use client";
import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Box,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "@bprogress/next";
import { fDateShort } from "src/utils/formatTime";
import { FaShare } from "react-icons/fa";
import { capitalize } from "lodash";

export default function BlogCard({ item }) {
  const router = useRouter();
  const imgSrc = item?.cover?.url || "/placeholder.jpg";

  return (
    <Card
      onClick={() => router.push(`/blogs/${item?.slug || ""}`)}
      sx={{ cursor: "pointer" }}
    >
      <Box
        sx={{
          position: "relative",
          height: 200,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Image
          src={imgSrc}
          alt={item?.title || "blog cover"}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Chip label={capitalize(item?.category || "")} />

        <Typography gutterBottom variant="h5" component="div" noWrap>
          {item?.title || "Untitled"}
        </Typography>

        <Typography variant="body1" mb={0.5}>
          {item?.description ? item.description.slice(0, 50) : ""}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {item?.createdAt ? fDateShort(item.createdAt) : "—"}
          </Typography>

          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/blogs/${item?.slug || ""}`);
            }}
            aria-label="share"
          >
            <FaShare />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}

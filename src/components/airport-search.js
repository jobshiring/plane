"use client";

import React, { useState, useMemo } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";


const mockAirports = [
  { id: "LHR", name: "London Heathrow", code: "LHR", city: "London", country: "UK" },
  { id: "LGW", name: "London Gatwick", code: "LGW", city: "London", country: "UK" },
  { id: "JFK", name: "John F. Kennedy Intl", code: "JFK", city: "New York", country: "USA" },
  { id: "EWR", name: "Newark Liberty Intl", code: "EWR", city: "Newark", country: "USA" },
  { id: "LAX", name: "Los Angeles Intl", code: "LAX", city: "Los Angeles", country: "USA" },
  { id: "SFO", name: "San Francisco Intl", code: "SFO", city: "San Francisco", country: "USA" },
  { id: "DXB", name: "Dubai Intl", code: "DXB", city: "Dubai", country: "UAE" },
  { id: "HND", name: "Tokyo Haneda", code: "HND", city: "Tokyo", country: "Japan" },
  // add more mocks as needed
];

export default function AirportSearch() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // memoized filtered results for instant search (no API)
  const filtered = useMemo(() => {
    if (!keyword.trim()) return [];
    const k = keyword.trim().toLowerCase();
    return mockAirports.filter(
      (a) =>
        a.name.toLowerCase().includes(k) ||
        a.code.toLowerCase().includes(k) ||
        (a.city && a.city.toLowerCase().includes(k)) ||
        (a.country && a.country.toLowerCase().includes(k))
    );
  }, [keyword]);

  const performSearch = () => {
    // simulate small loading delay so UX similar to network request
    setLoading(true);
    setTimeout(() => {
      setResults(filtered);
      setLoading(false);
    }, 300);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    // optional: live-search (uncomment next 2 lines to update live)
    // setLoading(true);
    // setTimeout(() => { setResults(filtered); setLoading(false); }, 200);
  };

  return (
    <Box>
      <TextField
        label="Enter airport keyword, city or IATA code"
        value={keyword}
        onChange={handleKeywordChange}
        fullWidth
        margin="normal"
        placeholder="e.g. London, LHR, New York"
      />

      <Button
        variant="contained"
        onClick={performSearch}
        disabled={loading || !keyword.trim()}
        sx={{ mt: 1 }}
      >
        {loading ? <CircularProgress size={22} /> : "Search Airports"}
      </Button>

      <Box mt={2}>
        {results.length === 0 && !loading ? (
          <Typography color="text.secondary">No results — try another keyword.</Typography>
        ) : null}

        <List>
          {results.map((airport) => (
            <ListItem key={airport.id}>
              <ListItemText
                primary={`${airport.name} (${airport.code})`}
                secondary={`${airport.city || ""} ${airport.country ? "• " + airport.country : ""}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

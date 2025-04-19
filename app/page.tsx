"use client";

import { useState } from "react";
import valid from "@/lib/valid";
import shortenURL from "@/lib/shortenURL";
import Header from "@/components/Header";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);

    if (!(await valid(url))) {
      setError("Invalid URL");
      return;
    }
    try {
      await shortenURL(url, alias); //shorten it
      setShortUrl(`https://mp-5-eosin-zeta.vercel.app/${alias}`); //set it
    } catch (err: unknown) {
        setError("alias already exists");
      }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: 'lightcyan',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: '10vw',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          URL Shortener
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: 'white',
            width: "70%",
            borderRadius: 1.2, //round corners 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: '1vw'
          }}
        >
          <Typography variant="h5">Shorten a URL</Typography>
          <Typography variant="body1">shorten long urls into compact ones!</Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TextField
            label="URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)} 
            sx={{width: '80%'}}
          />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TextField
            label="Alias"
            variant="outlined"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            sx={{width: '80%'}}
          />
          </Box>

          <Button type="submit" variant="contained">
            Shorten URL
          </Button>

          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}

          {shortUrl && (
            <Typography variant="body1">
              <a href={shortUrl}>{shortUrl}</a>
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

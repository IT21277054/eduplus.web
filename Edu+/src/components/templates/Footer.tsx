import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#102C57',
        color: 'white',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body5"
              color="inherit"
              align="center"
              sx={{ fontSize: 20 }}
            >
              <p>
                &copy; {new Date().getFullYear()} EduPlus. All rights reserved.
              </p>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Link href="#" color="inherit">
                  <FacebookIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <TwitterIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <InstagramIcon />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="inherit" align="center">
              {`${new Date().getFullYear()} | Courses | Video Streaming`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

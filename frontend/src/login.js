import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    document.title = "LOGIN"
  }, []);

  return (
    <Box
      component="main"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Container maxWidth="sm">
        <form>
          <Box>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Sign in
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Sign in on the internal platform
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                size="large"
                variant="contained"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                size="large"
                variant="contained"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default Login;

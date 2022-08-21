import { Box, Button, Container, Grid, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({login}) => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState(
    {
      user_id: "",
      user_pw: "",
      username: "",
    }
  );

  const postSignUp = () => {
    axios.post(process.env.REACT_APP_API_SIGN_UP, signUpInfo, { withCredentials: true })
    .then((response) => {
      if (response.data.results) {
        alert("회원가입이 정상적으로 완료되었습니다.");
        setIsSignUp(false);
      }
    });
  };

  useEffect(() => {
    document.title = "LOGIN"
  }, []);

  if (window.localStorage.getItem("isLogin") === true) {
    return (
      <Navigate to="/" />
    );
  } else {
    return (
      <Box
        component="main"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Container maxWidth="sm">
          <Box
            marginBottom={2}
          >
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

          <Grid container spacing={1} marginBottom={2}>
            <Grid item xs={12}>
              <TextField
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                label="ID"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={userPW}
                onChange={(e) => setUserPW(e.target.value)}
                label="Password"
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                  setUserID("");
                  setUserPW("");
                  login(userID, userPW);
                }}
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
                onClick={() => setIsSignUp(!isSignUp)}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>

          {isSignUp &&
            <Grid container spacing={1} mt={3}>
              <Grid item xs={12}>
                <TextField
                  value={signUpInfo.user_id}
                  onChange={(e) => setSignUpInfo(prevState => ({...prevState, user_id: e.target.value}))}
                  label="ID"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={signUpInfo.user_pw}
                  onChange={(e) => setSignUpInfo(prevState => ({...prevState, user_pw: e.target.value}))}
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={signUpInfo.user_name}
                  onChange={(e) => setSignUpInfo(prevState => ({...prevState, username: e.target.value}))}
                  label="User name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  fullWidth
                  onClick={postSignUp}
                >
                  Done!
                </Button>
              </Grid>
            </Grid>
          }
        </Container>
      </Box>
    );
  }
};

export default Login;

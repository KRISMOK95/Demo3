import React from 'react';
import { Box, Button, Card, CardContent, TextField, ThemeProvider, Grid, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import useForm from '../hooks/useForm'; 
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'

const theme = createTheme({
  palette: {
    ochre: {
      main: '#fb6f92',
      light: '#E9DB5D',
      dark: '#ffc2d1',
      contrastText: '#ffe5ec',
    },
  },
});


const getFreshModel = () => ({
  name: '',
  email: ''
});


export default function Login() {

  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate()

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(getFreshModel);


  const login = e => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then(res => {
          if (res.data.participantId) {
            setContext(prevContext => ({
              ...prevContext,
              participantId: res.data.participantId
            }));
            navigate('/quiz');
          } else {
            // Handle the case where participantId is missing or invalid
            console.error('Invalid participant ID received');
          }
        })
        .catch(err => {
          console.error('Login error:', err);
        });
    }
  };
  


  const validate = () => {
    let temp = {};
    temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name !== "" ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === "");
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3}>
          <Card sx={{ mx: 'auto', width: '100%' }}>
            <CardContent>
              <Typography
                variant='h2'
                sx={{ my: 5, fontWeight: 'bold', textAlign: 'center', color: theme => theme.palette.ochre.main }}
              >
                Quiz App
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete='off'
                onSubmit={login}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& .MuiTextField-root': { mb: 2, width: '100%' },
                  '& .MuiButton-root': { width: '100%' }
                }}
              >
                <TextField
                  label="Name"
                  name='name'
                  value={values.name}
                  onChange={handleInputChange}
                  variant='outlined'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  label="Email"
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleInputChange}
                  variant='outlined'
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="ochre"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

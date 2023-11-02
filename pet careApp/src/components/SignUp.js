import { useEffect, useState } from 'react';
import axios from "axios"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
const SignUp = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })



    const handleLogin = () => {
        navigate("/login")
    }
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        // const { name, value } = e.target

        setData((data) => ({
            ...data, [name]: value
        }))

    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.username === "" || data.email === "" || data.password === "") {
            Swal.fire("Please enter all fields");
            return;
        }
        try {
            const { username, email, password } = data
            const PostData = await axios.post("http://localhost:8888/user/register", {

                username: data.username,
                email: data.email,
                password: data.password

            })

            if (PostData) {
                console.log("data...", PostData?.data.users.email)

                Swal.fire("User Registered Successfully")
                navigate("/login")

            } else if (PostData?.data.users.email === email && PostData?.data.users.password === password) {
                Swal.fire("User Already exists")

            }
        }
        catch (err) {
            console.log(err)
        }


    }





    return (
        <>
            <Container component="main" maxWidth="xs" className="shadow 10px 10px 20px #ccc">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            placeholder='Enter Username here'
                            onChange={handleChange}
                            value={data.username}
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete=""
                            autoFocus
                        />
                        <TextField
                            placeholder='Enter email here'
                            margin="normal"
                            value={data.email}
                            onChange={handleChange}

                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            value={data.password}
                            onChange={handleChange}

                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Button
                            fullWidth
                            sx={{ mt: 2, mb: 2, fontWeight: 600 }}
                            onClick={handleLogin}
                        >
                            already registered? please login
                        </Button>

                    </Box>
                </Box>
            </Container>
            {/* <ToastContainer /> */}
        </>

    );

}
export default SignUp
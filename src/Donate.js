import './Donate.css';
import { useForm } from 'react-hook-form';
import React,{ useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Link, Button, TextField, Box, useTheme, Typography, Checkbox, Avatar, FormControlLabel, CssBaseline, Container, InputAdornment, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

let donationsScheme = yup.object().shape({
    name: yup
        .string("רק מחרוזת")
        .required(" שדה חובה ")
        .min(5, " קצר מדי "),
    endowment: yup
        .string(" מקסימום 20 תווים ")
        .max(40, " ארוך מדי "),
    amount: yup
        .number(" רק מספרים ")
        .typeError(" שדה חובה ")
        .min(18, " מינימום תרומה:  18 שח "),
});

const Donate = (props) => {

    const [isHidden, setIsHidden] = useState(true);
    const [creditCardNumber, setCreditCardNumber] = useState('');

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };

    const theme = useTheme();
    let { register, handleSubmit, reset, formState: { errors, isValid } } =
        useForm({
            mode: "all", defaultValues: { name: "" },
            resolver: yupResolver(donationsScheme),
        });

    const saveDetails = (data) => {
        data.time = new Date()
        props.setDonationsArr([...props.donationsArr, data]);
        props.setCompaignDetails((prevState) => ({
            ...prevState,
            numberOfDonors: String(parseInt(prevState.numberOfDonors) + 1),
            donationSum: String(parseInt(prevState.donationSum) + data.amount),
            donationPercentage: String(parseInt(prevState.donationPercentage) + (data.amount / props.compaignDetails.targetAmount) * 100)
        }));

        if (props.coin === "דולר") {
            data.amount = Number(data.amount) * props.exchangeRate;
        }
        setCreditCardNumber("");
        reset();
    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(saveDetails)} >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{
                        borderStyle: 'solid',
                        borderRadius: "3%",
                        borderColor: theme.palette.primary.contrastText,
                        marginBottom: "3%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: "3%"
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main, width: "15%", height: "7.5vh" }}>
                            <VolunteerActivismIcon style={{ fontSize: 32 }} />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ color: theme.palette.primary.contrastText }}>תרומה</Typography>
                        <Box sx={{ mt: 3, direction: 'rtl' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="fullName"
                                        required
                                        fullWidth
                                        autoFocus
                                        label="שם פרטי ומשפחה"
                                        type="text"{...register("name")}
                                    />
                                    {errors.name && (<div className='error-message'><span>{errors.name.message}</span></div>)}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="הקדשה"
                                        type="text"{...register("endowment")}
                                        autoComplete="family-name"
                                        name="endowment"
                                    />
                                    {errors.endowment && (<div className='error-message'><span >{errors.endowment.message}</span></div>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        label="הכנס סכום"
                                        type="number"{...register("amount")}
                                        placeholder="מינימום תרומה 18 ₪"
                                    />
                                    {errors.amount && (<div className='error-message'><span>{errors.amount.message}</span></div>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="אימייל"
                                        name="email"
                                        autoComplete="email"
                                        InputLabelProps={{
                                            sx: { textAlign: 'right' },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="creditCard"
                                        type={isHidden ? "password" : "text"}
                                        label="מספר אשראי"
                                        value={creditCardNumber}
                                        onChange={(e) => setCreditCardNumber(e.target.value)}
                                        id="password"
                                        autoComplete="new-password"
                                        InputProps={{
                                            sx: { textAlign: 'right' },
                                            inputProps: {
                                                pattern: "[0-9]{16}",
                                                maxLength: 16,
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleVisibility} edge="end">
                                                        {isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" />}
                                        label="מעונינת לקבל עדכונים למייל על קמפיין זה"
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" disabled={!isValid} fullWidth >שליחה</Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        כבר יש לך חשבון? להתחבר
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </form>
    );
}

export default Donate;
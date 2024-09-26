import React from 'react';
import './compaign.css';
import { Stack, Box, CardMedia, CardContent, Card, CircularProgress, useTheme, Typography} from '@mui/material';
import Navbar from './Navbar';

const Compaign = (props) => {
  const theme = useTheme();
  return (
    <div>
      <Stack sx={{ alignItems: 'center', marginTop: "2%", marginBottom: "1%" }}>
        <Box sx={{ display: 'flex', width: "70%" }}>
          <CardMedia
            sx={{ flex: 2, borderRadius: 3, marginLeft: "2%", boxShadow: "5%", }}
            image={props.compaignDetails.compaignPicture} />
          <Card sx={{ flex: 1, borderRadius: "3%", boxShadow: 5 }} className='details'>
            <CardMedia
              sx={{ height: 130, width: 220, marginRight: 3, marginTop: 2 }}
              image='https://bhi.org.il/wp-content/uploads/2020/07/cropped-logo.png.webp' />
            <CardContent >
              <Stack spacing={2}>
                <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', }}>
                  <CircularProgress
                    variant="determinate"
                    size={100}
                    value={props.compaignDetails.donationPercentage < 100 ? props.compaignDetails.donationPercentage : 100}
                    sx={{ strokeLinecap: 'round' }} />
                  <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >
                    <Typography variant="caption" component="div" color="text.secondary" sx={{ fontSize: 15, fontWeight: "bold" }}>
                      {`${props.compaignDetails.donationPercentage}%`}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Typography className='compaignDetails' sx={{ fontSize: 30, color: theme.palette.primary.main, letterSpacing: "3px" }} >
                {props.coin === "שקל" ? `${(props.compaignDetails.donationSum / 1).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₪` : `${(props.compaignDetails.donationSum / props.exchangeRate).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $`}
              </Typography>
              <Typography className='compaignDetails' sx={{ fontSize: 20 }}>
                יעד {props.coin === "שקל" ? `${(props.compaignDetails.targetAmount / 1).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₪` : `${(props.compaignDetails.targetAmount / props.exchangeRate).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $`}
              </Typography>
              <Typography className='compaignDetails'>
                {props.compaignDetails.numberOfDonors} תורמים
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>
      <Box height={"13vh"}>
        <Navbar changeCoin={props.changeCoin} coin={props.coin} />
      </Box>
    </div>
  );
};

export default Compaign;
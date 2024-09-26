import React from 'react';
import './donation.css';
import { dateDifference } from './funcDateDiffrence';
import { useTheme,CardMedia ,Typography,CardContent,Card} from '@mui/material';

const Donation = (props) => {
  const theme = useTheme();
  return (
    <Card sx={{ height: 250 }}>
      <CardContent sx={{ padding: 0 }} className='CardContent '>
        <CardMedia sx={{ width: "100%", bgcolor: theme.palette.primary.contrastText, marginBottom: 5 }} >
          <Typography sx={{ fontSize: 30, color: 'white' }} component="div">
            {props.name}
          </Typography>
        </CardMedia>
        <Typography sx={{ fontSize: 30, color: theme.palette.primary.main, fontWeight: "bold" }} color="text.primary" >
          {
            props.loading ? 'טוען...' : props.coin === 'שקל' ? `${((props.amount).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₪` :
              `${((Number(props.amount) / props.exchangeRate).toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $`
          }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {props.endowment}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <p>{dateDifference(props)} מביצוע התרומה</p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Donation;

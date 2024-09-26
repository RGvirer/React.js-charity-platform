import { ColorModeContext } from './toggleColorMode'
import Compaign from './Compaign';
import DonationsList from './DonationsList';
import Donate from './Donate';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import { Stack, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';

function App() {
  let [coin, setCoin] = useState("שקל");
  function changeCoin() {
    setCoin(coin === "שקל" ? "דולר" : "שקל");
  }

  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiKey = '69c4d1df24f04d93cb3cc521';
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/ILS`);
        const exchangeRate = response.data.conversion_rate;
        setExchangeRate(exchangeRate);
        setLoading(false);
      }
      catch (error) {
        setExchangeRate(3.6)
        console.error('Error fetching exchange rate:', error.message);
        setLoading(false);
      }
    };
    fetchExchangeRate();
  }, []);

  const donationSums = 8130
  const targetAmounts = 10000;
  const [compaignDetails, setCompaignDetails] = useState({
    compaignPicture: 'https://cafe-in.co.il/wp-content/uploads/2019/09/%D7%9E%D7%99%D7%AA%D7%95%D7%92-%D7%91%D7%99%D7%AA-%D7%94%D7%AA%D7%91%D7%A9%D7%99%D7%9C3.jpg',
    donationSum: donationSums.toFixed(0),
    targetAmount: targetAmounts,
    donationPercentage: ((donationSums / targetAmounts) * 100).toFixed(0),
    numberOfDonors: "10"
  });

  let [donationsArr, setDonationsArr] = useState([
    {
      name: 'נטלי',
      endowment: 'תמיד איתכם',
      amount: 800,
      time: new Date(2023, 10, 10, 12, 35, 33),
    },
    {
      name: 'רבקי גבירר',
      endowment: 'הקב"ה יעזור',
      amount: 230,
      time: new Date(2023, 10, 10, 12, 35, 33),
    },
    {
      name: 'שלוה רוז',
      endowment: 'אין עליכם!!!',
      amount: 1000,
      time: new Date(2023, 10, 10, 12, 35, 33),
    },
    {
      name: 'שיינדי',
      endowment: 'בו"ה',
      amount: 1200,
      time: new Date(2023, 10, 8, 12, 35, 33),
    },
    {
      name: 'אילת',
      endowment: 'תהיו בריאים תמיד',
      amount: 180,
      time: new Date(2023, 10, 10, 12, 35, 33),
    },
    {
      name: 'חיה',
      endowment: 'הצלחות',
      amount: 200,
      time: new Date(2023, 11, 5, 12, 35, 33),
    },
    {
      name: 'בעילום שם ',
      endowment: 'מעריכים',
      amount: 500,
      time: new Date(2023, 12, 22, 12, 35, 33),
    },
    {
      name: 'ברכה הופמן',
      endowment: 'לאהובים ביותר',
      amount: 1000,
      time: new Date(2023, 10, 21, 11, 5, 29),
    },
    {
      name: 'דקלה',
      endowment: 'לאהובים ביותר',
      amount: 820,
      time: new Date(2023, 10, 21, 11, 5, 29),
    },
    {
      name: 'דסי וייס',
      endowment: '',
      amount: 2200,
      time: new Date(2023, 10, 21, 11, 5, 29),
    },

    {
      name: 'צילה יוסף',
      endowment: 'לאהובים ביותר',
      amount: 1000,
      time: new Date(2023, 11, 9, 11, 5, 29),
    },
    {
      name: 'מרים',
      endowment: 'לאהובים ביותר',
      amount: 820,
      time: new Date(2023, 11, 7, 11, 5, 29),
    },
    {
      name: 'יעל',
      endowment: '',
      amount: 2200,
      time: new Date(2023, 11, 12, 11, 5, 29),
    },
  ]);

  const [mode, setMode] = React.useState('light');
  const [state, setState] = React.useState('חשוך')
  const colorMode = React.useMemo(() => ({
    ToggleColorMode: () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        return newMode;
      });
      setState((prevState) => {
        const newState = prevState === 'מואר' ? 'חשוך' : 'מואר';
        return newState;
      })
    },
  }), []);

  const theme = React.useMemo(() => createTheme({
    typography: {
      fontFamily: ['"Segoe UI"']
    },
    palette: {
      primary: {
        main: '#fb8c00',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#37474f',
      },
      p: '#ffeb3b',
      mode, state
    },
  }), [mode], [state]);
  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Stack sx={{ width: "100%", color: theme.palette.text.primary, bgcolor: theme.palette.background.default ,direction: 'rtl'}} spacing={2}>
          <BrowserRouter >
            <Compaign compaignDetails={compaignDetails} setCompaignDetails={setCompaignDetails}
              changeCoin={changeCoin} coin={coin} exchangeRate={exchangeRate}
            />
            <Routes>
              <Route path='donationList' element={<DonationsList donationsArr={donationsArr}
                loading={loading} exchangeRate={exchangeRate} coin={coin} setCoin={setCoin}
              />} />
              <Route path='donate' element={
                <Donate donationsArr={donationsArr} setDonationsArr={setDonationsArr}
                  compaignDetails={compaignDetails} setCompaignDetails={setCompaignDetails}
                />} />
              <Route path='/' element={<DonationsList donationsArr={donationsArr}
                loading={loading} exchangeRate={exchangeRate} coin={coin} setCoin={setCoin}
              />} />
            </Routes>
          </BrowserRouter>
        </Stack>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;

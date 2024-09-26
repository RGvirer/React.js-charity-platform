import React, { useState } from 'react';
import Donation from './Donation';
import { Box, FormControl, useTheme, Autocomplete, TextField} from '@mui/material';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
export const ColorModeContext = React.createContext({ ToggleColorMode: () => { } });

const DonationsList = (props) => {
  let arr = props.donationsArr;
  const options = ['גבוה', 'עדכני', 'ישן'];
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  let [inputValue, setInputValue] = useState(options[1]);
  useEffect(() => { toSortList() }, [inputValue]);;
  const [sortArr, setSortArr] = useState([...arr]);
  function toSortList() {
    let temp = [...arr];
    if (inputValue !== "") {
      if (inputValue === options[0])// מהגדול לקטן גובה התרומה
        temp.sort((a, b) => b.amount - a.amount);
      else if (inputValue === options[1])//חדש
        temp.sort((a, b) => b.time - a.time);
      else//ישן
        temp.sort((a, b) => a.time - b.time);
      setSortArr(temp)
    }
  }
  let arr1 = inputValue !== "" ? sortArr : arr;
  let [search, setSearch] = useState(null);

  const theme = useTheme();
  return (
    <div>
      <Box>
        <FormControl sx={{ width:"9%"}}>
          <Autocomplete
            renderInput={(params) => <TextField {...params} />}
            placeholder="Controllable"
            sortArr={sortArr}
            defaultValue={options[2]}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {setInputValue(newInputValue);}}
            options={options}
            sx={{marginBottom: 3, marginRight: "5%"  }}
          />
        </FormControl>
        <FormControl sx={{width:"14.5%"}}>
          <inputTypeSearch />
          <TextField
            type='search'
            onChange={(e) => { setSearch(e.target.value) }}
            placeholder="חיפוש"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { direction: 'rtl', border: theme.palette.primary.contrastText ,marginRight: "5%" }
            }}
          />
        </FormControl>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
        {search !== null && arr1.filter((item) => {
          return (item.name.startsWith(search) || item.name === search || item.endowment.startsWith(search) || item.endowment === search)
        }).map((donation, index) => {
          return <div className="cards-container" key={index}>
            <Donation coin={props.coin} loading={props.loading} exchangeRate={props.exchangeRate}
              key={index}
              name={donation.name}
              endowment={donation.endowment}
              amount={donation.amount}
              time={donation.time}
            /></div>
        })}
        {search === null && arr1.map((donation, index) => {
          return <div className="cards-container" key={index}>
            <Donation coin={props.coin} loading={props.loading} exchangeRate={props.exchangeRate}
              key={index}
              name={donation.name}
              endowment={donation.endowment}
              amount={donation.amount}
              time={donation.time}
            /></div>
        })}

      </Box>
    </div >
  );

};

export default DonationsList;

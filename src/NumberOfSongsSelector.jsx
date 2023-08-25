import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function NumberOfSongsSelector({ value, onChange }) {
  return (
    <FormControl 
      variant="outlined" 
      sx={{
        minWidth: 120,
        backgroundColor: 'transparent',
        color: '#f5f5f5',
        borderColor: '#f5f5f5',
        marginBottom: '15px',
      }}
    >
      <InputLabel 
        sx={{
          color: '#f5f5f5',
          "&.Mui-focused": {
            color: '#f5f5f5',
          }
        }}
      >
        Number of Songs
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Number of Songs"
        sx={{
          '&:before': {
            borderColor: '#f5f5f5',
          },
          '&:after': {
            borderColor: '#f5f5f5',
          },
          icon: {
            fill: '#f5f5f5',
          },
        }}
      >
        {[10, 20, 30, 40, 50].map(num => (
          <MenuItem 
            key={num} 
            value={num} 
            sx={{
              color: '#f5f5f5',
              backgroundColor: '#2c2c2c',
              '&:hover': {
                backgroundColor: '#4a4a4a',
              }
            }}
          >
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default NumberOfSongsSelector;

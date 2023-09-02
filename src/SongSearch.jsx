import React, { useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import apiService from './apiService';

export default function SongSearch({ onSelect }) {
  const [songInput, setSongInput] = useState('');
  const [songOptions, setSongOptions] = useState([]);

  const handleInputChange = async (event, value) => {
    setSongInput(value);
    if (value.length > 2) {
      const songs = await apiService.searchSongs(value);
      setSongOptions(songs.songs || []);
    }
  };

  return (
    <div>
      <Autocomplete
        options={songOptions}
        getOptionLabel={(option) => `${option.name} by ${option.artists[0].name}`}
        onInputChange={handleInputChange}
        onChange={(event, newValue) => onSelect(newValue)}
        renderInput={(params) => <TextField {...params} label="Search for songs" />}
      />
    </div>
  );
}

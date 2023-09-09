import React, {useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';
import apiService from '../../services/apiService.jsx';

export default function SongSearch({inputValue, onInputChange, selectedSong, onSelectSong}) {
  const [songOptions, setSongOptions] = useState([]);

  const handleInputChange = async (event, value) => {
      onInputChange(value); // Inform the parent of the input change
    if (value.length > 2) {
      const songs = await apiService.searchSongs(value);
      setSongOptions(songs.songs || []);
    }
  };

  return (
    <div>
      <Autocomplete
          value={selectedSong}
          inputValue={inputValue}
        options={songOptions}
        getOptionLabel={(option) => `${option.name} by ${option.artists[0].name}`}
        onInputChange={handleInputChange}
          onChange={(event, newValue) => onSelectSong(newValue)}
        renderInput={(params) => <TextField {...params} label="Search for songs" />}
      />
    </div>
  );
}

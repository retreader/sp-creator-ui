import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Button } from '@mui/material';
import apiService from './apiService';

function ArtistSearch({ onSelect }) {
  const [artistInput, setArtistInput] = useState('');
  const [artistOptions, setArtistOptions] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const handleInputChange = async (event, value) => {
    setArtistInput(value);
    if (value.length > 2) {
      const artists = await apiService.searchArtists(value);
      setArtistOptions(artists.artists || []);
    }
  };

  const handleAddArtist = (event, newValue) => {
    if (newValue) {
      setSelectedArtists(prevArtists => [...prevArtists, newValue]);
      setArtistInput('');
    }
  };

  const handleDeleteArtist = (artistToDelete) => {
    setSelectedArtists(prevArtists => prevArtists.filter(artist => artist.id !== artistToDelete.id));
  };

  return (
    <div style={{ padding: '10px' }}>
      <Autocomplete
        options={artistOptions}
        getOptionLabel={(option) => option.name}
        onInputChange={handleInputChange}
        onChange={handleAddArtist}
         style={{ width: '300px', marginBottom: '10px' }} // Adjusting the width
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for artists"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'red',
                borderColor: '#b71c1c',
              },
            }}
            InputLabelProps={{
              style: {
                color: '#b71c1c',
              },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          <ul style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'red' }}>{children}</ul>
        )}
      />
      <div style={{ marginBottom: '10px' }}>
        {selectedArtists.map(artist => (
          <Chip
            key={artist.id}
            label={artist.name}
            onDelete={() => handleDeleteArtist(artist)}
            style={{ margin: '5px', backgroundColor: '#212121', color: 'white', borderColor: '#b71c1c' }}
          />
        ))}
      </div>
      <Button variant="contained" style={{ backgroundColor: '#b71c1c', color: 'white', marginBottom: '10px' }} onClick={() => onSelect(selectedArtists)}>
        Next
      </Button>
    </div>
  );
}

export default ArtistSearch;

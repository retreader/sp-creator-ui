import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete, Chip } from '@mui/material';
import NumberOfSongsSelector from './NumberOfSongsSelector';
import apiService from './apiService';

function ArtistSearch({ onSelect }) {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [numSongs, setNumSongs] = useState(10); // Default to 10 songs

  const handleSearchChange = async (event, newValue) => {
  try {
    const fetchedArtists = await apiService.searchArtists(event.target.value);
    setSuggestions(Array.isArray(fetchedArtists?.artists) ? fetchedArtists.artists : []);
  } catch (error) {
    console.error("Error fetching artist suggestions:", error);
    setSuggestions([]); // Ensure it's an array even in case of an error
  }
};

  const handleArtistSelection = (event, newValue) => {
    setSelectedArtists(newValue);
  };

  const handleSearch = () => {
    const artistIds = selectedArtists.map(artist => artist.name);
    onSelect(artistIds, numSongs);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="artist-search"
        options={suggestions}
        getOptionLabel={(option) => option.name}
        onInputChange={handleSearchChange}
        onChange={handleArtistSelection}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search for Artists"
            placeholder="Start typing..."
          />
        )}
      />

      <Box mt={2}>
        <NumberOfSongsSelector value={numSongs} onChange={(e) => setNumSongs(e.target.value)} />
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch} 
        style={{ marginTop: '20px' }}
        disabled={selectedArtists.length === 0} // Disable button if no artist is selected
      >
        Search
      </Button>
    </div>
  );
}

export default ArtistSearch;

import React, {useEffect, useState} from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup} from '@mui/material';
import apiService from '../../services/apiService.jsx';

function GenreSelector({ onSelect }) {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({});

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genres = await apiService.getAvailableGenres();
        setAvailableGenres(genres);
        const initialSelected = genres.reduce((acc, genre) => {
          acc[genre] = false;
          return acc;
        }, {});
        setSelectedGenres(initialSelected);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenres({ ...selectedGenres, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    const selected = Object.keys(selectedGenres).filter(genre => selectedGenres[genre]);
    onSelect(selected);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup>
          {availableGenres.map(genre => (
            <FormControlLabel
              key={genre}
              control={
                <Checkbox
                  checked={selectedGenres[genre] || false}
                  onChange={handleGenreChange}
                  name={genre}
                />
              }
              label={genre}
            />
          ))}
        </FormGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Select Genres
        </Button>
      </FormControl>
    </div>
  );
}

export default GenreSelector;
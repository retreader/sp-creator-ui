import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedArtists } from '../../store/actions/actions';
import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import NumberOfSongsSelector from '../NumberOfSongsSelector/NumberOfSongsSelector.jsx';
import apiService from '../../services/apiService.jsx';

function ArtistSearch() {
    const dispatch = useDispatch();
    const selectedArtists = useSelector(state => state.selectedArtists);
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
        dispatch(setSelectedArtists(newValue));
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
        </div>
    );
}

export default ArtistSearch;

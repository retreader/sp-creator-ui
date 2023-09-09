import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Chip, TextField} from '@mui/material';
import NumberOfSongsSelector from '../NumberOfSongsSelector/NumberOfSongsSelector.jsx';
import apiService from '../../services/apiService.jsx';

function ArtistSearch({value, onSelect}) {
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [numSongs, setNumSongs] = useState(10); // Default to 10 songs

    useEffect(() => {
        const artistNames = selectedArtists.map(artist => artist.name);
        onSelect(artistNames);
    }, [selectedArtists]);

    useEffect(() => {
        onSelect(null, numSongs)
    }, [numSongs])

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
                        <Chip variant="outlined" label={option.name} {...getTagProps({index})} />
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
                <NumberOfSongsSelector value={numSongs} onChange={(e) => setNumSongs(e.target.value)}/>
            </Box>
        </div>
    );
}

export default ArtistSearch;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSong } from '../../store/actions/actions';
import { Autocomplete, TextField } from '@mui/material';
import apiService from '../../services/apiService.jsx';

function SongSearch() {
    const dispatch = useDispatch();
    const selectedSong = useSelector(state => state.selectedSong);
    const [songOptions, setSongOptions] = useState([]);

    const handleInputChange = async (event, value) => {
        if (value.length > 2) {
            const songs = await apiService.searchSongs(value);
            setSongOptions(songs.songs || []);
        }
    };

    return (
        <div>
            <Autocomplete
                value={selectedSong}
                options={songOptions}
                getOptionLabel={(option) => `${option.name} by ${option.artists[0].name}`}
                onInputChange={handleInputChange}
                onChange={(event, newValue) => dispatch(setSelectedSong(newValue))}
                renderInput={(params) => <TextField {...params} label="Search for songs" />}
            />
        </div>
    );
}

export default SongSearch;

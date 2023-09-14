import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setArtistGenderPreference } from '../../store/actions/actions';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ArtistGenderPreference() {
    const dispatch = useDispatch();
    const selectedGender = useSelector(state => state.artistGenderPreference);
    const genders = ['Male', 'Female', 'Non-Binary', 'Any'];

    const handleChange = (event) => {
        dispatch(setArtistGenderPreference(event.target.value));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Artist Gender Preference</InputLabel>
            <Select value={selectedGender} onChange={handleChange}>
                {genders.map(gender => (
                    <MenuItem key={gender} value={gender}>
                        {gender}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default ArtistGenderPreference;

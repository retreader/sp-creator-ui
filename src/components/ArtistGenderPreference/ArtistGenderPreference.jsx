import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function ArtistGenderPreference({value: selectedGender, onSelect}) {
    const genders = ['Male', 'Female', 'Non-Binary', 'Any'];

    const handleChange = (event) => {
        onSelect(event.target.value);
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

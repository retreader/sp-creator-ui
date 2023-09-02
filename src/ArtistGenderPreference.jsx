import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

function ArtistGenderPreference({ onSelect }) {
  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#333', color: '#fff', borderRadius: '10px' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{ color: '#fff' }}>Artist Gender Preference</FormLabel>
        <RadioGroup value={gender} onChange={handleChange} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
          <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
          <FormControlLabel value="any" control={<Radio color="primary" />} label="Any" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" color="primary" onClick={() => onSelect(gender)} style={{ marginTop: '20px' }}>
        Set Preference
      </Button>
    </div>
  );
}

export default ArtistGenderPreference;
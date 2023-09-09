import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function ActivitySelector({value: selectedActivity, onSelect}) {
    const activities = [
        'Running', 'Yoga', 'Meditation', 'Driving', 'Studying', 'Reading',
        'Dancing', 'Cooking', 'Cleaning', 'Working Out', 'Traveling',
        'Hiking', 'Cycling', 'Swimming', 'Shopping'
    ];

    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Activity</InputLabel>
            <Select value={selectedActivity} onChange={handleChange}>
                {activities.map(activity => (
                    <MenuItem key={activity} value={activity}>
                        {activity}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default ActivitySelector;

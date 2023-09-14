import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedActivities } from '../../store/actions/actions';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function ActivitySelector() {
    const dispatch = useDispatch();
    const selectedActivity = useSelector(state => state.selectedActivities);
    const activities = [
        'Running', 'Yoga', 'Meditation', 'Driving', 'Studying', 'Reading',
        'Dancing', 'Cooking', 'Cleaning', 'Working Out', 'Traveling',
        'Hiking', 'Cycling', 'Swimming', 'Shopping'
    ];

    const handleChange = (event) => {
        dispatch(setSelectedActivities(event.target.value));
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Activity</InputLabel>
            <Select value={selectedActivity || ''} onChange={handleChange}>
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

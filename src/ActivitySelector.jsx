import React from 'react';
import Button from '@mui/material/Button';

const activities = [
  'Running', 'Yoga', 'Meditation', 'Driving', 'Studying', 'Reading', 'Dancing', 'Cooking', 'Cleaning', 'Working Out', 'Traveling', 'Hiking', 'Cycling', 'Swimming', 'Shopping'
];


function ActivitySelector({ onSelect }) {
  return (
    <div style={{ padding: '10px' }}>
      <h2>Select an Activity</h2>
      {activities.map(activity => (
        <Button variant="contained" color="primary" key={activity} onClick={() => onSelect(activity)} style={{ margin: '5px', backgroundColor: '#212121', color: 'white' }}>
          {activity}
        </Button>
      ))}
    </div>
  );
}

export default ActivitySelector;

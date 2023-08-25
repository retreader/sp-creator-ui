import React, { useState } from 'react';
import { Button, Chip } from '@mui/material';


const moods = [
  'Happy', 'Sad', 'Energetic', 'Relaxed', 'Romantic', 'Angry', 'Chill', 'Motivated', 'Sleepy', 'Focused', 'Stressed', 'Excited', 'Nostalgic', 'Confident', 'Adventurous'
];

function MoodSelector({ onSelect }) {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const toggleMood = (mood) => {
    setSelectedMoods(prevMoods => 
      prevMoods.includes(mood) ? prevMoods.filter(m => m !== mood) : [...prevMoods, mood]
    );
  };

  return (
    <div style={{ padding: '10px' }}>
      {moods.map(mood => (
        <Chip
          key={mood}
          label={mood}
          clickable
          color={selectedMoods.includes(mood) ? "primary" : "default"}
          onClick={() => toggleMood(mood)}
        />
      ))}
      <Button variant="contained" onClick={() => onSelect(selectedMoods)} style={{ margin: '5px', backgroundColor: '#212121', color: 'white' }}>
        Next
      </Button>
    </div>
  );
}

export default MoodSelector;

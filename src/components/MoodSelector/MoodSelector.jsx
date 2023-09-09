import {Box, Chip} from "@mui/material";

function MoodSelector({value: selectedMoods, onSelect}) {
    const moodsWithOposite = {
        'Happy': ['Sad', 'Angry', 'Stressed'],
        'Sad': ['Happy', 'Energetic', 'Motivated', 'Excited', 'Confident', 'Adventurous'],
        'Energetic': ['Sad', 'Relaxed', 'Chill', 'Sleepy'],
        'Relaxed': ['Energetic', 'Stressed'],
        'Romantic': ['Angry'],
        'Angry': ['Romantic', 'Sad', 'Chill'],
        'Chill': ['Angry', 'Energetic', 'Stressed', 'Excited'],
        'Motivated': ['Sleepy', 'Relaxed'],
        'Sleepy': ['Energetic', 'Excited'],
        'Focused': ['Relaxed'],
        'Stressed': ['Relaxed', 'Chill'],
        'Excited': ['Stressed', 'Sad'],
        'Nostalgic': ['Angru'],
        'Confident': ['Sad', 'Sleepy'],
        'Adventurous': ['Stressed', 'Sad', 'Angry']
    };

    const handleChipClick = (mood) => {
        let newSelected;
        if (selectedMoods.includes(mood)) {
            newSelected = selectedMoods.filter(m => m !== mood);
        } else {
            newSelected = [...selectedMoods, mood];

            // If the mood has an opposite, remove it from the selection
            if (moodsWithOposite[mood].length > 0) {
                newSelected = newSelected.filter(m => !moodsWithOposite[mood].includes(m));
            }
        }
        onSelect(newSelected);
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={1}>
            {Object.keys(moodsWithOposite).map(mood => (
                <Chip
                    key={mood}
                    label={mood}
                    clickable
                    color={selectedMoods.includes(mood) ? "primary" : "default"}
                    onClick={() => handleChipClick(mood)}
                />
            ))}
        </Box>
    );
}

export default MoodSelector;

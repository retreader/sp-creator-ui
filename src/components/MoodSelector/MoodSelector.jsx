import {Box, Chip} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMoods } from '../../store/actions/actions';

function MoodSelector() {
    const dispatch = useDispatch();
    const selectedMoods = useSelector(state => state.selectedMoods);
    const moodsWithOpposite = {
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
        if (selectedMoods.includes(mood)) {
            dispatch(setSelectedMoods(selectedMoods.filter(m => m !== mood)));
        } else {
            dispatch(setSelectedMoods([...selectedMoods, mood]));
        }
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={1}>
            {Object.keys(moodsWithOpposite).map(mood => (
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

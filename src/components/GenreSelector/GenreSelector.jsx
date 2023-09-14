import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGenres } from '../../store/actions/actions';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import apiService from '../../services/apiService.jsx';

function GenreSelector() {
    const dispatch = useDispatch();
    const selectedGenres = useSelector(state => state.selectedGenres);
    const [availableGenres, setAvailableGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const genres = await apiService.getAvailableGenres();
                setAvailableGenres(genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        }

        fetchGenres();
    }, []);

    const handleGenreChange = (event) => {
        if (event.target.checked) {
            dispatch(setSelectedGenres([...selectedGenres, event.target.name]));
        } else {
            dispatch(setSelectedGenres(selectedGenres.filter(genre => genre !== event.target.name)));
        }
    };

    const handleSubmit = () => {
        dispatch(setSelectedGenres(selectedGenres));
    };

    return (
        <div>
            <FormControl component="fieldset">
                <FormGroup>
                    {availableGenres.map(genre => (
                        <FormControlLabel
                            key={genre}
                            control={
                                <Checkbox
                                    checked={selectedGenres.includes(genre)}
                                    onChange={handleGenreChange}
                                    name={genre}
                                />
                            }
                            label={genre}
                        />
                    ))}
                </FormGroup>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Select Genres
                </Button>
            </FormControl>
        </div>
    );
}

export default GenreSelector;

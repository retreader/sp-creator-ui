import React, {useState} from 'react';
import * as yup from 'yup';
import {Alert, Backdrop, Box, Button, CircularProgress, Container, Grid, Modal, Typography} from '@mui/material';
import ActivitySelector from './components/ActivitySelector/ActivitySelector.jsx';
import MoodSelector from './components/MoodSelector/MoodSelector.jsx';
import ArtistSearch from './components/ArtistSearch/ArtistSearch.jsx';
import ArtistGenderPreference from './components/ArtistGenderPreference/ArtistGenderPreference.jsx';
import SongTable from './components/SongTable/SongTable.jsx';
import SpotifyLoginButton from './components/SpotifyLogin/SpotifyLogin.jsx';
import apiService from "./services/apiService.jsx";

const validationSchema = yup.object().shape({
    selectedMoods: yup.array().min(1, 'Please select at least one mood.'),
    selectedActivities: yup.string().min(1, 'Please select at least one activity.'),
    selectedArtists: yup.array().min(1, 'Please select at least one artist.'),
    artistGenderPreference: yup.string().required('Please select an artist gender preference.'), // selectedGenres: yup.array().min(1, 'Please select at least one genre.')
});

function App() {
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [numSongs, setNumSongs] = useState(10);
    const [artistGenderPreference, setArtistGenderPreference] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState({songs: []});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateSelections = async () => {
        try {
            await validationSchema.validate({
                selectedMoods, selectedActivities, selectedArtists, artistGenderPreference, selectedGenres
            });
            setErrorMessage('');
            return true;
        } catch (error) {
            setErrorMessage(error.message);
            return false;
        }
    };

    const fetchSongSelections = async () => {
        if (!await validateSelections()) return;

        setLoading(true);
        const data = {
            moods: selectedMoods,
            activities: selectedActivities,
            artists: selectedArtists,
            genderPreference: artistGenderPreference,
            genres: selectedGenres,
            songCount: numSongs
        };
        const songResults = await apiService.searchSongs(data);
        setSelectedSongs(songResults);
        setLoading(false);
    };

    const resetWorkflow = () => {
        setSelectedMoods([]);
        setSelectedActivities([]);
        setSelectedArtists([]);
        setArtistGenderPreference('');
        setSelectedGenres([]);
        setSelectedSongs({songs: []});
        setIsModalOpen(false);
    };

    const handleSongSelectionConfirmation = (newSongs) => {
        setSelectedSongs(newSongs)
        setIsModalOpen(true)
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} direction="column">
                {selectedSongs.songs.length > 0 ? (
                    <Grid item xs={12}>
                        <SongTable
                            value={selectedSongs.songs}
                            songs={selectedSongs.songs}
                            onPlaylistCreated={setIsModalOpen}
                            selectedSongs={selectedSongs}
                        />
                    </Grid>
                ) : (
                    <>
                        <Grid item>
                            <SpotifyLoginButton/>
                        </Grid>

                        <Grid item>
                            <ActivitySelector value={selectedActivities} onSelect={setSelectedActivities}/>
                        </Grid>

                        <Grid item>
                            <MoodSelector value={selectedMoods} onSelect={setSelectedMoods}/>
                        </Grid>

                        <Grid item>
                            <ArtistSearch value={selectedArtists} onSelect={(artists, numSongs) => {
                                artists && setSelectedArtists(artists);
                                numSongs && setNumSongs(numSongs);
                            }}/>
                        </Grid>

                        <Grid item>
                            <ArtistGenderPreference value={artistGenderPreference}
                                                    onSelect={setArtistGenderPreference}/>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" onClick={fetchSongSelections}>
                                Fetch Songs
                            </Button>
                        </Grid>
                    </>
                )}

                <Grid item xs={12}>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </Grid>
            </Grid>

            <Backdrop open={loading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Modal
                open={isModalOpen}
                onClose={resetWorkflow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Playlist Created Successfully!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Your playlist has been created. Would you like to start a new workflow?
                    </Typography>
                    <Button variant="contained" color="primary" onClick={resetWorkflow} sx={{mt: 3}}>
                        Start New Workflow
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import { CircularProgress, Modal, Box, Typography, Button } from '@mui/material';
import ActivitySelector from './ActivitySelector';
import MoodSelector from './MoodSelector';
import ArtistSearch from './ArtistSearch';
import ArtistGenderPreference from './ArtistGenderPreference';
import GenreSelector from './GenreSelector';
import SongTable from './SongTable';
import apiService from './apiService';
import SpotifyLoginButton from './SpotifyLogin';

function App() {
  const [step, setStep] = useState(1);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [numSongs, setNumSongs] = useState(10); // Default to 10 songs
  const [artistGenderPreference, setArtistGenderPreference] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [songSelections, setSongSelections] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]); // Added this line
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const resetWorkflow = () => {
    setStep(1);
    setSelectedMoods([]);
    setSelectedActivities([]);
    setSelectedArtists([]);
    setArtistGenderPreference('');
    setSelectedGenres([]);
    setSongSelections([]);
    setSelectedSongs([]);
    setIsModalOpen(false);
};

  useEffect(() => {
    const fetchSongSelections = async () => {
      if (step === 5) {
        const data = {
          moods: selectedMoods,
          activities: selectedActivities,
          artists: selectedArtists,
          genderPreference: artistGenderPreference,
          genres: selectedGenres,
          songCount: numSongs
        };
        const songResults = await apiService.searchSongs(data);
        setSongSelections(songResults);
      }
    };
    fetchSongSelections();
  }, [step]);

  return (
    <div>
      <SpotifyLoginButton />
      {step === 1 && <ActivitySelector onSelect={activity => { setSelectedActivities(activity); setStep(2); }} />}
      {step === 2 && <MoodSelector onSelect={mood => { setSelectedMoods(mood); setStep(3); }} />}
      {step === 3 && <ArtistSearch onSelect={(artists, numSongs) => { setSelectedArtists(artists); setNumSongs(numSongs); setStep(4); }} />}
      {step === 4 && <ArtistGenderPreference onSelect={gender => { setArtistGenderPreference(gender); setStep(5); }} />}
      {step === 5 && 
        <SongTable 
    songs={songSelections} 
    onSelect={setSelectedSongs} 
    onPlaylistCreated={setIsModalOpen} 
    selectedSongs={selectedSongs}
/>
      }
      {loading && <CircularProgress />}
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your playlist has been created. Would you like to start a new workflow?
        </Typography>
        <Button variant="contained" color="primary" onClick={resetWorkflow} sx={{ mt: 3 }}>
            Start New Workflow
        </Button>
    </Box>
</Modal>
    </div>
  );
}

export default App;
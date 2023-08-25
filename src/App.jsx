import React, { useState } from 'react';
import ArtistSearch from './ArtistSearch';
import SongTable from './SongTable';
import ActivitySelector from './ActivitySelector';
import MoodSelector from './MoodSelector';
import apiService from './apiService';
import { Button, TextField, List, ListItem, ListItemText, CircularProgress, Container, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import NumberOfSongsSelector from './NumberOfSongsSelector'

function MainComponent() {
  const [step, setStep] = useState(1);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false); // New state for loading
  const [songCount, setSongCount] = useState(10);  // Default to 10 songs

  const handleActivitySelect = (activities) => {
    setSelectedActivities(activities);
    setStep(2);
  };

  const handleMoodSelect = (moods) => {
    setSelectedMoods(moods);
    setStep(3);
  };

  const handleArtistSelect = async (artists) => {
    setLoading(true)
    const results = await apiService.searchSongs({
      moods: selectedMoods, 
      activities: selectedActivities,
      artists,
      songCount
    });
    setSearchResults(results.songs);
    setLoading(false)
    setStep(4);
  };

  const handleSongSelect = (songs) => {
    setSelectedSongs([...selectedSongs, ...songs]);
  };

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const createPlaylistOnSpotify = async () => {
    const songIds = selectedSongs.map(song => song.id);
    const data = {
      song_ids: songIds,
      name: playlistName || 'My Custom Playlist'  // Default name if none provided
    };
    setLoading(true)
    await apiService.createPlaylist(data);
    setLoading(false)
    alert('Playlist created on Spotify!');
  };

  const restartWorkflow = () => {
    setStep(1);
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={apiService.handleLogin}>
  Login with Spotify
</Button>
      <Box display="flex" flexDirection="column" alignItems="center" paddingY={4}>
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1000 }}>
          <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
      )}
      {step === 1 && <ActivitySelector onSelect={handleActivitySelect} />}
      {step === 2 && <MoodSelector onSelect={handleMoodSelect} />}
      {step === 3 && (
      <div>
        <NumberOfSongsSelector value={songCount} onChange={(e) => setSongCount(e.target.value)} />
        <ArtistSearch onSelect={handleArtistSelect} />
      </div>
        ) }
      {step === 4 && (
        <>
          <SongTable songs={searchResults} onSelect={handleSongSelect} selectedSongs={selectedSongs} />
          <TextField
            label="Playlist Name"
            variant="outlined"
            value={playlistName}
            onChange={handlePlaylistNameChange}
          />
          <Button variant="contained" color="primary" style={{
    boxShadow: '0 3px 5px 2px rgba(183, 28, 28, .3)',
    border: '1px solid #b71c1c',
  }} onClick={createPlaylistOnSpotify}>
            Create Playlist on Spotify
          </Button>
          <Button variant="contained" color="secondary"  style={{
    boxShadow: '0 3px 5px 2px rgba(183, 28, 28, .3)',
    border: '1px solid #b71c1c',
  }} 
  onClick={restartWorkflow}>
            Add more songs
          </Button>
          <List>
            {selectedSongs.map(song => (
              <ListItem key={song.id}>
                <ListItemText primary={song.name} secondary={song.artists[0].name} />
              </ListItem>
            ))}
          </List>
        </>
      )}
        </Box>
    </Container>
  );
}

export default MainComponent;

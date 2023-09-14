import React, {useState} from 'react';
import {Alert, Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSongs } from '../../store/actions/actions';

import apiService from '../../services/apiService.jsx';

function SongTable() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    const selectedSongs = useSelector(state => state.selectedSongs);
    const [playlistName, setPlaylistName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isSongSelected = (songId) => selectedSongs.includes(songId);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            dispatch(setSelectedSongs(songs.map((song) => song.id)));
        } else {
            dispatch(setSelectedSongs([]));
        }
    };

    const handleClick = (songId) => {
        if (isSongSelected(songId)) {
            dispatch(setSelectedSongs((prevSelected) => prevSelected.filter((id) => id !== songId)));
        } else {
            dispatch(setSelectedSongs((prevSelected) => [...prevSelected, songId]));
        }
    };

    const handleCreatePlaylist = async () => {
        if (!playlistName.trim() || selectedSongs.length === 0) {
            setErrorMessage('Please provide a playlist name and select at least one song.');
            return;
        }

        const playlistData = {
            name: playlistName,
            songs: selectedSongs
        };
        const success = await apiService.createPlaylist(playlistData);
        if (success) {
            onPlaylistCreated(true);
        }
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selectedSongs.length > 0 && selectedSongs.length < songs.length}
                                checked={songs.length > 0 && selectedSongs.length === songs.length}
                                onChange={handleSelectAllClick}
                            />
                        </TableCell>
                        <TableCell>Track</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell>Album Cover</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((song) => (
                        <TableRow key={song.id} onClick={() => handleClick(song.id)}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={isSongSelected(song.id)}/>
                            </TableCell>
                            <TableCell>{song.name}</TableCell>
                            <TableCell>{song.artists[0].name}</TableCell>
                            <TableCell>
                                <img src={song.album.images[0].url} alt={song.name} width="50" height="50"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TextField
                label="Playlist Name"
                variant="outlined"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                style={{marginBottom: '20px'}}
            />
            <Button variant="contained" color="secondary" onClick={handleCreatePlaylist} style={{marginLeft: '10px'}}>
                Create Playlist
            </Button>
            {errorMessage && <Alert severity="error" style={{marginTop: '10px'}}>{errorMessage}</Alert>}
        </div>
    );
}

SongTable.defaultProps = {
    onSelect: () => {
    },
    onPlaylistCreated: () => {
    },
    songs: [],
};

export default SongTable;

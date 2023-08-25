import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button, Box } from '@mui/material';

function SongTable({ songs, onSelect, selectedSongs }) {
  const [selected, setSelected] = useState([]);

  const isSongSelected = (songId) => selected.includes(songId);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = songs.map((song) => song.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, songId) => {
    const selectedIndex = selected.indexOf(songId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, songId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleConfirmSelection = () => {
    const songsToSelect = songs.filter(song => selected.includes(song.id));
    onSelect(songsToSelect);
  };

  return (
    <div>
      {/* Song Selection Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < songs.length}
                checked={songs.length > 0 && selected.length === songs.length}
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
            <TableRow key={song.id} onClick={(event) => handleClick(event, song.id)}>
              <TableCell padding="checkbox">
                <Checkbox checked={isSongSelected(song.id)} />
              </TableCell>
              <TableCell>{song.name}</TableCell>
              <TableCell>{song.artists[0].name}</TableCell>
              <TableCell>
                <img src={song.album.images[0].url} alt={song.name} width="50" height="50" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleConfirmSelection}>
        Confirm Selection
      </Button>

      {/* Summary of Selected Songs */}
      <Box mt={4} mb={2} fontWeight="bold">
        Selected Songs:
      </Box>
      <Box 
        style={{
          maxHeight: '150px', 
          overflowY: 'auto', 
          padding: '10px', 
          border: '1px solid #ccc', 
          borderRadius: '5px',
          background: '#f5f5f5'
        }}
      >
        {selectedSongs.map(song => (
          <Box key={song.id} display="flex" alignItems="center" mb={1}>
            <Box flexGrow={1} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {song.name} - {song.artists[0]?.name || ''}
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default SongTable;

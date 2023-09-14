// src/redux/actions.js

// Actions for selectedMoods
export const setSelectedMoods = (moods) => ({
  type: 'SET_SELECTED_MOODS',
  payload: moods
});

// Actions for selectedActivities
export const setSelectedActivities = (activities) => ({
  type: 'SET_SELECTED_ACTIVITIES',
  payload: activities
});

// Actions for selectedArtists
export const setSelectedArtists = (artists) => ({
  type: 'SET_SELECTED_ARTISTS',
  payload: artists
});

// Actions for artistGenderPreference
export const setArtistGenderPreference = (genderPreference) => ({
  type: 'SET_ARTIST_GENDER_PREFERENCE',
  payload: genderPreference
});

// Actions for selectedGenres
export const setSelectedGenres = (genres) => ({
  type: 'SET_SELECTED_GENRES',
  payload: genres
});

// Actions for selectedSongs
export const setSelectedSongs = (songs) => ({
  type: 'SET_SELECTED_SONGS',
  payload: songs
});

// Actions for isModalOpen
export const setIsModalOpen = (isOpen) => ({
  type: 'SET_IS_MODAL_OPEN',
  payload: isOpen
});

// Actions for loading
export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading
});

// Actions for resetWorkflow
export const resetWorkflow = () => ({
  type: 'RESET_WORKFLOW'
});

export const setErrorMessage = (message) => ({
    type: 'SET_ERROR_MESSAGE',
    payload: message
});

export const clearErrorMessage = () => ({
    type: 'CLEAR_ERROR_MESSAGE'
});

export const setIsLoggedIn = (status) => ({
    type: 'SET_IS_LOGGED_IN',
    payload: status
});

export const setNumSongs = (number) => ({
    type: 'SET_NUM_SONGS',
    payload: number
});
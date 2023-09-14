import { combineReducers } from 'redux';
import selectedMoodsReducer from './selectedMoods';
import selectedActivitiesReducer from './selectedActivities';
import selectedArtistsReducer from './selectedArtists';
import artistGenderPreferenceReducer from './artistGenderPreference';
import selectedGenresReducer from './selectedGenres';
import songSelectionsReducer from './songSelection';
import selectedSongsReducer from './selectedSongs';
import isLoggedInReducer from "./setIsLoggedIn.js";
import modal from './modal.js';
import numSongsReducer from "./numSongs.js";
import loadingReducer from "./loading.js";

const rootReducer = combineReducers({
  selectedMoods: selectedMoodsReducer,
  selectedActivities: selectedActivitiesReducer,
  selectedArtists: selectedArtistsReducer,
  artistGenderPreference: artistGenderPreferenceReducer,
  selectedGenres: selectedGenresReducer,
  songSelections: songSelectionsReducer,
  selectedSongs: selectedSongsReducer,
  isLoggedIn: isLoggedInReducer,
  numSongs: numSongsReducer,
  modal: modal,
  loading: loadingReducer
});

export default rootReducer;

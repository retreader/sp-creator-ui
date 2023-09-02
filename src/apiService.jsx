import { BASE_URL } from './constants';  // Assuming you have a constants file or you can directly define the BASE_URL here

const apiService = {
  async searchArtists(query) {
    try {
      const response = await fetch(`${BASE_URL}/search-artists?query=${query}`, {
        credentials: 'include'  // Include credentials
      });
      return await response.json();
    } catch (error) {
      console.error("Error searching artists:", error);
      return [];
    }
  },

  async searchSongs(data) {
    try {
      const response = await fetch(`${BASE_URL}/search-songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'  // Include credentials
      });
      const jsonResponse = await response.json()
      return jsonResponse;
    } catch (error) {
      console.error("Error searching songs:", error);
      return [];
    }
  },

  async createPlaylist(data) {
    try {
      const response = await fetch(`${BASE_URL}/create-playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'  // Include credentials
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating playlist:", error);
      return null;
    }
  },

  async handleLogin() {
    window.location.href = `${BASE_URL}/login`;
  },

  async isLoggedIn() {
    try {
      const response = await fetch(`${BASE_URL}/is-logged-in`, {
        credentials: 'include'  // Include credentials
      });
      return (await response.json()).isLoggedIn;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  },

async getAvailableGenres(access_token) {
  try {
    const response = await fetch(`${BASE_URL}/available-genres`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      credentials: 'include'  // This ensures cookies are sent with the request
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching available genres:", error);
    return [];
  }
},
};



export default apiService;
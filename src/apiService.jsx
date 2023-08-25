const BASE_URL = 'https://python-dextroamphetam1.replit.app';  // Update this if your Flask server URL changes

const apiService = {
  async searchArtists(query) {
    try {
      const response = await fetch(`${BASE_URL}/search-artists?query=${query}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error("Error searching songs:", error);
      return [];
    }
  },

  async createPlaylist(data) {
    try {
      const response = await fetch(`${BASE_URL}/create-playlist`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating playlist:", error);
      return null;
    }
  },

  handleLogin() {
    window.location.href = `${BASE_URL}/login`;
  },

  async isLoggedIn() {
    try {
      const response = await fetch(`${BASE_URL}/is-logged-in`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.isLoggedIn;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  }
};

export default apiService;

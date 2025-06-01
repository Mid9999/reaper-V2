module.exports = {
  name: 'robloxUtils',
  description: 'Utility functions for Roblox related tasks.',
  // Add more utility functions as needed.
  // Example: Fetching Roblox user data.
  getUserInfo: async (userId) => {
    try {
      const response = await fetch(`https://api.roblox.com/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  }
};

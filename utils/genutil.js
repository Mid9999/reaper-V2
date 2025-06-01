const robloxUtils = {
    /**
     * Fetches Roblox user data by username.
     * @param {string} username - The Roblox username.
     * @returns {Promise<object|null>} - A promise that resolves with the user data or null if not found.
     */
    getUserDataByUsername: async (username) => {
        try {
            const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching Roblox user data:", error);
            return null;
        }
    },

    /**
     * Fetches Roblox user data by user ID.
     * @param {number} userId - The Roblox user ID.
     * @returns {Promise<object|null>} - A promise that resolves with the user data or null if not found.
     */
    getUserDataById: async (userId) => {
        try {
            const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching Roblox user data:", error);
            return null;
        }
    },

    /**
     *  Gets the roblox profile url from user id
     * @param {number} userId - The roblox user ID
     * @returns {string} - The roblox profile URL
     */
    getProfileURL: (userId) => {
        return `https://www.roblox.com/users/${userId}/profile`
    }
};

module.exports = robloxUtils;

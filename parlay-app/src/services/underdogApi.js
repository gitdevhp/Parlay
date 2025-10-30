// Note: You'll need to replace these with your actual Underdog API credentials
const UNDERDOG_API_KEY = 'YOUR_UNDERDOG_API_KEY';
const UNDERDOG_BASE_URL = 'https://api.underdogfantasy.com/v1';

export const underdogApi = {
    // Get all available props
    getProps: async () => {
        try {
            const response = await fetch(`${UNDERDOG_BASE_URL}/props`, {
                headers: {
                    'Authorization': `Bearer ${UNDERDOG_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Underdog props:', error);
            throw error;
        }
    },

    // Get specific player props
    getPlayerProps: async (playerId) => {
        try {
            const response = await fetch(`${UNDERDOG_BASE_URL}/players/${playerId}/props`, {
                headers: {
                    'Authorization': `Bearer ${UNDERDOG_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Underdog player props:', error);
            throw error;
        }
    },

    // Get parlay options
    getParlayOptions: async () => {
        try {
            const response = await fetch(`${UNDERDOG_BASE_URL}/parlay-options`, {
                headers: {
                    'Authorization': `Bearer ${UNDERDOG_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Underdog parlay options:', error);
            throw error;
        }
    }
};
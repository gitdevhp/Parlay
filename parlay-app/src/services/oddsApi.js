// Documentation: https://the-odds-api.com/
const API_KEY = import.meta.env.VITE_ODDS_API_KEY;
const BASE_URL = 'https://api.the-odds-api.com/v4';

export const oddsApi = {
    // Get player props
    getPlayerProps: async (sport = 'basketball_nba') => {
        try {
            const response = await fetch(
                `${BASE_URL}/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=player_props`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching odds:', error);
            throw error;
        }
    },

    // Get specific game odds
    getGameOdds: async (gameId, sport = 'basketball_nba') => {
        try {
            const response = await fetch(
                `${BASE_URL}/sports/${sport}/odds/${gameId}?apiKey=${API_KEY}&regions=us`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game odds:', error);
            throw error;
        }
    },

    // Get all available sports
    getSports: async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/sports/?apiKey=${API_KEY}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching sports:', error);
            throw error;
        }
    },

    // Get betting markets (types of bets available)
    getMarkets: async (sport = 'basketball_nba') => {
        try {
            const response = await fetch(
                `${BASE_URL}/sports/${sport}/markets/?apiKey=${API_KEY}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching markets:', error);
            throw error;
        }
    }
};
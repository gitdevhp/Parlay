// ESPN API endpoints
const ESPN_BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports';

export const espnApi = {
    // Get player stats
    getPlayerStats: async (playerId) => {
        try {
            const response = await fetch(`${ESPN_BASE_URL}/basketball/nba/athletes/${playerId}/stats`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching ESPN player stats:', error);
            throw error;
        }
    },

    // Get player game logs
    getPlayerGameLogs: async (playerId) => {
        try {
            const response = await fetch(`${ESPN_BASE_URL}/basketball/nba/athletes/${playerId}/gamelog`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching ESPN game logs:', error);
            throw error;
        }
    },

    // Search for players
    searchPlayers: async (query) => {
        try {
            const response = await fetch(`${ESPN_BASE_URL}/basketball/nba/athletes?search=${query}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching ESPN players:', error);
            throw error;
        }
    },

    // Get team schedule
    getTeamSchedule: async (teamId) => {
        try {
            const response = await fetch(`${ESPN_BASE_URL}/basketball/nba/teams/${teamId}/schedule`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching team schedule:', error);
            throw error;
        }
    }
};
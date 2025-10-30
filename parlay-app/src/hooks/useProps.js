import { useState, useEffect } from 'react';
import { oddsApi } from '../services/oddsApi';
import { propsCache } from '../utils/propsCache';

export const useProps = (sport = 'nba') => {
    const [props, setProps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProps = async () => {
            const cacheKey = `props-${sport}`;
            let data = propsCache.get(cacheKey);

            if (!data) {
                try {
                    setLoading(true);
                    data = await oddsApi.getPlayerProps(sport);
                    propsCache.set(cacheKey, data);
                } catch (err) {
                    setError(err.message);
                    console.error('Error fetching props:', err);
                } finally {
                    setLoading(false);
                }
            }

            setProps(data || []);
        };

        fetchProps();
        // Refresh data every 5 minutes
        const interval = setInterval(fetchProps, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [sport]);

    return { props, loading, error };
};

export const useGameOdds = (sport = 'nba') => {
    const [odds, setOdds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOdds = async () => {
            const cacheKey = `odds-${sport}`;
            let data = propsCache.get(cacheKey);

            if (!data) {
                try {
                    setLoading(true);
                    data = await oddsApi.getGameOdds(sport);
                    propsCache.set(cacheKey, data);
                } catch (err) {
                    setError(err.message);
                    console.error('Error fetching odds:', err);
                } finally {
                    setLoading(false);
                }
            }

            setOdds(data || []);
        };

        fetchOdds();
        // Refresh data every 5 minutes
        const interval = setInterval(fetchOdds, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [sport]);

    return { odds, loading, error };
};
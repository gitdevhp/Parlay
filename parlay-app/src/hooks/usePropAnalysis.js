import { useState, useEffect } from 'react';
import { espnApi } from '../services/espnApi';
import { underdogApi } from '../services/underdogApi';
import { parlayAnalyzer } from '../utils/parlayAnalyzer';

export const usePropAnalysis = (playerId) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [parlayRecommendations, setParlayRecommendations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!playerId) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Fetch data from both APIs
                const [espnStats, underdogProps] = await Promise.all([
                    espnApi.getPlayerStats(playerId),
                    underdogApi.getPlayerProps(playerId)
                ]);

                // Analyze the props
                const propAnalysis = parlayAnalyzer.comparePropLines(espnStats, underdogProps);
                setAnalysis(propAnalysis);

                // Generate parlay recommendations
                const parlays = parlayAnalyzer.findOptimalParlays(propAnalysis);
                setParlayRecommendations(parlays);

            } catch (err) {
                setError(err.message);
                console.error('Error in prop analysis:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [playerId]);

    return {
        loading,
        error,
        analysis,
        parlayRecommendations
    };
};

export const useMultiPlayerAnalysis = (playerIds) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [combinedAnalysis, setCombinedAnalysis] = useState([]);
    const [optimalParlays, setOptimalParlays] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!playerIds?.length) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Fetch data for all players
                const analysisPromises = playerIds.map(async (id) => {
                    const [espnStats, underdogProps] = await Promise.all([
                        espnApi.getPlayerStats(id),
                        underdogApi.getPlayerProps(id)
                    ]);
                    return parlayAnalyzer.comparePropLines(espnStats, underdogProps);
                });

                const allAnalysis = await Promise.all(analysisPromises);
                const flattenedAnalysis = allAnalysis.flat();
                setCombinedAnalysis(flattenedAnalysis);

                // Find optimal parlays across all players
                const bestParlays = parlayAnalyzer.findOptimalParlays(flattenedAnalysis);
                setOptimalParlays(bestParlays);

            } catch (err) {
                setError(err.message);
                console.error('Error in multi-player analysis:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [playerIds]);

    return {
        loading,
        error,
        combinedAnalysis,
        optimalParlays
    };
};
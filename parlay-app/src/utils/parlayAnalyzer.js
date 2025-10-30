export const parlayAnalyzer = {
    // Compare prop lines between ESPN stats and Underdog
    comparePropLines: (espnStats, underdogProps) => {
        const analysis = [];
        
        for (const prop of underdogProps) {
            const espnStat = espnStats.find(stat => 
                stat.playerName === prop.playerName && 
                stat.statType === prop.statType
            );

            if (espnStat) {
                const difference = prop.line - espnStat.average;
                const recommendation = {
                    playerName: prop.playerName,
                    statType: prop.statType,
                    underdogLine: prop.line,
                    espnAverage: espnStat.average,
                    difference: difference,
                    confidence: calculateConfidence(espnStat, prop),
                    trend: analyzeTrend(espnStat.recentGames),
                    recommendation: difference > 0 ? 'UNDER' : 'OVER'
                };
                analysis.push(recommendation);
            }
        }
        
        return analysis;
    },

    // Calculate optimal parlay combinations
    findOptimalParlays: (propAnalysis, maxProps = 3) => {
        const highConfidenceProps = propAnalysis
            .filter(prop => prop.confidence >= 0.7)
            .sort((a, b) => b.confidence - a.confidence);

        const parlays = [];
        
        // Generate combinations of props
        for (let i = 2; i <= maxProps; i++) {
            const combinations = getCombinations(highConfidenceProps, i);
            for (const combo of combinations) {
                const parlayConfidence = calculateParlayConfidence(combo);
                if (parlayConfidence >= 0.6) {
                    parlays.push({
                        props: combo,
                        totalOdds: calculateTotalOdds(combo),
                        confidence: parlayConfidence,
                        risk: calculateRisk(combo)
                    });
                }
            }
        }

        return parlays.sort((a, b) => b.confidence - a.confidence);
    }
};

// Helper functions
function calculateConfidence(espnStat, underdogProp) {
    // Implement your confidence calculation logic here
    // Consider factors like:
    // - Historical accuracy
    // - Recent performance
    // - Matchup difficulty
    // - Home/Away splits
    // Return a value between 0 and 1
    return 0.75; // Placeholder
}

function analyzeTrend(recentGames) {
    if (!recentGames || recentGames.length === 0) return 'NEUTRAL';
    
    const values = recentGames.map(game => game.value);
    const trend = values.reduce((acc, val, i, arr) => {
        if (i === 0) return 0;
        return acc + (val - arr[i-1]);
    }, 0) / (values.length - 1);
    
    if (trend > 1) return 'UP';
    if (trend < -1) return 'DOWN';
    return 'NEUTRAL';
}

function getCombinations(array, size) {
    const result = [];
    
    function combine(start, combo) {
        if (combo.length === size) {
            result.push([...combo]);
            return;
        }
        
        for (let i = start; i < array.length; i++) {
            combo.push(array[i]);
            combine(i + 1, combo);
            combo.pop();
        }
    }
    
    combine(0, []);
    return result;
}

function calculateParlayConfidence(props) {
    // Calculate combined confidence of all props
    const individualConfidences = props.map(prop => prop.confidence);
    return individualConfidences.reduce((acc, conf) => acc * conf, 1);
}

function calculateTotalOdds(props) {
    // Calculate combined odds for the parlay
    const baseOdds = -110; // Standard prop betting odds
    return props.reduce((acc, prop) => acc * (baseOdds / 100 + 1), 1);
}

function calculateRisk(props) {
    // Calculate risk level based on various factors
    const factors = {
        numberOfProps: props.length * 0.2,
        averageConfidence: props.reduce((acc, prop) => acc + prop.confidence, 0) / props.length,
        trendVariability: props.some(prop => prop.trend === 'NEUTRAL') ? 0.3 : 0
    };
    
    const riskScore = 1 - (factors.averageConfidence - factors.numberOfProps - factors.trendVariability);
    
    if (riskScore > 0.7) return 'HIGH';
    if (riskScore > 0.4) return 'MEDIUM';
    return 'LOW';
}
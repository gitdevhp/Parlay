const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class PropsCache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        // Check if cache is still valid
        if (Date.now() - cached.timestamp > CACHE_DURATION) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.value;
    }

    clear() {
        this.cache.clear();
    }
}

export const propsCache = new PropsCache();
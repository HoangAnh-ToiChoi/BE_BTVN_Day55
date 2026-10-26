const createRateLimiter = ({ windowMS, maxRequests, message } = {}) => {
    const requestCount = new Map();

    return (req, res, next) => {
        const ip = req.ip || req.headers["x-forwarded-for"] || "unknow-ip";
        const currentTime = Date.now();
        const clientData = requestCount.get(ip);
        if (!clientData || currentTime - clientData.windowStart > windowMS) {
            requestCount.set(ip, {
                count: 1,
                windowStart: currentTime,
            });
            return next();
        }
        clientData.count += 1;

        if (clientData.count > maxRequests) {
            return res.status(429).json({ error: message });
        }

        return next();
    };
};

const apiRateLimiter = createRateLimiter({
    windowMs: 60000,
    maxRequests: 100,
    message: "Too many requests",
});

module.exports = apiRateLimiter;

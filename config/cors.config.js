const whiteList = ["http://localhost:5173", "https://hoppscotch.io"];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin) || !origin) callback(null, true);
        else
            callback(
                new Error(
                    "Bị chặn bởi CORS: Origin này không được phép truy cập",
                ),
            );
    },
    method: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    optionssusscesStatus: 200,
};

module.exports = corsOptions;

module.export = {
    response: function (res, data) {
        var data = {
            "message": "Success",
            "data": data

        };
        res.status(200).json(data);
    },
    error: function (res, error) {
        var message = error.message !== undefined && error.message.length > 0 ? error.message : "Something went wrong try again later";
        var statusCode = error.statusCode !== undefined && error.statusCode.length > 0 ? error.statusCode : 500;
        var stack = error.stack !== undefined && error.stack.length > 0 ? error.stack : "Request_Failed";
        var data = {
            "message": message,
            "status": statusCode,
            "stack": stack
        };
        res.status(statusCode).json(data);
    }
}
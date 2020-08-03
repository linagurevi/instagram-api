
function destPath(path) {
    return function (req, res, next){
        req.type = path;
        next();
    }
}

module.exports = destPath;
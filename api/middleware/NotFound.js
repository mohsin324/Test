const notFound = (req, res, next) => {
    return res.status(404).json({
        message: 'failure',
        description: `no route found with this URL: ${req.url}`
    });
}
module.exports = notFound
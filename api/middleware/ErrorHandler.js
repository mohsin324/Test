const GlobalError = (err, req, res, next) => {
    console.log(`inside global error`);
    return res.status(500).json({
        message: 'failure',
        description: err.message
    });
}
module.exports = GlobalError
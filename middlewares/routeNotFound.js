module.exports = function (req, res, next) {

    res.format({
        json: () => {
            res.status(404).json({
                message: "questa pagina non esiste"
            });
        },
        default: () => {
            res.status(404).send("<h1>questa pagina non esiste</h1>");
        },
    })
}
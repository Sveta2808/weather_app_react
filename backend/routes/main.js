// routing main/

module.exports = function (app){
    app.get('/', (req, res) => {
        res.end ('main')
    })

}
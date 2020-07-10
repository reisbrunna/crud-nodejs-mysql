const http = require('http') ;
const express = require('express') ;
const status = require('http-status');
const sequelize = require('./src/database/database');
const app = express();
const routes = require('./src/routes/routes');

//inicializa a aplicação
app.use(express.json());

//URL base do sistema
app.use('/sistema', routes);

//tratamento de erros
app.use((req, res, next) => {
    res.status.apply(status.NOT_FOUND).send("Page not found");
});

app.use((req, res, next) => {
    res.status.apply(status.INTERNAL_SERVER_ERROR).json({error});
});

//sincroniza o sequelize
sequelize.sync({force: false}).then ( () => {
    const port = 3003;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port);
});
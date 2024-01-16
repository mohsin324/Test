require('dotenv').config();
const app = require('./index');
const port = process.env.PORT || 3000;
const dbConnection =require('./api/DB/Connection');


try{
    dbConnection
    .then(()=> {
        app.listen(port, () => {
            console.log(`server listen at port: ${port}`);
        });
    })
    .catch(err => console.log(err))
}catch(err){
    console.log(`${err}`);
}







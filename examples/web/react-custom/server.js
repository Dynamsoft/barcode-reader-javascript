const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const imgserver = express();
// imgserver.post('/upload',(req,res)=>{
//     res.send("get it!");
// })

app.prepare()
    .then(() => {
        const server = express();
        // server.get('/p/:id', (req, res) => {
        //     const actualPage = '/post';
        //     const queryParams = { title: req.params.id };
        //     app.render(req, res, actualPage, queryParams);
        // });
        
        server.get('*', (req, res) => {
            console.log(req.params);
            //res.send("return something here");
            return handle(req, res);
        });

        
        
        server.listen(2048, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:2048');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });


const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const React = require('react');
// const renderToString = require('react-dom/server');
// const Layout = require('./pages/components/Layout');

app.prepare()
    .then(() => {
        // import React from 'react';
        // import {renderToString} from 'react-dom/server';
        // import Layout from './pages/components/Layout';

        const server = express();
        //const router = express().router();
        //server.use( "/test",express.static( path.resolve( __dirname ) ) );
        server.get('/p/:id', (req, res) => {
            const actualPage = '/post';
            const queryParams = { title: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });
        
        server.get('*', (req, res) => {
            console.log(req.params);
            //res.send("return something here");
            return handle(req, res);
        });
        
        // router.get("/test",(req,res)=>{
        //     const jsx = (<Layout />);
        //     const reactDom = renderToString(jsx);
        
        //     res.writeHead(200,{"Content-Type":"text/html"});
        //     res.send(htmlTemplate(reactDom));
        // })

        server.listen(2048, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:2048');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });


function htmlTemplate(reactDom){
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>React SSR</title>
                <script src="https://www.keillion.site/dbr.wasm.cdn/dbr.min.js"
                data-productKeys="t0068MgAAAHlndUYSpB+Y7ZCO9+UgVclFHIMhGxLfSzAObE6EZS4bUPogB/w8AmBM3lIw94h+joK5NmjSJWH/8286uzcbmhE="></script>         */}
                <script src="../static/jquery-3.2.1.min.js" ></script> 
                <script src="../static/mbc-2.1.3.min.js" ></script>
            </head>

            <body>
                <div id="root">${reactDom}</div>
                <script src="static/mbc-2.1.3.min.js"></script>
                <script src="https://www.keillion.site/dbr.wasm.cdn/dbr.min.js"  data-productKeys="t0068MgAAAHlndUYSpB+Y7ZCO9+UgVclFHIMhGxLfSzAObE6EZS4bUPogB/w8AmBM3lIw94h+joK5NmjSJWH/8286uzcbmhE="></script>        
            </body>
        </html>
    `;
}
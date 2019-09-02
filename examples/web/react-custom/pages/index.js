import React from 'react';
import Layout from './components/Layout';
import Head from 'next/head';

class Index extends React.Component{
   

    render(){
        //const {scriptNeeded} = this.props;
        return(
            <>
            <Head>
                <title>ssr</title>
                <script src="https://www.keillion.site/dbr.wasm.cdn/dbr.min.js"
                data-productKeys="t0068MgAAAHlndUYSpB+Y7ZCO9+UgVclFHIMhGxLfSzAObE6EZS4bUPogB/w8AmBM3lIw94h+joK5NmjSJWH/8286uzcbmhE="></script>         */}
                <script src="../static/jquery-3.2.1.min.js" ></script> 
                <script src="../static/mbc-2.1.3.min.js" ></script>
            </Head>
            <Layout></Layout>
            </>
        )
        
    }
}

export default Index
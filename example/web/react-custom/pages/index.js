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
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
                <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="" data-licensekey="t0090YgAAALaZg2oLytA41dBJRYswJQMgs/OPAggh7pzHmTuW0e8x9goxvDtPZyGzIJW2m2lNyD0oqOriINyTOitQUXIZQSeVOGpiH0iRSiz6GKS8mOgA/gGj3Bhv"
                data-productKeys="t0068NQAAALhbbdvegAj/8hQqGKHFHmvo5SQT/q/1QY8D1E3ImoTsios2fPGNhZY11L2gTZRN02KwGJjtjDl//qDnoRmprTY="></script>
                <script src="../static/jquery-3.2.1.min.js" ></script> 
                <script src="../static/mbc-2.1.3.min.js" ></script>
            </Head>
            <Layout></Layout>
            </>
        )
        
    }
}

export default Index
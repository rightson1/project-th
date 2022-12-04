import Head from 'next/head'

function Header({ title, desc }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name='description' content={desc} />
        </Head>


    )
}

export default Header
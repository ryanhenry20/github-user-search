import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import { GithubProvider } from '../context/context';
import './global.css';

const MyApp = ({ Component, pageProps }) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Github User Search</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<GithubProvider>
				<Component {...pageProps} />
			</GithubProvider>
		</>
	);
};

export default MyApp;

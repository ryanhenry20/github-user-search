import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mockRepo from './mockData/mockRepo';

axios.defaults.baseURL = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [readmeContent, setReadmeContent] = useState('');
	const [followers, setFollowers] = useState([]);
	//request loading
	const [requests, setRequests] = useState(0);

	const searchGithubUser = async (user) => {
		const response = await axios
			.get(`users/${user}`)
			.catch((err) => console.log(err));

		console.log(response);
		if (response) {
			setGithubUser(response.data);
			console.log(response);
			const { followers_url, login } = response.data;

			await Promise.allSettled([
				axios.get(`/users/${login}/repos`),
				axios.get(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					const [repos, followers] = results;
					const fulfilledStatus = 'fulfilled';

					if (repos.status === fulfilledStatus) {
						setRepos(repos.value.data);
					}
					if (followers.status === fulfilledStatus) {
						setFollowers(followers.value.data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			getRemainingRequests();
			console.log('no such user');
		}
	};
	//nfn named function
	const getRemainingRequests = () => {
		axios
			.get('/rate_limit')
			.then(({ data }) => {
				let { remaining } = data.rate;
				setRequests(remaining);
				console.log('getRemainingRequests', remaining);
				if (remaining == 0) {
					//throw error
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getReadmeContent = async (name, repo) => {
		// const response = await axios.get(
		// 	`https://raw.githubusercontent.com/ryanhenry20/exam-ajaib-software-engineer/main/README.md`
		// );
		const responseRepos = await axios.get(
			`https://api.github.com/repos/${name}/${repo}/readme`
		);
		console.log('responseRepos', responseRepos);
		const response = await axios.get(responseRepos.data.download_url);
		setReadmeContent(response.data);
		console.log('readme Content', response);
		return response;
	};

	//add empty dependency array hence,
	// useEffect will run only once after the rendering of the page.
	// It will not re-run
	useEffect(() => getRemainingRequests());
	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				searchGithubUser,
				getReadmeContent,
				readmeContent,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubProvider, GithubContext };

import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import Link from 'next/link';
const Repos = () => {
	const { repos, githubUser } = React.useContext(GithubContext);
	return (
		<Wrapper>
			<div className="repo">
				{repos.map((repo) => {
					const { id, name, html_url, stargazers_count, forks, open_issues } =
						repo;
					return (
						<article key={id}>
							<div className="repo-info">
								<h4>
									<Link href={`/${githubUser.login}/${name}`}>{name}</Link>
								</h4>
								<div className="repo-icons"></div>
							</div>
						</article>
					);
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background: var(--clr-white);
	border-top-right-radius: var(--radius);
	border-bottom-left-radius: var(--radius);
	border-bottom-right-radius: var(--radius);
	position: relative;
	&::before {
		content: 'repos';
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-100%);
		background: var(--clr-white);
		color: var(--clr-grey-5);
		border-top-right-radius: var(--radius);
		border-top-left-radius: var(--radius);
		text-transform: capitalize;
		padding: 0.5rem 1rem 0 1rem;
		letter-spacing: var(--spacing);
		font-size: 1rem;
	}
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	.fusioncharts-container {
		width: 100% !important;
	}
	.repo {
		overflow: scroll;
		height: 260px;
		display: grid;
		grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
		gap: 1.25rem 1rem;
		padding: 1rem 2rem;
	}
	article {
		transition: var(--transition);
		padding: 0.15rem 0.5rem;
		border-radius: var(--radius);
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		column-gap: 1rem;
		img {
			height: 100%;
			width: 45px;
			border-radius: 50%;
			object-fit: cover;
		}
		h4 {
			margin-bottom: 0;
		}
		a {
			color: var(--clr-grey-5);
		}
	}

	.repo-icons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		p {
			margin-bottom: 0;
		}
	}
	.repo-info {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;

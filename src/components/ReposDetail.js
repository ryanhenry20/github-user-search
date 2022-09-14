import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import Markdown from 'react-markdown';
import * as renderers from 'react-markdown-github-renderers';
import remarkGfm from 'remark-gfm';

const ReposDetail = () => {
	const router = useRouter();
	const { repo } = router.query;
	const { readmeContent, getReadmeContent, githubUser } =
		React.useContext(GithubContext);
	console.log('repo', repo);
	console.log('githubUser', githubUser);
	useEffect(() => {
		getReadmeContent(githubUser.login, repo);
	}, [repo]);

	console.log('readmeContent', readmeContent);
	return (
		<Wrapper>
			<h3>{repo}</h3>
			<div className="markdown-container">
				<h4>Readme.md</h4>
				<div className="markdown-content">
					<Markdown
						// source={readmeContent}
						components={{
							p: ({ node, children }) => {
								if (node.children[0].tagName === 'img') {
									console.log('node', node);
									const image = node.children[0];
									return (
										<div className="image">
											<img
												src={`/images/${image.properties.src}`}
												alt={image.properties.alt}
												width="600"
												height="300"
											/>
										</div>
									);
								}
								// Return default child if it's not an image
								return <p>{children}</p>;
							},
						}}
						escapeHtml={false}
						renderers={renderers}
						remarkPlugins={[remarkGfm]}
					>
						{readmeContent}
					</Markdown>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding-top: 2rem;
	display: grid;
	gap: 1rem 2rem;
	justify-content: center;
	margin-left: 16px;
	margin-right: 16px;

	.markdown-container {
		border: 1px solid var(--clr-grey-5);
		border-radius: 10px;
	}
	.markdown-content {
		padding: 16px;
		/* overflow: scroll; */
	}
	h4 {
		text-transform: none;
		padding: 16px;
		border-bottom: 1px solid var(--clr-grey-5);
	}
	/* @media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	} */
`;

export default ReposDetail;

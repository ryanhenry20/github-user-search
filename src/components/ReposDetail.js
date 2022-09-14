import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ReposDetail = () => {
	const { readmeContent } = React.useContext(GithubContext);
	console.log('readmeContent', readmeContent);
	const markdown = `${readmeContent}`;
	return (
		<Wrapper>
			<div className="markdown-container">
				<h4>Readme.md</h4>
				<div className="markdown-content">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{readmeContent}
					</ReactMarkdown>
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

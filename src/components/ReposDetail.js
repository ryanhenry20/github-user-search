import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import * as renderes from 'react-markdown-github-renderers';
import { GithubContext } from '../context/context';

const ReposDetail = () => {
	const router = useRouter();
	const { repo } = router.query;
	const { user } = router.query;
	const { readmeContent, getReadmeContent } = React.useContext(GithubContext);

	useEffect(() => {
		getReadmeContent(user, repo);
	}, [repo, user]);

	return (
		<Wrapper>
			<h3>{repo}</h3>
			<div className="markdown-container">
				<h4>Readme.md</h4>
				<div className="markdown-content">
					<Markdown
						children={readmeContent}
						renderers={renderes}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					/>
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
		padding: 36px;
		/* overflow: scroll; */
		img {
			/* width: 10%; */
			width: inherit;
			display: inline-block;
		}
	}
	h4 {
		text-transform: none;
		padding: 36px;
		border-bottom: 1px solid var(--clr-grey-5);
	}
	/* @media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	} */
`;

export default ReposDetail;

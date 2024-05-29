import { createRoot } from 'react-dom/client';
import { StrictMode, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleCSS } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageArticleStyles, setPageArticleStyles] = useState(defaultArticleCSS);
	const articleRef = useRef<HTMLDivElement>(null);
	return (
		<div className={clsx(styles.main)} style={pageArticleStyles}>
			<ArticleParamsForm
				articleRef={articleRef}
				onChange={setPageArticleStyles}
			/>
			<div ref={articleRef}>
				<Article />
			</div>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

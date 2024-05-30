import { useRef, useState } from 'react';
import { defaultArticleCSS } from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	const [pageArticleStyles, setPageArticleStyles] = useState(defaultArticleCSS);
	const articleRef = useRef<HTMLDivElement>(null);
	return (
		<main className={styles.main} style={pageArticleStyles}>
			<ArticleParamsForm
				articleRef={articleRef}
				onChange={setPageArticleStyles}
			/>
			<div ref={articleRef}>
				<Article />
			</div>
		</main>
	);
};

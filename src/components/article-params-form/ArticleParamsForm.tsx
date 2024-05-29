import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { CSSProperties, RefObject, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'components/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleCSS,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ParameterFormType,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

export type ParamsFormType = {
	onChange: (prevState: CSSProperties) => void;
	articleRef: RefObject<HTMLDivElement>;
};

export const ArticleParamsForm = ({ articleRef, onChange }: ParamsFormType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [selectedOptions, setSelectedOptions] = useState<ParameterFormType>({
		...defaultArticleState,
	});

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				articleRef.current &&
				isOpen &&
				articleRef.current.contains(target)
			) {
				setIsOpen(!isOpen);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen]);

	const handleClickArrow = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={handleClickArrow} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Text weight={800} size={31} uppercase align={'left'}>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={selectedOptions.fontFamilyOption}
						onChange={(font) => {
							setSelectedOptions({
								...selectedOptions,
								fontFamilyOption: font,
							});
						}}
					/>
					<RadioGroup
						name={'FontSize'}
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={selectedOptions.fontSizeOption}
						onChange={(fontSizeOption) => {
							setSelectedOptions({
								...selectedOptions,
								fontSizeOption: fontSizeOption,
							});
						}}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={selectedOptions.fontColor}
						onChange={(fontColor) => {
							setSelectedOptions({
								...selectedOptions,
								fontColor: fontColor,
							});
						}}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={selectedOptions.backgroundColor}
						onChange={(backgroundColor) => {
							setSelectedOptions({
								...selectedOptions,
								backgroundColor: backgroundColor,
							});
						}}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={selectedOptions.contentWidth}
						onChange={(contentWidth) => {
							setSelectedOptions({
								...selectedOptions,
								contentWidth: contentWidth,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setSelectedOptions({
									...defaultArticleState,
								});
								onChange(defaultArticleCSS);
							}}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={() => {
								onChange({
									'--font-family': selectedOptions.fontFamilyOption.value,
									'--font-size': selectedOptions.fontSizeOption.value,
									'--font-color': selectedOptions.fontColor.value,
									'--container-width': selectedOptions.contentWidth.value,
									'--bg-color': selectedOptions.backgroundColor.value,
								} as CSSProperties);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};

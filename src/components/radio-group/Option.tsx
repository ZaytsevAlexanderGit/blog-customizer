import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const optionRef = useRef<HTMLDivElement>(null);

	const handleChange = () => onChange?.(option);

	useEnterSubmit({ onChange, option, optionRef });

	// const inputId = `${groupName}_radio_item_with_value__${value}`;
	const inputId = `radio_radio_item_with_value__${value}`;
	const isChecked = value === selected.title;

	return (
		<div
			ref={optionRef}
			className={styles.item}
			key={value}
			data-checked={isChecked}
			data-testid={inputId}
			tabIndex={0}>
			<input
				className={styles.input}
				disabled={isChecked}
				type='radio'
				checked={isChecked}
				name={groupName}
				id={inputId}
				value={value}
				onChange={handleChange}
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};

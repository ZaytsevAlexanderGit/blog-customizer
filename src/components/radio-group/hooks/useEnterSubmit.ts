import { RefObject, useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterSubmit = {
	onChange?: (option: OptionType) => void;
	option: OptionType;
	optionRef: RefObject<HTMLDivElement>;
};

export const useEnterSubmit = ({
	onChange,
	option,
	optionRef,
}: UseEnterSubmit) => {
	// const optionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const optionHtml = optionRef.current;

		if (!optionHtml) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === optionHtml && event.key === 'Enter') {
				onChange?.(option);
			}
		};

		optionHtml.addEventListener('keydown', handleEnterKeyDown);

		// не забываем удалять листенеры, при размонтировании компонента
		return () => {
			optionHtml.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onChange, option]);
};

import type { ChangeEvent, FC } from 'react';
import { StyledCheckbox } from './checkbox.styled';

interface IProps {
	label: string;
	isChecked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	name: string;
	value: string;
	disabled: boolean;
}

const Checkbox: FC<IProps> = ({
	label,
	name,
	value,
	isChecked,
	onChange,
	disabled,
}) => (
	<StyledCheckbox>
		{label}
		<input
			type='checkbox'
			name={name}
			value={value}
			checked={isChecked}
			onChange={(e) => onChange(e)}
			disabled={disabled}
		/>
		<span className='checkmark' />
	</StyledCheckbox>
);

export default Checkbox;

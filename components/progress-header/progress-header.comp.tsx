import CheckIcon from 'components/check-icon/check-icon.comp';
import type { FC } from 'react';
import { StyledProgressHeader } from './progress-header.styled';

interface IProps {
	progressNumber: number;
	title: string;
	className?: string;
	isCompleted: boolean;
}

const ProgressHeader: FC<IProps> = ({
	title,
	className,
	progressNumber,
	isCompleted,
}) => (
	<StyledProgressHeader className={className}>
		<div className='number-title'>
			<span className='progress-number'>{progressNumber}</span>
			<h2>{title}</h2>
		</div>

		{isCompleted && <CheckIcon />}
	</StyledProgressHeader>
);

export default ProgressHeader;

import CheckIcon from 'components/check-icon/check-icon.comp';
import type { FC } from 'react';
import { StyledPhaseHeader } from './phase-header.styled';

interface IProps {
	phaseNumber: number;
	title: string;
	className?: string;
	isCompleted: boolean;
}

const PhaseHeader: FC<IProps> = ({
	title,
	className,
	phaseNumber,
	isCompleted,
}) => (
	<StyledPhaseHeader className={className}>
		<div className='number-title'>
			<span className='phase-number'>{phaseNumber}</span>
			<h2>{title}</h2>
		</div>

		{isCompleted && <CheckIcon />}
	</StyledPhaseHeader>
);

export default PhaseHeader;

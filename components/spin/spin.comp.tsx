import { FC } from 'react';
import { StyledSpin } from './spin.styled';

interface IProps {
	className?: string;
}

const Spin: FC<IProps> = ({ className }) => {
	return <StyledSpin className={className} />;
};

export default Spin;

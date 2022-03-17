import type { FC } from 'react';

interface IProps {
	color?: string;
}

const CheckIcon: FC<IProps> = ({ color = '#000' }) => (
	<svg
		width='16'
		height='12'
		viewBox='0 0 16 12'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M5.525 11.657l-4.95-4.95 1.414-1.414 3.538 3.534-.002.001L14.01.343l1.414 1.414-8.485 8.486-1.413 1.413-.001.001z'
			fill={color}
		/>
	</svg>
);

export default CheckIcon;

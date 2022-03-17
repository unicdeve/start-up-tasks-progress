import styled from 'styled-components';

export const StyledProgressHeader = styled.div`
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.number-title {
		display: flex;
		align-items: center;
		gap: 1rem;

		.progress-number {
			background-color: #000;
			color: #fff;
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
			font-weight: 400;
			font-size: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		h2 {
			font-size: 1.5rem;
			font-weight: 500;
			margin: 0;
			line-height: 1;
		}
	}
`;

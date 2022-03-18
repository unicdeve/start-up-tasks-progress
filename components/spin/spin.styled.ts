import styled from 'styled-components';

export const StyledSpin = styled.div`
	display: inline-block;
	border: 3px solid #51b2f4;
	border-left-color: #fff;
	border-radius: 50%;
	width: 35px;
	height: 35px;
	animation: donut-spin 1.2s linear infinite;

	@keyframes donut-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

import styled from 'styled-components';

export const StyledHomePage = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	max-width: 600px;
	margin: 0 auto;
	border: none;
	padding: 1rem;
	max-height: 100vh;
	min-height: 100vh;
	overflow-y: auto;

	h1 {
		margin: 0;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.phases {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		li {
			list-style: none;
		}
	}

	.spinner {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	@media (min-width: 768px) {
		border: 3rem solid #f2f2f2;
		padding: 2rem;
	}
`;

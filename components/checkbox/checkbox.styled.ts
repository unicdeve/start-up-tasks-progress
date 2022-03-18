import styled from 'styled-components';

/**
 * Implement from w3schools
 * https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
 */
export const StyledCheckbox = styled.label`
	display: block;
	position: relative;
	padding-left: 30px;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 18px;
	user-select: none;

	&:hover {
		input ~ .checkmark {
			background-color: #ccc;
		}
	}

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;

		&:checked ~ .checkmark {
			background-color: #003087;
			border: none;
		}

		&:checked ~ .checkmark:after {
			display: block;
		}

		&:disabled ~ .checkmark {
			background-color: #ccc;
		}
	}

	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 20px;
		width: 20px;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 5px;

		&:after {
			content: '';
			position: absolute;
			display: none;
			left: 6px;
			top: 2px;
			width: 6px;
			height: 10px;
			border: solid white;
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
		}
	}
`;

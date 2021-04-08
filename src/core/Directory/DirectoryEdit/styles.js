import styled from 'styled-components';

export const FormBlock = styled.div`
	display: block !important;
`;

export const FormColumn = styled.div`
	width: 50%;
	float: left;
`;

export const FormGroup = styled.div`
	padding: 15px;

	input{
		width: 100% !important;
		height: 30px;
		margin-top: 0 !important;
	}

	textarea{
		width: 100%;
		height: 80px;
		marginTop: 0;
		padding: 10px;
	}

	select{
		width: 100%;
		padding: 10px;
		font-size: 17px;
		border: 1px solid gray;

		option{
			font-size: 17px;
		}
	}

	fieldset{
		input {
			border: 0 !important;
			height: 24px;
		}
		input:focus {
			border: 0 !important;
			box-shadow: 0 0 !important;
		}
	}
`;

export const Required = styled.span`
	color: red;
`;

export const CharLimit = styled.div`
	width: 100%;
	textAlign: center;
`;
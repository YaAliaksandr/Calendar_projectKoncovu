import React from "react";
import { styled } from "styled-components";



const DivMonit = styled('div')`
display:flex;
justify-content:space-between;
align-items:center;
background-color:rgb(27,28,31);
color:rgb(148,149,152);
`;
const TextWrapper = styled('span')`
font-size:24px;
`;
const TitleWrapper = styled(TextWrapper)`
font-weight:bold;
margin-right:16px;
`;

const ButtonWrapper = styled('button')`
border:unset;
margin-right:4px;
height:20px;
background-color:#565759;
border-radius:6px;
color:rgb(148,149,152);
`;
const TodayButton = styled(ButtonWrapper)`
padding-inline:16px;
font-weight:bold;
`;
const ButtonsWrapper = styled('div')`
display:flex;
align-items:center;
`;

export const Monitor = ({ today, prev, next, current }) => {


	return (
		<DivMonit>
			<div>
				<TitleWrapper>{today.format('MMMM')}</TitleWrapper>
				<TextWrapper>{today.format('YYYY')}</TextWrapper>
			</div>
			<ButtonsWrapper>
				<ButtonWrapper onClick={prev}>-</ButtonWrapper>
				<TodayButton onClick={current}>Curent</TodayButton>
				<ButtonWrapper onClick={next}>+</ButtonWrapper>
			</ButtonsWrapper>

		</DivMonit>)
} 
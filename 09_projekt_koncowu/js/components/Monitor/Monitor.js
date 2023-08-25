import React from "react";
import { styled } from "styled-components";

const DivMonit = styled('div')`
display:flex;
justify-content:space-between;
align-items:center;
background-color:rgb(27,28,31);
color:rgb(148,149,152);
padding:16px;
position:relative;
`;
const TextWrapper = styled('span')`
font-size:32px;
`;
const TitleWrapper = styled(TextWrapper)`
font-weight:bold;
margin-right:8px;
`;

const ButtonWrapper = styled('button')`
border:unset;
background-color: ${props => props.$unPressed ? '#008000' : '#565759'};
border: 1px solid #565759;
height:20px;
border-radius:4px;
color: ${props => props.$unPressed ? '#a4a6a9' : '#E6E6E6'};
outline: unset;
cursor:pointer;
&:not(:last-child){
margin-right: 8px;
}
display: flex;
justify-content: center;
align-items: center;
`;

const TodayButton = styled(ButtonWrapper)`
font-weight:bold;
`;

const ButtonsWrapper = styled('div')`
display:flex;
align-items:center;
`;

const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;

export const Monitor = ({ today, prev, next, current, setDayOrMonth, dayOrMonth }) => {

	return (
		<DivMonit>
			<div>
				{dayOrMonth === 'day' ? (

					<TextWrapper>
						{today.format('DD')}
					</TextWrapper>
				) : null}

				<TitleWrapper>
					{today.format('MMMM').charAt(0).toUpperCase() + today.format('MMMM').slice(1)}
				</TitleWrapper>

				<TextWrapper>
					{today.format('YYYY')}
				</TextWrapper>
			</div>
			<ButtonsCenterWrapper>

				<ButtonWrapper
					$unPressed={dayOrMonth === 'month'}
					onClick={() => setDayOrMonth('month')}>
					Miesiąc
				</ButtonWrapper>
				<ButtonWrapper
					$unPressed={dayOrMonth === 'day'}
					onClick={() => setDayOrMonth('day')}>Dzień</ButtonWrapper>

			</ButtonsCenterWrapper>
			<ButtonsWrapper>
				<ButtonWrapper onClick={prev}>-</ButtonWrapper>
				<TodayButton onClick={current}>Curent</TodayButton>
				<ButtonWrapper onClick={next}>+</ButtonWrapper>
			</ButtonsWrapper>

		</DivMonit>)
} 
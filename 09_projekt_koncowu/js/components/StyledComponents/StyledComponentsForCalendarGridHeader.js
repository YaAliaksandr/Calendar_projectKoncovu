import { styled } from "styled-components";

export const DivCellWrapper = styled.div`
overflow-x:hidden;
overflow-y:auto;
white-space:nowrap;
text-overflow:ellipsis;
height:${props => props.$isHeader ? 24 : 80}px;
width:140px;
background-color: ${props =>
		props.$isHoliday
			? "orange"
			: props.$isWeekend
				? "#27282A"
				: "#1E1F21"};
color:${props => props.$isSelectedMonth ? '#DDDDDD' : '#555759'};
`;
export const DivRowInCeil = styled.div`
display:flex;
flex-direction:column;
justify-content:${({ $justCon }) => $justCon ? $justCon : 'flex-start'};
${props => props.$pr && 'padding-right:8px;flex-direction:row;'};
`;
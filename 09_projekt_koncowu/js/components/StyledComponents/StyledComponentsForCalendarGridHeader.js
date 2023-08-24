import { styled } from "styled-components";

export const DivCellWrapper = styled.div`
overflow-x:hidden;
overflow-y:${props => props.scrol ? 'auto' : 'hidden'};
white-space:nowrap;
text-overflow:ellipsis;
height:${props => props.$isHeader ? 24 : 95}px;
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
${props => props.$pr && 'padding-right:8px;'};
`;


//for DivCellWrapper && ShowDayComponent
export const UlEventsListWrapper = styled.ul`
margin:0;
padding:0;
padding-left:4px;
list-style:none;
`;

export const LiEventItemWrapper = styled.li`

padding-inline:2px;
padding-bottom:2px;
`;
export const EventItemWrapper = styled.p`
margin:0;
padding-inline:2px;
text-align:left;
// position:relative;
// flex-grow:1;
text-overflow:ellipsis;
background-color:#5d5f63;
color:#DDDDDD;
`;
export const PEventItemWrapper = styled.p`
padding-inline:4px;
width:100%;
background-color:${props=>props.$yellow ? '#6ef40d': '#5d5f63'};
color:${props=>props.$yellow ? '#1e1f21': '#DDDDDD'};
${props=>props.$yellow ? "display:flex;justify-content:center;":"display:inline-block;"}
cursor:pointer;
margin:0;

text-align:left;
font-size:14px;

text-overflow:ellipsis;
overflow:hidden;
white-space:nowrap;
`;
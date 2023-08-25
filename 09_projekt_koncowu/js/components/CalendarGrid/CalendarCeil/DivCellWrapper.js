import React, { useState } from "react";
import { styled } from "styled-components";
import { DivCellWrapper, DivRowInCeil, UlEventsListWrapper, LiEventItemWrapper, PEventItemWrapper } from "../../StyledComponents/StyledComponentsForCalendarGridHeader";
import { $isHoliday, $isSelectedMonth, isCurrentDay } from "../../FunctionForHelp/functionForHelp";


const DivDayInWrapper = styled.div`
height:31px;
width:31px;
display:flex;
align-items:center;
justify-content:center;
margin:2px;
cursor:pointer;
`;

const DivCurrentDay = styled('div')`
height:100%;
width:100%;
background-color:#f00;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
`;

const DivHolidayNameWrapper = styled.div`
color:#1E1F21;
font-size:14px;
white-space:pre-wrap;
`;

const DivShowDayWrapper = styled.div`
	display:flex;
	justify-content:flex-end;
	`;

export const CeilOfCalendar = ({ it, today, holidayArr, holidayName, openFormHandler, events, scrol, setScrol }) => {

	const [currentScrol, setCurrentScrol] = useState(false);

	return (<>
		{currentScrol === true 
		?
			(
				<DivCellWrapper $scrol={scrol}
					key={it.format('MMDD')}
					$isWeekend={it.day() === 6 || it.day() === 0}
					$isSelectedMonth={$isSelectedMonth(it, today)}
					$isHoliday={$isHoliday(it, holidayArr)}
				>
					<DivRowInCeil $justCon='flex-end'>
						<DivShowDayWrapper>

							<DivDayInWrapper 
							onDoubleClick={() => openFormHandler('Utwórz', null, it)}>
								{
									isCurrentDay(it)
										? (<DivCurrentDay>{it.format('DD')}</DivCurrentDay>) 
										: it.format('DD')
								}
							</DivDayInWrapper >
						</DivShowDayWrapper>
						{$isHoliday(it, holidayArr) && <DivHolidayNameWrapper>
							{holidayName}
						</DivHolidayNameWrapper>}

						<UlEventsListWrapper >
							{events
								.slice(0, 1)
								.map((mapEv, ind) =>
									<LiEventItemWrapper key={ind}>
										<PEventItemWrapper 
										onDoubleClick={() => openFormHandler('Edytuj', mapEv)}>
											{mapEv.title}
										</PEventItemWrapper >
									</LiEventItemWrapper>)
							}
							{events.length > 1 && scrol === false ? (
								<LiEventItemWrapper key="Some key" >
									<PEventItemWrapper onDoubleClick={() => setScrol(true)}>
										Pokaż więcej...
									</PEventItemWrapper >
								</LiEventItemWrapper>
							) : null
							}

							{scrol === true && events.length > 1 
							? (
							<> {
								events
									.map((mapEv, ind) =>
										<LiEventItemWrapper key={ind}>
											<PEventItemWrapper 
											onDoubleClick={() => openFormHandler('Edytuj', mapEv)}>
												{mapEv.title}
											</PEventItemWrapper >
										</LiEventItemWrapper>

									)}
								<LiEventItemWrapper>
									<PEventItemWrapper 
									$green 
									onDoubleClick={() => setCurrentScrol(false)}>
										Zwiń...
									</PEventItemWrapper >
								</LiEventItemWrapper>
							</>
							) 
							: null
							}

						</UlEventsListWrapper >

					</DivRowInCeil >

				</DivCellWrapper >
			)
			:
			(
				<DivCellWrapper
					key={it.format('MMDD')}
					$isWeekend={it.day() === 6 || it.day() === 0}
					$isSelectedMonth={$isSelectedMonth(it, today)}
					$isHoliday={$isHoliday(it, holidayArr)}
				>
					<DivRowInCeil $justCon='flex-end'>

						<DivShowDayWrapper>

							<DivDayInWrapper 
							onDoubleClick={() => openFormHandler('Utwórz', null, it)}>
								{
									isCurrentDay(it)
										? (<DivCurrentDay>{it.format('DD')}</DivCurrentDay>) : it.format('DD')
								}
							</DivDayInWrapper >
						</DivShowDayWrapper>
						{$isHoliday(it, holidayArr) && (
						<DivHolidayNameWrapper>
							{holidayName}
						</DivHolidayNameWrapper>
						)}

						<UlEventsListWrapper >
							{events
								.slice(0, 1)
								.map((mapEv, ind) =>
									<LiEventItemWrapper key={ind}>
										<PEventItemWrapper onDoubleClick={() => openFormHandler('Edytuj', mapEv)}>
											{mapEv.title}
										</PEventItemWrapper >
									</LiEventItemWrapper>)
							}
							{events.length > 1 ? (
								<LiEventItemWrapper key="Some key" >
									<PEventItemWrapper onDoubleClick={() => {
										setScrol(true);
										setCurrentScrol(true)
									}}>
										Pokaż więcej...
									</PEventItemWrapper >
								</LiEventItemWrapper>
							) 
							: null
							}


						</UlEventsListWrapper >

					</DivRowInCeil >

				</DivCellWrapper >
			)
		}

	</>)
}
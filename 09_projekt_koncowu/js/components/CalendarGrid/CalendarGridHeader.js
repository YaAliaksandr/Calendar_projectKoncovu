import React from "react";
import moment from "moment/moment";
import { DivCellWrapper } from "../StyledComponents/StyledComponentsForCalendarGridHeader";
import { DivRowInCeil } from "../StyledComponents/StyledComponentsForCalendarGridHeader";


export const CalendarGridHeader = () => {

	return (<>
		{[...Array(7)].map((it, ind) => (
			<DivCellWrapper key={ind}
				$isHeader={true}
				$isSelectedMonth={true}
			>
				<DivRowInCeil
					$justCon={'flex-end'}
					$pr
				>
					{moment().day(ind + 1).format('dddd').charAt(0).toUpperCase() + moment().day(ind + 1).format('dddd').slice(1)}
				</DivRowInCeil >
			</DivCellWrapper >
		)
		)}
	</>)
}
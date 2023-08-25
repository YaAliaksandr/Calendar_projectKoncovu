import React from "react";
import { styled } from "styled-components";



const DivTitleWrapper = styled('div')`
background-color:grey;
min-height:40px;
color:#DDDDDD;
`;

export const Header = () => {

	return (<DivTitleWrapper>
		Aleksander (Imie użytkownika)
	</DivTitleWrapper>)

}

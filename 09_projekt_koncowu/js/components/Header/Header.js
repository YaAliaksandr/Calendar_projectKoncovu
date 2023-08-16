import React from "react";
import { styled } from "styled-components";



const DivTitleWrapper = styled('div')`
background-color:grey;
min-height:40px;
color:rgb(148,149,152);
`;

export const Header = () => {

	return (<DivTitleWrapper>
		Header
	</DivTitleWrapper>)

}

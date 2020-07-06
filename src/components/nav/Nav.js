import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styled from "styled-components";

import { Link } from "react-router-dom";

const EventsNav = () => {
	return (
		<S.Container>
			<Link to="/events/create">+NEW EVENT</Link>
		</S.Container>
	);
};

const S = {
	Container: styled.nav`
		display: flex;
		justify-content: space-between;
		padding: 1vw;
		// border: solid red 1px;
		width: 100%;
		position: fixed;
		top: 0;
	`,
};

export default EventsNav;

import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';



export const ProtectedRoute = ({ children, ...rest }) => {
	const location = useLocation();
	let cookie = true

	return (
		<Route
			{...rest}
			render={() =>
				cookie ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
} 
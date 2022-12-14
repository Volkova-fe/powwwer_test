import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/utils';


//Protected Route using for private page
export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();
	let cookie = getCookie('token')

	return (
		<Route
			{...rest}
			render={(props) =>
				cookie ? (
					<Component {...props} />
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
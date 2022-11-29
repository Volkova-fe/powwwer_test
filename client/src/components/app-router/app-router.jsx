import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { NotFound404 } from '../../pages/not-found-404/not-found-404';
import { privateRoutes, publicRoutes } from '../../router';
import { ProtectedRoute } from '../protected-route/protected-route';

const AppRouter = () => {
	return (
		<Switch>
			{publicRoutes.map(route =>
				<Route
					component={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>
			)}
			{privateRoutes.map(route =>
				<ProtectedRoute
					component={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>
			)}
			<Route component={NotFound404}/>
		</Switch>
	)
}

export default AppRouter
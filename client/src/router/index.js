import { Login } from "../pages/login/login";
import { Profile } from "../pages/profile/profile";
import { Register } from "../pages/register/register";

//router for all user and auth user 
export const publicRoutes = [
	{ path: '/', component: Login, exact: true },
	{ path: '/register', component: Register, exact: true },
]

export const privateRoutes = [
	{ path: '/profile', component: Profile, exact: true },
]
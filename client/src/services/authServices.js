import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL } from '../utils/constants'
import { getCookie } from '../utils/utils'

export const authAPI = createApi({
	reducerPath: 'authAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			headers.set('authorization', `Bearer ${getCookie('token')}`)
			return headers
		},
	}),
	endpoints: (build) => ({
		registrationUser: build.mutation({
			query: ({ email, password, name }) => ({
				url: '/api/user/registration',
				method: 'POST',
				body: {
					email,
					password,
					name
				},
			}),
		}),
		loginUser: build.mutation({
			query: ({ email, password }) => ({
				url: '/api/user/login',
				method: 'POST',
				body: {
					email,
					password,
				}
			}),
		}),
		logoutUser: build.mutation({
			query: () => ({
				url: '/api/user/logout',
				method: 'POST',
				body: {
					token: getCookie('token')
				}
			}),
		}),
		removeUser: build.mutation({
			query: ({ email }) => ({
				url: 'api/user/delete',
				method: 'DELETE',
				body: { email: email }
			}),
		}),
		checkUserAuth: build.query({
			query: () => ({
				url: '/api/user/auth'
			}),
		}),
	})
})
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL } from '../utils/constants'
import { getCookie } from '../utils/utils'

export const reportAPI = createApi({
	reducerPath: 'reportAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			headers.set('authorization', `Bearer ${getCookie('token')}`)
			return headers
		},
	}),
	endpoints: (build) => ({
		createTrackAction: build.mutation({
			query: (type) => ({
				url: '/api/tracker/action',
				method: 'POST',
				body: {
					type
				},
			})
		}),
		getSelectDayReport: build.query({
			query: (date) => ({ url: `/api/tracker/${date}` })
		}),
		getRangeDaysReport: build.query({
			query: ({ from, to }) => ({ url: `/api/tracker/${from}/${to}` })
		})
	})
})
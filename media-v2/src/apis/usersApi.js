import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints(builder) {
        return {
            removeUser: builder.mutation({
                invalidatesTags: [{ 'type': 'User' }],
                query: (user) => {
                    return {
                        url: `/users/${user.id}`,
                        method: 'DELETE'
                    }
                }
            }),
            addUser: builder.mutation({
                invalidatesTags: [{ 'type': 'User' }],
                query: () => {
                    return {
                        url: '/users',
                        body: {
                            name: faker.person.fullName()
                        },
                        method: 'POST'
                    }
                }
            }),
            fetchUsers: builder.query({
                providesTags: [{ 'type': 'User' }],
                query: () => {
                    return {
                        url: '/users',
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } = usersApi
export { usersApi }
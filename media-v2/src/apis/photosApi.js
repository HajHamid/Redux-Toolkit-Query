import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { 'id': photo.id, 'type': 'Photo' }
                    })
                    tags.push({ 'id': album.id, "type": 'albumsPhoto' })
                    return tags
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'GET',
                        params: {
                            albumId: album.id
                        }
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ 'id': album.id, 'type': 'albumsPhoto' }]
                },
                query: (album) => {
                    return {
                        url: 'photos/',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.urlLoremFlickr({ category: 'abstract' })
                        }
                    }
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ 'id': photo.id, 'type': 'Photo' }]
                },
                query: (photo) => {
                    return {
                        url: `photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
})

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} = photosApi

export { photosApi }
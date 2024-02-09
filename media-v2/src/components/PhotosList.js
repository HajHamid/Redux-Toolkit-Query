import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Skeleton from "./Skeleton";
import Button from "./Button";
import PhotosListItem from "./PhotosListitem";

function PhotosList({ album }) {
    const { data, error, isLoading } = useFetchPhotosQuery(album)
    const [addPhoto, results] = useAddPhotoMutation()

    let content;

    if (isLoading) {
        content = <Skeleton className="h-10 w-full" times={4}></Skeleton>
    } else if (error) {
        content = error
    } else {
        content = data.map((photo) => {
            return <PhotosListItem photo={photo} key={photo.id} />
        })
    }

    const handleAddPhoto = () => {
        addPhoto(album)
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos In {album.title}</h3>
                <Button loading={results.isLoading} onClick={handleAddPhoto}>
                    + Add Photo
                </Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">
                {content}
            </div>
        </div>
    )
}

export default PhotosList
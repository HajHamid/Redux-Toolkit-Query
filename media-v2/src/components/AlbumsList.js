import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store"
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumListitem";

function AlbumsList({ user }) {
    const { data, error, isLoading } = useFetchAlbumsQuery(user)
    const [addAlbum, results] = useAddAlbumMutation()

    let content;

    if (isLoading) {
        content = <Skeleton className="h-10 w-full" times={4}></Skeleton>
    } else if (error) {
        content = error
    } else {
        content = data.map((album) => {
            return <AlbumsListItem album={album} key={album.id} />
        })
    }

    const handleAddAlbum = () => {
        addAlbum(user)
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    )
}

export default AlbumsList
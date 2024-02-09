import Button from "./Button"
import { useFetchUsersQuery, useAddUserMutation } from "../store"
import Skeleton from "./Skeleton";
import UserListitem from "./UserListitem";

function UsersList() {
    const { data, error, isLoading } = useFetchUsersQuery()
    const [addUser, results] = useAddUserMutation()

    let content;
    if (isLoading) {
        content = <Skeleton className="h-10 w-full" times={4}></Skeleton>
    } else if (error) {
        content = error
    } else {
        content = data.map((user) => {
            return <UserListitem key={user.id} user={user} />
        })
    }

    const handleAddUser = () => {
        addUser()
    }

    return (
        <>
            <div className="flex justify-between border border-gray mt-2 p-3">
                <h2>Users</h2>
                <Button onClick={handleAddUser} loading={results.isLoading}>+ Add user</Button>
            </div>

            <div className="p-3">
                {content}
            </div>
        </>
    )
}

export default UsersList
import { GoTrash } from 'react-icons/go'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import { useRemoveUserMutation } from '../store'
import AlbumsList from './AlbumsList'

function UserListitem({ user }) {

    const [removeUser, results] = useRemoveUserMutation()

    const handleRemoveUser = () => {
        removeUser(user)
    }

    const header =
        <>
            <Button onClick={handleRemoveUser} loading={results.isLoading} className="mr-3"><GoTrash /></Button>
            {user.name}
        </>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    )
}

export default UserListitem
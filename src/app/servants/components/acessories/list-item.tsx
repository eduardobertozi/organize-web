import { DeleteButton } from './delete-button'

type ListItemProps = {
  name: string
  handleDelete?: () => void
}

export const ListItem: React.FC<ListItemProps> = ({ name, handleDelete }) => {
  return (
    <div
      data-testid="list-item"
      className="flex w-full border-b p-2 py-4 text-sm"
    >
      <p className="flex-1">{name}</p>
      <DeleteButton
        variant="ghost"
        className="text-muted"
        onClick={handleDelete}
      />
    </div>
  )
}

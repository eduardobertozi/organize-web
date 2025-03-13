import { TrashIcon } from 'lucide-react'
import { IListItemModel } from './list-item-model'

export const ListItemView: React.FC<IListItemModel> = ({ item }) => {
  return (
    <div className="flex w-full border-b p-2 py-4 text-sm">
      <p className="flex-1">{item.name}</p>
      <button>
        <TrashIcon size={16} />
      </button>
    </div>
  )
}

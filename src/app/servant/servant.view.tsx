import { IUseServantViewModel } from './servant.model'

export const ServantView: React.FC<IUseServantViewModel> = ({ vm }) => {
  return (
    <div>
      <p>Servant</p>
      <p>{JSON.stringify(vm)}</p>
    </div>
  )
}

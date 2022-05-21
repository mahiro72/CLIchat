import {FC} from "react"
type Props = {
  ls: string[]
}

export const Ls: FC<Props> = ({ls}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-6 p-1 ">
      {ls.map((dir: string, idx: number) => (
        <p key={idx}>{dir}/</p>
      ))}
    </div>
  )
}

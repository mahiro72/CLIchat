import {FC, useState, useEffect, Dispatch, SetStateAction} from "react"

type Props = {
  onLoad:  Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}

export const Loader: FC<Props> = (props: Props) => {
  const [loader, addLoad]: [string[], any] = useState(["#"])
  const [width, setWidth] = useState(100)

  const load = () => {
    const num: number = Math.floor(Math.random() * 99) + 10
    const timeout = setTimeout(() => {
      addLoad([...loader, "#"])
    }, num)
    return () => clearTimeout(timeout)
  }

  useEffect(() => {
    setWidth(Math.floor(window.innerWidth/20))
    if (loader.length !== width) {
      load()
    } else {
      props.onLoad(false)
    }
  }, [loader])

  if (props.isLoading) {
    return (
      <section className="mb-4">
        <p>{`login: `}</p>
        <p>{loader}</p>
        <p>[{Math.floor(loader.length * 100/width * 10)/10}%]</p>
      </section>
    )
  }
  return (
    <section className="mb-4">
        <p>{`login: `}</p>
        <p>{loader}</p>
        <p>login successfully!</p>
        <br />
        <p>Welcome to CLI Chat</p>
        <p>{Date()}</p>
    </section>
  )
}

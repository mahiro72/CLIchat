import React, {FC, useState, ChangeEvent, useRef, useEffect} from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Loader } from '../components/loader'
import dirs from "../public/data/dir.json"

import { DirService } from '../service/dirService'
import { CommandService } from '../service/commandService'

import { Directory } from '../components/directory'

import { Header } from '../components/layouts/Header'

const dirService = new DirService()

const Home: NextPage = () => {
    const stateDirs: string[] = Object.keys(dirs)
    const [change, setChange] = useState("")
    const [logs, setLogs] = useState<any[]>([])
    const [replies, setReplies] = useState<any[]>([])
    const [dir, setDir] = useState<any[]>([])
    const [ls, setLs] = useState(stateDirs)
    const [isLoading, onLoad] = useState(true)
    const [isInput, setIsInput] = useState<boolean>(false)

    const cursor : any = useRef(null)
    const bottom : any = useRef(null)
    const directory : any = useRef(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setChange(e.target.value)
    }

    const handleDir = (commands: string) => {
      const command = commands.split(" ")
      if (!command) {
        return
      }
      if (command[0] == "cd" && command.length == 1) {
        setDir([])
        setLs(dirService.retLs([]))
      }
      if (command[0] == "cd" && command.length == 2) {
        const arrowCommands: string[] = ["..", "../"]
        if (arrowCommands.indexOf(command[1]) !== -1 && dir.length !== 0) {
          const rmArr = [...dir]
          rmArr.pop()
          setDir(rmArr)
          setLs(dirService.retLs(rmArr))
        }
        if (ls.indexOf(command[1]) !== -1) {
          setDir([...dir, command[1]])
          setLs(dirService.retLs([...dir, command[1]]))
        }
      }
    }
  
    const commandService = new CommandService()
    const onEnter = (e: any) => {
      if (e.charCode == 13) {
        // コマンド処理
        const res = commandService.handler(change, ls)
        if (res == "CA") {
          setReplies([])
          setLogs([])
        } else {
          setReplies([...replies, res])
          // ディレクトリの処理
          handleDir(change)
          // ログの追加
          setLogs([...logs, {command: change, dir: dir}])
        }
        // クリア
        setChange("")
      }
    }

    useEffect(() => {
      cursor?.current?.focus()
      bottom?.current?.scrollIntoView({behavior: "smooth"})
    })

  return (
    <div className={styles.container} onClick={()=>(setIsInput(!isInput))}>
        <Loader onLoad={onLoad} isLoading={isLoading} />
        {(() => {
        if (!isLoading) {
            return (
            <div className="relative">
                <Header />

                {logs.map((log: {command: string, dir: string[]}, idx: number) => (
                <span key={idx}>
                    <span className="flex" id={`${idx}`}>
                        <Directory commands={log.dir}/>
                        <p>{log.command}</p>
                    </span>
                    {replies[idx]}
                </span>
                ))}

                <span className="flex" id="hge">
                    <Directory ref={directory} commands={dir}/>
                    <input
                        autoComplete="off"
                        ref={cursor}
                        className="bg-transparent focus-within:outline-none tracking-widest w-1/2 sm:w-3/4"
                        type="text"
                        value={change}
                        onChange={handleChange}
                        onKeyPress={e => onEnter(e)}
                        checked={isInput}
                    />
                </span>
                <div ref={bottom} style={{ float:"left", clear: "both" }}/>
            </div>
            )
        }
        })()}
    </div>
  )
}

export default Home

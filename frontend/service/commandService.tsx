import products from "../public/data/products.json"

import {Ls} from "../components/command/ls"
import {Ft} from  "../components/command/ft"




interface product {name: string, description: string, link: string}

export class CommandService {
  dirs: {
    products: product
  }
  constructor() {
    this.dirs = {
      products: products,
    }
  }
  handler = (commandBlock: string, ls: string[]) => {
    const command = commandBlock.split( " ")
    if (!command[0]) {
      return ""
    }

    // if (command[0] === "cat" && command.length == 1) {
    //   return this.Profile()
    // }

    // UNIXコマンド
    if (command[0] === "ls" && command.length <= 2) {
      if (command.length == 2 && command[1] === "-a"){
        return this.Ls(ls, false)
      }
      return this.Ls(ls, true)
    }

    if (command[0] === "cd" && command.length <= 2) {
      return this.Cd(ls, command)
    }

    if (command[0] === "ft" && command.length == 1) {
        return this.Ft()
    }

    if (command[0] === "clear" && command.length == 1) {
      return "CA"
    }
    return this.CommandNotFound(command[0])
  }

  CommandNotFound = (command: string) => {
    return (
      <p className="pb-1">{`command not found: ${command}`}</p>
    )
  }

  Ls = (ls: string[], isHide: boolean) => {
    // 隠しファイルを表示しない
    if (isHide){
        ls = ls.filter(
            el => el[0]!='.'
        )
    }
    return (
      <Ls ls={ls}/>
    )
  }

  Cd = (ls: string[], command: string[]) => {
    const allowCommands = ["..", "../"]
    if ([...allowCommands, ...ls].indexOf(command[1]) == -1 && command.length != 1) {
      return (
        <p className="pb-1">{`No such file or directory...`}</p>
      )
    }
  }

  Profile = () => {
    return (
      <Profile/>
    )
  }

  Ft = () => {
    return (
      <Ft/>
    )
  }

}
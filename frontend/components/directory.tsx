import React, {FC, PropsWithChildren, useState, forwardRef, useImperativeHandle, ForwardedRef} from "react"

type Props = {
  commands?: string[]
}

export const Directory = forwardRef((props: PropsWithChildren<Props>, ref: ForwardedRef<any>) => {
  useImperativeHandle(ref, () => ({
    setDir () {
      return
    }
  }))
  return (
    <p>[ ~{"/"+props.commands?.join("/") ?? ""} ]&nbsp;$&nbsp;</p>
  )
})

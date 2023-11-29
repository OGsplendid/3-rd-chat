import { forwardRef } from "react"
import { TMessage } from "../../models"
import { MyMessage } from "../MyMessage/MyMessage"
import { OthersMessage } from "../OthersMessage/OthersMessage"

interface IChatProps {
  list: TMessage[],
  id: string,
}

export const Chat = forwardRef<HTMLDivElement, IChatProps>(({ list, id }, ref) => {
  return (
    <div className="chat-wrapper">
      {list.map(item => (
        item.userId === id ? <MyMessage key={item.id} text={item.content} /> : <OthersMessage key={item.id} text={item.content} />
      ))}
      <div ref={ref} />
    </div>
  )
})

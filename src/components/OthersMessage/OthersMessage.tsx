import { IMessageProps } from '../MyMessage/MyMessage'

export const OthersMessage = ({ text }: IMessageProps) => {
  return (
    <div className='message others-message'>{text}</div>
  )
}

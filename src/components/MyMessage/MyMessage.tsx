export interface IMessageProps {
    text: string,
}

export const MyMessage = ({ text }: IMessageProps) => {
  return (
    <div className='message my-message'>{text}</div>
  )
}

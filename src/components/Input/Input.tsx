interface IInputProps {
    text: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

export const Input = ({ onChange, onSubmit, text }: IInputProps) => {

  return (
    <form onSubmit={onSubmit} className="input-form">
        <input onChange={onChange} name="text" className="input" placeholder="Type a message" value={text} />
        <button name="button" type="submit" className="button"></button>
    </form>
  )
}

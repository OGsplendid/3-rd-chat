/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import { Chat } from './components/Chat/Chat'
import { Input } from './components/Input/Input'
import { TMessage } from './models';

function App() {
  const [list, setList] = useState<TMessage[]>([]);
  const [text, setText] = useState('');
  const [userId] = useState<string>(localStorage.getItem('userId') || nanoid());
  const [lastMessageId, setLastMessageId] = useState<number>(0);

  const bottomRef = useRef<null | HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    const message = {
      userId,
      content: text,
    };

    postMessage(message);
    setText('');
    scrollBottom();
  }

  const loadData = () => {
    fetch(`http://localhost:7070/messages?from=${lastMessageId}`)
      .then(response => response.json())
      .then(data => {
        setList([...list, ...data]);
      })
}

  const postMessage = (message: TMessage) => {
    fetch('http://localhost:7070/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }


  // using ref smoothly scrolling into the bottom
  const scrollBottom = () => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  useEffect(() => {
    localStorage.setItem('userId', userId);
    setInterval(() => {
      loadData();
    }, 1000)
  }, []);

  useEffect(() => {
    if (list.length === 0) return;
    setLastMessageId(list.length);
  }, [list])

  useEffect(scrollBottom, [lastMessageId]);

  return (
    <div className='common-wrapper'>
      <Chat list={list} id={userId} ref={bottomRef} />
      <Input onChange={handleChange} onSubmit={handleSubmit} text={text} />
    </div>
  )
}

export default App

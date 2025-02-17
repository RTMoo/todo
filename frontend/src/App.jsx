import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="Counter">{count}</div>
      <button type="button" onClick={() => setCount(count + 1)}>increment</button>
      <button type="button" onClick={() => setCount(count - 1)}>decrement</button>
    </>
  )
}

export default App

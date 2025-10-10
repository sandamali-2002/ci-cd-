import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [message, setMessage] = useState('')

  const apiBase = import.meta.env.DEV ? 'http://localhost:4000' : ''

  useEffect(() => {
    fetch(`${apiBase}/students`)
      .then(res => res.json())
      .then(setStudents)
      .catch(err => console.error(err))
  }, [])

  const addStudent = async (e) => {
    e.preventDefault()
    setMessage('')
    const payload = { name, age: Number(age) }
    try {
      const res = await fetch(`${apiBase}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const body = await res.json()
      if (!res.ok) {
        setMessage(body.error || 'Error')
        return
      }
      setStudents(prev => [...prev, body])
      setName('')
      setAge('')
      setMessage('Student added')
    } catch (err) {
      setMessage('Network error')
    }
  }

  return (
    <div className="App">
      <h1>Student Management</h1>
      <form onSubmit={addStudent}>
        <div>
          <label>Name: <input name="name" value={name} onChange={e => setName(e.target.value)} data-testid="input-name" /></label>
        </div>
        <div>
          <label>Age: <input name="age" value={age} onChange={e => setAge(e.target.value)} type="number" data-testid="input-age" /></label>
        </div>
        <button id="add-student" type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Students</h2>
      <ul id="students-list">
        {students.map(s => (
          <li key={s.id}>{s.name} ({s.age})</li>
        ))}
      </ul>
    </div>
  )
}

export default App

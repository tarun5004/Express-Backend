import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/list'

const List = ({ refreshList }) => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`)
      setTodos(response.data.data)
    } catch (error) {
      console.log(error.response?.data || error.message)
      setTodos([])
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [refreshList])

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Your Todos
      </h1>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-slate-600">No todos found</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="rounded bg-white p-4 shadow">
              <h2 className="text-lg font-semibold text-slate-900">
                {todo.taskname}
              </h2>

              <p className="text-slate-600">
                {todo.description}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Status: {todo.status}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default List

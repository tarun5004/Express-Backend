import List from './components/List'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

const [taskname, setTaskname] = useState('')
const [description, setDescription] = useState('')
const [status, setStatus] = useState('pending')
const [refreshList, setRefreshList] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await axios.post('http://localhost:3000/api/list/create', {
      taskname,
      description,
      status
    })
    
    setTaskname('')
    setDescription('')
    setStatus('pending')
    setRefreshList((prev) => !prev)
  } catch (error) {
    console.log(error.response?.data || error.message)
  }
}

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Todo App
        </h1>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4 rounded-lg bg-white p-5 shadow-sm">
          <div>
            <label
              htmlFor="taskname"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Task Name
            </label>
            <input
              id="taskname"
              name="taskname"
              type="text"
              placeholder="Enter task name"
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Enter task description"
              className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Add Todo
          </button>
        </form>
      </section>

      <List refreshList={refreshList} />
    </main>
  )
}

export default App

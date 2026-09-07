import React, { useEffect, useState } from 'react'
import CreateIssueModal from '../Global/CreateIssueModal'

const Dashboard = () => {
  const [issues, setIssues] = useState([
    {
      title: "Fix login bug",
      description: "Users are unable to log in with valid credentials.",
      priority: "high",
      status: "open"
    },
    {
      title: "Add pagination",
      description: "Implement pagination for the issues list.",
      priority: "medium",
      status: "in-progress"
    },
    {
      title: "Update navbar",
      description: "Improve navbar layout and mobile responsiveness.",
      priority: "low",
      status: "done"
    },
    {
      title: "Optimize database queries",
      description: "Reduce unnecessary MongoDB queries on the dashboard.",
      priority: "high",
      status: "in-progress"
    },
    {
      title: "Add issue search",
      description: "Allow users to search issues by title.",
      priority: "medium",
      status: "open"
    },
    {
      title: "Fix responsive card layout",
      description: "Issue cards overflow on smaller screen sizes.",
      priority: "low",
      status: "open"
    },
    {
      title: "Add loading state",
      description: "Display a loading indicator while fetching issues.",
      priority: "low",
      status: "done"
    },
    {
      title: "Improve error handling",
      description: "Show meaningful error messages when API requests fail.",
      priority: "medium",
      status: "done"
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)


  const [statusCounts, setStatusCounts] = useState({
    done: 0,
    inProgress: 0,
    open: 0
  })



  const accumulateStatusCounts = () => {
    const counts = {
      done: 0,
      inProgress: 0,
      open: 0
    }

    issues?.forEach((item) => {
      if (item?.status === 'in-progress') {
        counts.inProgress++
      }
      else if (item?.status === 'done') {
        counts.done++
      }
      else {
        counts.open++
      }
    })
    setStatusCounts(counts)
  }

  const searchIssues = (e) => {
    const searchQuery = e.target.value
    const filteredIssues = issues?.filter((item) => {
      return item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setIssues(filteredIssues)
  }



  useEffect(() => {
    accumulateStatusCounts()
  }, [])

  return (
    <>
      {
        isModalOpen && <CreateIssueModal setModal={setIsModalOpen}/>
      }

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Mini Issue Tracker
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your issues
            </p>
          </div>

          <div className="flex gap-3">
            <input onChange={searchIssues}
              placeholder="Search issues..."
              type="search"
              className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />

            <button onClick={() => setIsModalOpen(true)} className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
              + Create Issue
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500">
              Done
            </h4>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {statusCounts?.done}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500">
              In Progress
            </h4>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {statusCounts?.inProgress}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500">
              Open
            </h4>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {statusCounts?.open}
            </p>
          </div>

        </div>

        {/* Issues Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Issues
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Issue
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Priority
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {issues?.map((ticket) => (
                  <tr
                    key={ticket._id || ticket.title}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="max-w-md px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {ticket?.title}
                      </p>
                      <p className="mt-1 truncate text-gray-500">
                        {ticket?.description}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${ticket?.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : ticket?.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {ticket?.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                        {ticket?.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </>
  )
}

export default Dashboard
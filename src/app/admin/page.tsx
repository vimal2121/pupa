export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Projects</h3>
          <p className="text-3xl font-bold dark:text-white">0</p>
        </div>
      </div>
    </div>
  )
}

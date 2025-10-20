export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Test Tailwind CSS
        </h1>
        <div className="space-y-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
            Bouton primaire
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
            Bouton secondaire
          </button>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              Si tu vois des styles, Tailwind fonctionne!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
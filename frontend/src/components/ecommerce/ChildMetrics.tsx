import { GroupIcon } from "../../icons";

// components/nursery/ChildMetrics.tsx
export default function ChildMetrics() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
          <GroupIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
          +5%
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">42</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Enfants présents</p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total inscrits: 48</span>
          <span className="font-medium">87.5%</span>
        </div>
      </div>
    </div>
  );
}
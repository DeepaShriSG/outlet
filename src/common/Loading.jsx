import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    <span className="sr-only">Loading...</span>
  </div>
  )
}

export const SkeletonCard = () => (
  <div className="border bg-gray-200 rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);


export default Loading
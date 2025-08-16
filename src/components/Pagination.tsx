// src/components/Pagination.tsx
"use client";
import { Dispatch, SetStateAction } from 'react';

type pagObj = {
	page: number;
	totalPages: number;
}
type paginationObj = {
	pagination: pagObj,
	onPageChange: Dispatch<SetStateAction<number>> 
}
export const Pagination = ({ pagination, onPageChange }: paginationObj) => {
  if (pagination.totalPages <= 1) {
    return null; // Não renderiza nada se houver apenas uma página
  }

  const handlePrevious = () => {
    if (pagination.page > 1) {
      onPageChange(pagination.page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      onPageChange(pagination.page + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <div>
        <p className="text-sm text-gray-700">
          Mostrando página <span className="font-medium">{pagination.page}</span> de <span className="font-medium">{pagination.totalPages}</span>
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handlePrevious}
          disabled={pagination.page === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={pagination.page === pagination.totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

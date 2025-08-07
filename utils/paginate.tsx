// utils/pagination.utils.ts

export interface PaginationResult<T> {
  currentItems: T[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export const paginate = <T,>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): PaginationResult<T> => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return {
    currentItems,
    totalPages,
    currentPage,
    itemsPerPage,
    totalItems,
  };
};

export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const half = Math.floor(maxVisiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
  }

  return pages;
};

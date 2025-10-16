import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].name.localeCompare(pivot.name) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const binarySearch = (arr, key) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparisonResult = arr[mid].name.localeCompare(key);

    if (comparisonResult === 0) {
      return mid; // Key found
    } else if (comparisonResult < 0) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Key not found
};

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
    searchResultIndex: -1,
  });

  const sortAndSearchResults = () => {
    // Sort the results using quicksort
    const sortedResults = quickSort(auth.results);

    // Perform binary search on the sorted results
    const searchResultIndex = binarySearch(sortedResults, auth.keyword);

    // Update the state with sorted and searched results
    setAuth((prevAuth) => ({
      ...prevAuth,
      results: sortedResults,
      searchResultIndex,
    }));
  };

  return (
    <SearchContext.Provider value={[auth, setAuth, sortAndSearchResults]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };

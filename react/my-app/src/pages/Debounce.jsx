import { useState } from 'react';
import { debounce } from 'lodash';

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const handleSearch = debounce((value) => {
    setDebouncedQuery(value); 
    console.log("Searching for:", value); 
  }, 1000);

  const handleChange = (event) => {
    setQuery(event.target.value); 
    handleSearch(event.target.value); 
  };

 

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      
      <p><strong>Typed query:</strong> {query}</p>
      
      <p><strong>Debounced query:</strong> {debouncedQuery}</p>
    </div>
  );
}

export default DebouncedSearch;

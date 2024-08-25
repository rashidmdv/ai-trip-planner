import { useState, useEffect, useCallback } from "react";

const Autocomplete = (props) => {
  // eslint-disable-next-line react/prop-types
  const {handleInputChange} = props;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const debounce = useCallback((fn, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      setError(error.message);
      console.error(error); // Log the error
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);
    // Do something with the selected suggestion
  };

  useEffect(() => {
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);
    if (query.length > 2) {
      debouncedFetchSuggestions(query);
    }
  }, [query, debounce]);



  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Select...."
        onChange={(e) => {
          handleInputChange('location', e.target.value); // Pass the correct value to handleInputChange
          setQuery(e.target.value);
        }}
        style={{
          border: "1px solid #ccc",
          padding: "7px 10px",
          width: "100%",
          borderRadius: "5px",
        }}
      />
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <ul
          className="mt-2"
          style={{
            border: suggestions.length > 0 ? "1px solid #ccc" : "none",
            width: "100%",
            borderRadius: "5px",
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              style={{
                padding: "7px 10px",
              }}
            >
              {suggestion.display_name || suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
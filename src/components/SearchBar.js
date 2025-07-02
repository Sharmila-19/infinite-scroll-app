import React from "react";

const SearchBar=React.memo(({searchTerm,onSearchChange})=>{
    return(
        <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc'}}
    />
    );
});
export default SearchBar;

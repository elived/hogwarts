import {useEffect, useState} from "react";

type SearchBarProps<T> = {
    onSearch: (query: string) => Promise<T[]>;
    renderItem: (item: T) => React.ReactNode;
};

function SearchBar<T>({ onSearch, renderItem }: SearchBarProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (!searchQuery) {
            setData([]);
            return;
        }
        
        const fetchData = async () => {
            try {
                setError("");
                const result = await onSearch(searchQuery);
                setData(result);
            } catch {
                setError("Error fetching data");
            }
        };
        
        fetchData();
    }, [searchQuery, onSearch]);
    
    return (
        <div>
            <input
                type="text"
                placeholder="search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SearchBar;
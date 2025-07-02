import React,{useState,useEffect,useCallback,useRef} from "react";
import { fetchUsers } from "./api/useApi";
import useDebounce from "./hooks/useDebounce";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import LoadingSpinner from "./components/LoadingSpinner";
import NoResultsFound from "./components/NoResultsFound";
import './App.css';

const USERS_PER_PAGE = 5;

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true); 
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const prevSearchTermRef = useRef();

  const fetchUsersData=useCallback(async(reset=false)=>{
    if(loading) {
      return; 
    }
    setLoading(true);
    try{
      const currentPage=reset?1:page;
      console.log(`API Call: page=${currentPage}, limit=${USERS_PER_PAGE}, searchTerm=${debouncedSearchTerm}, _start=${(currentPage - 1) * USERS_PER_PAGE}`);
      const newUsers=await fetchUsers(currentPage,USERS_PER_PAGE,debouncedSearchTerm);
      if(reset){
        setUsers(newUsers);
        setPage(2);
        setHasMore(newUsers.length === USERS_PER_PAGE);
      }else{
         setUsers((prevUsers) => {
          const uniqueNewUsers = newUsers.filter(newUser =>
            !prevUsers.some(existingUser => existingUser.id === newUser.id)
          );
          return [...prevUsers, ...uniqueNewUsers];
        });
        setPage((prevPage) => prevPage + 1);
        setHasMore(newUsers.length === USERS_PER_PAGE);
      }
      setInitialLoadDone(true);
    }catch(error){
      console.error("Error fetching users:", error);
      setHasMore(false);
    }finally{
      setLoading(false);
    }

  },[page, debouncedSearchTerm, loading]);

  useEffect(()=>{
    prevSearchTermRef.current= fetchUsersData
  },[fetchUsersData]);

  useEffect(()=>{
    setUsers([]); 
    setPage(1);
    setHasMore(true);
    setInitialLoadDone(false);
    prevSearchTermRef.current(true);
  },[debouncedSearchTerm]);

  const { lastElementRef } =useInfiniteScroll(()=>prevSearchTermRef.current(),hasMore && !loading);
  const handleSerachChange=useCallback((value)=>{
    setSearchTerm(value);
  },[]);

  return(
    <div className="app-container">
      <h1>Infinite Scroll with Search & Debounce</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSerachChange} />

      {loading && !initialLoadDone && <LoadingSpinner />}
      {!loading && initialLoadDone && users.length === 0 && (<NoResultsFound />)}
      <UserList users={users} />
      {hasMore && !loading && <div ref={lastElementRef} style={{ height: '20px' }} />}
      {loading && initialLoadDone && <LoadingSpinner />}
    </div>
  );
};
export default App;
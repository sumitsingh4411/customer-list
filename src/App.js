import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import List from './component/list/List';
import Pagination from './component/pagination/Pagination';
function App() {
  // declare state 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  //fetching data using axios

  useEffect(() => {
       setLoading(true);
       axios.get('https://intense-tor-76305.herokuapp.com/merchants').then((response)=>{
         let arr=[];
         for(let i=0;i<5;i++)
         {
           response.data.map((data)=>{
             arr.push(data);
           })
         }
           setPosts(arr);
           console.log(arr)
       }).catch((err)=>{
           console.log(err);
       })
       setLoading(false);
    }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
     <List posts={currentPosts} loading={loading} />
     <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
}

export default App;

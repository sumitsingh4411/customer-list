import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import List from './component/list/List';
import Pagination from './component/pagination/Pagination';
import Header from "./component/Header/Header";
import Sort from "./component/sort/Sort";
import { Route, Switch } from "react-router-dom";
let arr = [];
let arrs = [];
function App() {
  // declare state 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //fetching data using axios

  useEffect(() => {
    setLoading(true);
    const find_max = (arr) => {
      let ans = -10000000;
      arr.forEach(e => {
        if (e.amount > ans)
          ans = e.amount;
      })
      return ans;
    }
    const find_min = (arr) => {
      let ans = 10000000;
      arr.forEach(e => {
        if (e.amount < ans)
          ans = e.amount;
      })
      return ans;
    }
    axios.get('https://intense-tor-76305.herokuapp.com/merchants').then((response) => {
      response.data.map((data) => {
        if (data.bids) {
          arr.push(find_max(data.bids));
          arrs.push(find_min(data.bids));
        } else {
          arr.push(-1);
          arrs.push(-1);
        }
      })
      setPosts(response.data);
    }).catch((err) => {
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
      <switch>
        <Route exac path="/">
          <Header />
          <Sort />
          <List posts={currentPosts} loading={loading} arr={arr} arrs={arrs} />
          <div style={{ marginTop: '5vh' }}>

          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </Route>
      </switch>
    </>
  );
}

export default App;

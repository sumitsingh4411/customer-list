import React from 'react';

const List = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          {post.firstname}
        </li>
      ))}
    </ul>
  );
};

export default List;

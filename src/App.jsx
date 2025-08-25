import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import { Link } from 'react-router-dom'


const App = () => {
  
  const posts = []


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/post/:id",
      element: <PostDetail data={posts} />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Creatorverse</h1>
        <Link to="/"><button className="headerBtn"> VIEW All CREATORS  </button></Link>
        <Link to="/new"><button className="headerBtn"> ADD A CREATOR </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App

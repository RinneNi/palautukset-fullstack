import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Tommone = styled.div`
width: 90%;
max-width: 800px;
margin: 20px auto;
padding: 20px;
background-color: #F62E33;
border: 1px solid #ccc;
transition: transform 0.2s;

&:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #A7055C;
}
`
const BlogTitle = styled.div`
  font-size: 24px;
  color: #FEFFED;
  text-align: center;
  font-weight: bold;
`

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} key={blog.id}>
      <Tommone>
        <div
          className="blog"
          key={blog.id}
        >
          <BlogTitle>
            {blog.title}
          </BlogTitle>
        </div>
      </Tommone>
    </Link>
  )
}

export default Blog

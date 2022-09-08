import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SearchPosts from "../components/searchPostsUseFlexSearch"
import { render } from "react-dom"

export default ({ data,navigate, location  }) => {
  console.log(data)
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const localSearchBlog = data.localSearchPages
  return (
    <Layout>
    <SearchPosts
      posts={posts}
      localSearchBlog={localSearchBlog}
      navigate={navigate}
      location={location}
    />

    
      
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th>
              <th>prettySize</th>
              <th>extension</th>
              <th>birthTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.prettySize}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchPages {
      index
      store
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
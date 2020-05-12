import React from "react"
import { Link, graphql } from "gatsby"
import styles from "../styles/index.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Julian Mclain" />
      <div className={styles.main}>
        <h1 className={styles.postCount}>
          {data.allMarkdownRemark.totalCount} Posts
        </h1>
        <ul>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <li key={node.id}>
              <span className={styles.postDate}>{node.frontmatter.date}</span>
              <Link to={node.fields.slug}>
                <h2 className={styles.postLink}>{node.frontmatter.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage

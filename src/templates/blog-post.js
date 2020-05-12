import React from "react"
import { graphql } from "gatsby"
import styles from "../styles/blog-post.module.css"
import Layout from "../components/layout"
import Container from "../components/container"

export default function Template({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <Container>
        <h1>{post.frontmatter.title}</h1>
        {/* insert small hr */}
        <h5 className={styles.date}>{post.frontmatter.date.toUpperCase()}</h5>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMM Do, YYYY")
      }
    }
  }
`

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // The actions.createNodeField fn is how you add fields to a node.
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // At this point we know `node` is a MarkdownRemark node.
    // Gatsby provides `createFilePath` fn for creating slugs.
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // Add slug to the MarkdownRemark node
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Graphql calls return a promise
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Iterate over the results and create a page for each
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables
        slug: node.fields.slug,
      },
    })
  })
}

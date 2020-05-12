// Gatsby supports TypeScript natively!
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"

const AboutPage = () => (
  <Layout>
    <Container>
      <SEO title="About" />
      <h1>Hi from the about page</h1>
      <p>Welcome to the blog</p>
      <Link to="/">Go back to the homepage</Link>
    </Container>
  </Layout>
)

export default AboutPage

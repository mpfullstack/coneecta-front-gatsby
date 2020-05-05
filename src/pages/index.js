import React from 'react'
import { Link } from 'gatsby'
import { Provider } from 'react-redux';
import store from '../redux/store';
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Provider store={store}>
    <Layout>
      <SEO title='Home' />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to='/professional/?id=1'>Go to professional profile</Link>
    </Layout>
  </Provider>
)

export default IndexPage

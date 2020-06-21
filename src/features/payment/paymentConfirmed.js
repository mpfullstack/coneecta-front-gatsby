import React from 'react';
import SEO from "../../components/seo"

export default ({ id }) => {
  return <div>
    <SEO title="Payment confirmed" />
    Payment confirmed: {id}
  </div>
}
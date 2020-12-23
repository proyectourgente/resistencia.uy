import React from "react"
import { Link } from "gatsby"
import ReactDiffViewer from 'react-diff-viewer';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const oldCode = `
 (Atentado contra el Presidente de la República) El que, con fines políticos y con actos directos, atentare contra la vida, la integridad personal, o la libertad del Presidente de la República, será castigado: en el caso de atentado a la vida, con cuatro a diez años de penitenciaría y en los demás casos con dos a nueve años. Si del hecho se derivare la muerte, la pena será de quince a treinta años de penitenciaría. (*) 
`;
const newCode = `
 (Atentado contra el Presidente de la República) El que, con fines políticos y con actos directos, atentare contra la vida, la integridad personal, o la libertad del Presidente de la República, será castigado: en el caso de atentado a la vida, con cuatro a diez años de penitenciaría y en los demás casos con dos a seis años. Si del hecho se derivare la muerte, la pena será de quince a treinta años de penitenciaría. 
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={false} hideLineNumbers={true} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage

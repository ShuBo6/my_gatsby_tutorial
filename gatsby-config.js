
const { isNil } = require('lodash')

const mapPagesUrls = {
  index: '/',
}

module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            // options: {
            //   extensions: [".mdx", ".md"],
            //   terminal: "carbon",
            // },
          },
        ],
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'pages',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',
        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        // engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.

        // query: `
        //   {
        //     allMarkdownRemark {
        //       nodes {
        //         id
        //         frontmatter {
        //           path
        //           title
        //         }
        //         rawMarkdownBody
        //       }
        //     }
        //   }
        // `,

        query: `query {
          allMarkdownRemark{
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
        }`,
        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'body'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields

        // store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMarkdownRemark.edges.map((edge) => ({
            id: edge.node.id,
            path: edge.node.fields.slug,
            title: edge.node.frontmatter.title,
            body: edge.node.excerpt,
          })),
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
          languages: [
              {
                  // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
                  name: 'en',
                  // A function for filtering nodes. () => true by default
                  // filterNodes: node => node.frontmatter.lang === 'en',
                  // Add to index custom entries, that are not actually extracted from gatsby nodes
                  // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
              },
              {
                  name: 'zh',
              },
          ],
          // Fields to index. If store === true value will be stored in index file.
          // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
          fields: [
              { name: 'title', store: true, attributes: { boost: 20 } },
              { name: 'slug', store: true},
              { name: 'body' },
          ],
          // How to resolve each field's value for a supported node type
          resolvers: {
              // For any node of type MarkdownRemark, list how to resolve the fields' values
              MarkdownRemark: {
                  title: node => node.frontmatter.title,
                  slug: (node) => node.fields.slug,
                  body: node => node.excerpt,
              },
          },
          //custom index file name, default is search_index.json
          filename: 'search_index.json',
          
      },
  },
  ],
}
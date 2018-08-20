import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

const POSTS_PER_PAGE = 10

function PostList ({
  data: {error, menuItems},
  loadMorePosts
}) {
  if (error) return <ErrorMessage message='Error loading posts.' />

  if (menuItems) {
    return (
      <section>
        <ul>
          {menuItems.map((menuItem, index) => (
            <li key={menuItem.name}>
              <div>
                <p>{menuItem.name}</p>
              </div>
            </li>
          ))}
        </ul>
        <style jsx>{`
          section {
            padding-bottom: 20px;
          }
          li {
            display: block;
            margin-bottom: 10px;
          }
          div {
            align-items: center;
            display: flex;
          }
          a {
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            padding-bottom: 0;
            border: 0;
          }
          span {
            font-size: 14px;
            margin-right: 5px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          button:before {
            align-self: center;
            border-style: solid;
            border-width: 6px 4px 0 4px;
            border-color: #ffffff transparent transparent transparent;
            content: '';
            height: 0;
            margin-right: 5px;
            width: 0;
          }
        `}</style>
      </section>
    )
  }
  return <div>Loading</div>
}

export const allPosts = gql`
  query ($term: String) {
    menuItems(matching: $term) {
      name
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  options: {
    variables: {
      term: "ffu"
    }
  },
  props: ({ data }) => {
    return ({
      data
    })
  }
})(PostList)

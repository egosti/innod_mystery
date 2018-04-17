/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const moment = require('moment');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  graphql(`
  {
    allContentfulBlogPost {
      edges {
        node {
          id
          title
          author
          date
          coverPhoto {
            file {
              url
              fileName
              contentType
            }
          }
          article {
            article
          }
        }
      }
    }
  }
  `).then(({
      data: {
        allContentfulBlogPost: {edges: blogPosts}
      }
    }) => {
    	// let blogPosts = queryResult.data.allContentfulBlogPost.edges;

      blogPosts.forEach((dataEntry, index) => {
      	let post = dataEntry.node; 
  	    createPage({
  	      // path: `/article/${moment(post.date).format('YYYY-MM-DD-hh-mm')}`,
  	      path: `/article/${index}`,
  	      component: path.resolve('src/templates/article.js'),
  	      context: { id: post.id }
  	    });
      });
    });
};
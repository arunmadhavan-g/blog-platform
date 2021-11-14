const {camelCase} = require("lodash");
const { Octokit } = require("@octokit/rest");
const frontmatterParser = require('@github-docs/frontmatter')
const renderContent = require('@github-docs/render-content')
const {pages} = require("./config")
const { formatDate } = require("./src/helpers/format");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}


const octokit = new Octokit({ 
  auth: process.env.GIT_TOKEN,
});

const downloadContent = async (owner, repo, path) => {
  const {data} =  (await octokit.rest.repos.getContent({
                    owner,
                    repo,
                    path,
                  }));
              
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

const getInfoJson = ({ publishedOn, ...others}) => ({
  ...others, 
  publishedOn: formatDate(publishedOn)
})

const dataNode = async (createNodeId, page, createContentDigest) => {
  const rawcontent = await downloadContent(page.owner, page.repo, page.file)
  const content = await renderContent(rawcontent, {})

  let data = {
      id: createNodeId(`${page.title}>> MultiGitSource`),
      children: [],
      internal: {
          type: `MultiGitSource`,
      },
      pageInfo: {
          ...getInfoJson(page),
          rawContent: rawcontent,
          content: content,
          pagePath: page.repo,
          location: camelCase(page.title)
      },
  }

  data.internal.contentDigest = createContentDigest(data)
  return data
}

exports.sourceNodes = async ({node, actions, createNodeId, createContentDigest}, pluginOptions) => {
  const {createNode} = actions

  const {data} = await octokit.request("GET /repos/{owner}/{repo}/contents", {
    owner: "arunmadhavan-g",
    repo: "Profile",
    path: "/"
  });

  (await Promise.all(data
  .filter(x => x.name.includes("Project"))
  .map(async x => ({...x, content: (await downloadContent( "arunmadhavan-g", "Profile", x.path))}))
  .map(async x => {
    const awaitedX = await x;
    const { data, content } = frontmatterParser(awaitedX.content);
    return ({
    id: createNodeId(`${awaitedX.name}-repoRecords`),
          children: [],
          internal: {
              type: `repoRecords`,
          },
          pageInfo: {
            ...awaitedX, 
            htmlContent: await renderContent(content, {}),
            frontmatter: data,
          },
    })
  })))
  .forEach(x => {
    createNode({...x, internal:{...x.internal, contentDigest: createContentDigest(x)}})
  })



  const pageData  = (await Promise.all(pages.map(async page => await dataNode(createNodeId, page, createContentDigest))))
  pageData.forEach(datum => {
      createNode(datum)
  })

  
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {

  (await graphql(`query MyQuery {
    allMultiGitSource {
      edges {
        node {
          pageInfo {
            title
            tags
            publishedOn
            location
            repo
            content
            pagePath
            owner
            file
          }
        }
      }
    }
  }
  `))
  .data
  .allMultiGitSource
  .edges
  .map(x => x.node.pageInfo)
  .forEach(page => {
    createPage({
      path: `/${page.location}`,
      component: require.resolve("./src/templates/content.js"),
      context: { ...page },
    })
  })


  const profileData = (await graphql(`query MyQuery {
    allRepoRecords {
      edges {
        node {
          pageInfo {
            htmlContent
            frontmatter {
              achievements
              company
              duration
              projectName
              role
              tech
            }
          }
        }
      }
    }
  }`))
  .data
  .allRepoRecords
  .edges
  .map(x => x.node.pageInfo)
  .map(x => ({...x.frontmatter, htmlContent: x.htmlContent}))

  createPage({
    path: `/About`,
    component: require.resolve("./src/templates/profile.js"),
    context: { profileData },
  })

}
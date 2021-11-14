const {camelCase} = require("lodash");
const { Octokit } = require("@octokit/rest");
const frontmatterParser = require('@github-docs/frontmatter')
const renderContent = require('@github-docs/render-content')
const {pages} = require("./config")

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

const getInfoJson = ({title, publishedOn, author, tags, description, owner}) => ({
  title,
  publishedOn,
  author,
  tags,
  description,
  owner
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
    const { data, content } = frontmatterParser((await x).content);
    return ({
    id: createNodeId(`${x.name}-repoRecords`),
          children: [],
          internal: {
              type: `repoRecords`,
          },
          pageInfo: {
            ...(await x), 
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
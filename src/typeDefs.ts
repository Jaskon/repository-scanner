const typeDefs = `#graphql
type RepoOverview {
    name: String
    owner: String
    size: Int
    obj: String
}

type RepoDetails {
    name: String
    owner: String
    fileCount: Int
    size: Int
    private: Boolean
    firstYmlFileContent: String
    webhooks: [String]
}

type Query {
    listRepos: [RepoOverview]
    getRepoDetails(repoName: String!): RepoDetails
}
`;

export default typeDefs;

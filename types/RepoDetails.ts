export default interface RepoDetails {
  name?: string
  owner?: string
  fileCount?: number
  size?: number
  private?: boolean
  firstYmlFileContent?: string
  [key: string]: any;
}

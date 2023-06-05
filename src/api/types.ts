import { Endpoints } from "@octokit/types";

export type Repos = Endpoints["GET /user/repos"]["response"];
export type RepoContent = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];

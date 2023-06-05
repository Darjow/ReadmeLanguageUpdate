import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";

const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

type Repos = Endpoints["GET /user/repos"]["response"];
type RepoContent = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];

export async function getRepositories(): Promise<Repos> {
  return await octokit.request("GET /user/repos", { type: "owner" });
}

export async function getRepoContent(owner: string, repo: string, path: string): Promise<string> {
  const response: RepoContent = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path,
    ref: "main",
  });

  const data = response.data as { content: string };
  return Buffer.from(data.content, "base64").toString();
}

export async function updateReadme(owner: string, path: string, content: string) {
  try {
    const response: RepoContent = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: owner,
      repo: owner,
      path: path,
      ref: "main",
    });
    const data = response.data as { content: string; sha: string };

    const readmeContent = Buffer.from(data.content, "base64").toString();

    const updatedContent = readmeContent.replace(
      /<!--START_SECTION:repo_distribution-->[\s\S]*<!--END_SECTION:repo_distribution-->/,
      content
    );

    if (readmeContent !== updatedContent) {
      console.log("Updating README ...");
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: owner,
        repo: owner,
        path: path,
        message: "Update repo coding distributions",
        content: Buffer.from(updatedContent).toString("base64"),
        sha: data.sha,
      });
      console.log("README successfully updated.");
    }
  } catch (error) {
    console.error("Error updating README:", error);
  }
}

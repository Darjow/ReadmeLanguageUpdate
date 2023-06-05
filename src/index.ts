import "dotenv/config";
import { getRepositories, updateReadme } from "./api/octokit";
import { calculateLanguageDistribution } from "./utils/languageUtils";
import { generateMarkdown } from "./utils/markdownUtils";

const OWNER = "Darjow";
const README = "README.md";

async function run() {
  try {
    const repositories = await getRepositories();
    const languagePercentages = calculateLanguageDistribution(repositories);
    const markdownOutput = generateMarkdown(languagePercentages);

    await updateReadme(OWNER, README, markdownOutput);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();

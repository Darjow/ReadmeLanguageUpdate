type Repos = import("@octokit/types").Endpoints["GET /user/repos"]["response"];

export function calculateLanguageDistribution(repositories: Repos): Record<string, number> {
  const languageDistribution: Record<string, number> = {};

  repositories.data.forEach((repo) => {
    const { language } = repo;
    if (language) {
      if (languageDistribution[language]) {
        languageDistribution[language] += 1;
      } else {
        languageDistribution[language] = 1;
      }
    }
  });

  const totalRepositories = repositories.data.length;
  const languagePercentages: Record<string, number> = {};

  for (const language in languageDistribution) {
    const percentage = parseFloat(((languageDistribution[language] / totalRepositories) * 100).toFixed(2));
    languagePercentages[language] = percentage;
  }

  return languagePercentages;
}

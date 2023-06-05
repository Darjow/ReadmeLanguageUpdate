export function generateMarkdown(languagePercentages: Record<string, number>) {
  const markdownStart = "<!--START_SECTION:repo_distribution-->\n\n";
  const markdownEnd = "\n\n<!--END_SECTION:repo_distribution-->";

  let output = markdownStart;

  if (Object.keys(languagePercentages).length === 0) {
    output += "```No repositories found.```";
    output += markdownEnd;
    return output;
  }

  for (const language in languagePercentages) {
    output += `- ${languagePercentages[language]}% ${language}\n`;
  }
  output += markdownEnd;

  return output;
}

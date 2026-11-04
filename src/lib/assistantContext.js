import {
  academicPath,
  normalizeDocuments,
  portfolioProjects,
  projectCategories,
  siteConfig,
  skillCategories,
  socialLinks,
  testimonials,
} from './portfolio';

const categoryLabels = Object.fromEntries(projectCategories.map((item) => [item.id, item.label]));

const trim = (text, max) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

const build = (descriptionLength) => {
  const lines = [];
  lines.push(`Identity: ${siteConfig.name}, ${siteConfig.role}. Portfolio: ${siteConfig.domain}.`);

  lines.push('Academic background (most recent to oldest, grades out of 20):');
  academicPath.forEach((step) => {
    const results = step.points
      .map((point) =>
        point.grade ? `${point.semester} ${point.grade} (${point.mention})` : `${point.semester} ${point.status}`
      )
      .join(', ');
    lines.push(
      `- ${step.title}, ${step.field}, ${step.institution}, ${step.ongoing ? 'ongoing' : step.date}: ${results}.`
    );
  });

  lines.push('Skills:');
  skillCategories.forEach((category) => {
    const names = [...category.skills.map((skill) => skill.label), ...category.extras.map((extra) => extra.label)];
    lines.push(`- ${category.label}: ${names.join(', ')}.`);
  });

  lines.push('Projects:');
  portfolioProjects.forEach((project) => {
    const links = [project.github ? 'GitHub' : null, project.website ? 'live website' : null]
      .filter(Boolean)
      .join(' and ');
    const description = project.description ? ` ${trim(project.description, descriptionLength)}` : '';
    lines.push(
      `- ${project.title} (${categoryLabels[project.category]}, ${project.dateLabel}, ${project.technologies.join('/')}${links ? `, ${links}` : ''}).${description}`
    );
  });

  lines.push('Documents:');
  normalizeDocuments(() => false).forEach((doc) => {
    lines.push(`- ${doc.title} (${doc.date.slice(0, 4)}).`);
  });

  lines.push('Testimonials:');
  testimonials.forEach((item) => {
    lines.push(`- ${item.name}, ${item.role}.`);
  });

  lines.push('Contact:');
  socialLinks.forEach((link) => {
    lines.push(`- ${link.name}: ${link.url}`);
  });

  return lines.join('\n');
};

const encodedLength = (text) => new URLSearchParams({ data: text }).toString().length;

export const buildAssistantContext = (maxEncodedLength = 8000) => {
  const lengths = [200, 150, 110, 80, 50, 0];
  let text = build(lengths[0]);
  for (let index = 1; index < lengths.length && encodedLength(text) > maxEncodedLength; index += 1) {
    text = build(lengths[index]);
  }
  return text;
};

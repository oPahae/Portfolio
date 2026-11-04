import { useMemo, useState } from 'react';
import {
  Award,
  Briefcase,
  ClipboardList,
  Download,
  Eye,
  FileText,
  FileX,
  GraduationCap,
  Languages,
  Search,
} from 'lucide-react';
import SectionHeading from './sectionHeading';
import { documentTypes } from '../lib/portfolio';
import { container, focusRing, panel, sectionSpacing, textLink } from '../lib/classes';

const typeIcons = {
  cv: FileText,
  diplome: GraduationCap,
  releve: ClipboardList,
  certificat: Award,
  langue: Languages,
  stage: Briefcase,
};

const filters = [{ id: 'all', label: 'All' }, ...documentTypes];

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function DocumentRow({ doc }) {
  const Icon = typeIcons[doc.type] ?? FileText;

  return (
    <li className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-paper text-violet-400 dark:bg-paper-dark dark:text-violet-500">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h4 className="font-medium">{doc.title}</h4>
          {doc.description ? (
            <p className="mt-0.5 text-sm text-muted dark:text-muted-dark">{doc.description}</p>
          ) : null}
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">
            {doc.provider ? `${doc.provider}, ` : ''}
            {doc.dateLabel}
          </p>
        </div>
      </div>

      {doc.available ? (
        <div className="flex shrink-0 gap-4 sm:pl-6">
          <a
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${doc.title} (new tab)`}
            className={textLink}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            Open
          </a>
          <a href={doc.file} download aria-label={`Download ${doc.title}`} className={textLink}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>
        </div>
      ) : (
        <p className="inline-flex shrink-0 items-center gap-2 text-sm text-muted dark:text-muted-dark sm:pl-6">
          <FileX className="h-4 w-4" aria-hidden="true" />
          File unavailable
        </p>
      )}
    </li>
  );
}

export default function DocumentsSection({ documents }) {
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const needle = normalize(query.trim());
    return documentTypes
      .filter((item) => type === 'all' || item.id === type)
      .map((item) => ({
        ...item,
        docs: documents.filter(
          (doc) =>
            doc.type === item.id &&
            (needle === '' ||
              normalize(`${doc.title} ${doc.description ?? ''} ${doc.provider ?? ''}`).includes(needle))
        ),
      }))
      .filter((group) => group.docs.length > 0);
  }, [documents, type, query]);

  const total = groups.reduce((sum, group) => sum + group.docs.length, 0);

  return (
    <section
      id="documents"
      aria-labelledby="titreDocuments"
      className={`${sectionSpacing} border-t border-line dark:border-line-dark`}
    >
      <div className={container}>
        <SectionHeading
          id="titreDocuments"
          title="Documents and certifications"
          description="Diplomas, transcripts, certifications, language tests and internship certificates, to quickly verify my qualifications."
        />

        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter documents by type" className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const selected = type === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setType(filter.id)}
                  aria-pressed={selected}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                    selected
                      ? 'border-ink bg-ink text-paper dark:border-ink-dark dark:bg-ink-dark dark:text-paper-dark'
                      : 'border-line text-muted hover:border-violet-400 hover:text-ink dark:border-line-dark dark:text-muted-dark dark:hover:border-violet-500 dark:hover:text-ink-dark'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="rechercheDocuments" className="sr-only">
              Search for a document
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-muted-dark"
              aria-hidden="true"
            />
            <input
              id="rechercheDocuments"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for a document"
              className={`w-full rounded-full border border-line bg-surface py-2.5 pl-11 pr-4 text-sm placeholder:text-muted dark:border-line-dark dark:bg-surface-dark dark:placeholder:text-muted-dark ${focusRing}`}
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {total} documents shown
        </p>

        {groups.length === 0 ? (
          <p className="text-muted dark:text-muted-dark">
            No documents match this search. Change the keyword or choose another type.
          </p>
        ) : (
          <div className="space-y-10">
            {groups.map((group) => (
              <div key={group.id}>
                <h3 className="mb-4 font-display text-xl font-semibold tracking-tight">{group.label}</h3>
                <ul className={`${panel} divide-y divide-line dark:divide-line-dark`}>
                  {group.docs.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

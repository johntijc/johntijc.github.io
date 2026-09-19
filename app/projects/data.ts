export type Project = {
  /** Unique, URL-friendly identifier, also used for links like /projects#my-project. */
  id: string
  title: string
  description: string
  /** Free-form date: "2025", "June 2025", or "2024 – Present". */
  date?: string
  /** Optional labeled details: role, collaborators, client, status, or impact. */
  details?: { label: string; value: string }[]
  tags?: string[]
  photos?: {
    /** Path relative to public/, e.g. "projects/my-project.jpg". */
    filename: string
    alt: string
    width: number
    height: number
    caption?: string
  }[]
  links?: { label: string; href: string }[]
}

// Edit this object to update the projects page. Projects appear in array order.
// Replace the example entries with your work; optional fields can be removed.
export const projectsPage: {
  title?: string
  description?: string
  projects: Project[]
} = {
  projects: [
    /*{
      id: 'example-project',
      title: '',
      description:
        '',
      date: '2026 – Present',
      details: [
        { label: 'Role', value: 'Designer & developer' },
        { label: 'Status', value: 'In progress' },
      ],
      tags: ['Electronics'],
      // Put your images in public/projects/ and add entries like this:
      photos: [
        {
          filename: 'example-project/electronics.jpg',
          alt: 'Describe what the photo shows',
          width: 1600,
          height: 1000,
          caption: 'An optional caption or photo credit.',
        },
      ],
      links: [{ label: 'Project website', href: 'https://example.com' }],
    },
    {
      id: 'another-example',
      title: 'Another example project',
      description:
        'A project can be as simple as a title and description. Add photos, links, dates, or other details when they help tell the story.',
      date: 'June 2024',
    },*/
  ],
}

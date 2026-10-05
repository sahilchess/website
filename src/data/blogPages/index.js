import { posts as processPosts } from './process/page'
import { posts as buildPosts } from './builds/page'
import { posts as notePosts } from './notes/page'

export const blogPageData = {
  title: 'blog',
  description: 'notes, experiments, and the occasional reflection from the workbench and the terminal.',
}

export const blogCategories = [
  { label: 'All', key: 'all' },
  { label: 'Builds', key: 'builds' },
  { label: 'Process', key: 'process' },
  { label: 'Notes', key: 'notes' },
]

export const blogEntries = [...processPosts, ...buildPosts, ...notePosts].sort(
  (firstPost, secondPost) => new Date(secondPost.date) - new Date(firstPost.date),
)

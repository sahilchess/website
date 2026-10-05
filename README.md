# Sahil's Website

Personal portfolio and writing site built with React 18 and Vite 5.

## Run Locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, or serve that build locally with `npm run preview`.

## Project Structure

```text
src/
	App.jsx                   Route handling and shared site shell
	components/               Shared page components and navigation
	data/
		pages/                  Content and metadata for the main site pages
		blogPages/              Blog post template and category content
	pages/                    React views for each route
	index.css                 Shared styles
```

The site uses client-side path routes such as `/home`, `/projects`, `/blog`, and `/blog/<slug>`. `src/App.jsx` maps those paths to page components. Keep content in `src/data/` and presentation/layout in `src/pages/` or `src/components/`.

## Page Data

Files in `src/data/pages/` hold the content for the main pages. For example, edit `home.js` for the home-page title and description, `projects.js` for project cards and category tabs, and `about.js` for About-page sections. `navigation.js` controls the primary navigation links, and `metadata.js` controls browser tab titles.

## Editing Blog Posts

Blog post data lives separately by category:

```text
src/data/blogPages/
	template.js
	index.js
	process/page.js
	builds/page.js
	notes/page.js
```

To add a post:

1. Copy the `blogPostTemplate` object from `template.js` into the `posts` array in the matching category's `page.js`.
2. Give it a unique URL-safe `slug`. The article route will be `/blog/<slug>`.
3. Set `category` to the folder's category key: `process`, `builds`, or `notes`.
4. Fill in `title`, `date`, `readTime`, `excerpt`, and `detail`. The archive uses the summaries; the article page uses the title and Markdown body.
5. Write the article in the `markdown` template string. Supported formatting includes `#` for the post title, `##` for sections, `###` for subsections, paragraphs, `-` bullet lists, and `>` blockquotes. The article title is rendered by the page, so the Markdown `#` line is omitted from the body. Section headings automatically appear in the article's contents sidebar.

`src/data/blogPages/index.js` combines the category arrays and sorts them newest first. Keep each post's category key and date consistent so filtering and archive ordering work correctly.

### Adding a Category

Create a folder such as `src/data/blogPages/essays/` with a `page.js` that exports a `posts` array. Then import and include that array in `src/data/blogPages/index.js`, and add the matching `{ label, key }` entry to `blogCategories`. Use the same key in each post's `category` field.


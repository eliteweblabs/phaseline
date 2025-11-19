import { config, fields, collection } from '@keystatic/core'

// Set NODE_ENV to production if not set (for Railway deployments)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

// Determine if we're in development mode
// Use explicit NODE_ENV check instead of import.meta.env.DEV which may not be reliable in SSR
// Only use local storage if NODE_ENV is explicitly 'development' (defaults to production on Railway)
const isDev = process.env.NODE_ENV === 'development'

export default config({
  // GitHub mode: Client edits commit directly to GitHub repo
  // Use local storage in development, GitHub storage in production
  storage: isDev
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: 'eliteweblabs',
          name: 'solid',
        },
      },

  ui: {
    brand: { name: 'Solid Builders' },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      path: 'src/content/blog/**',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        subtitle: fields.text({ label: 'Subtitle' }),
        pubDate: fields.date({
          label: 'Publication Date',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/assets/images/blog',
          publicPath: '/assets/images/blog/',
        }),
        video: fields.text({ label: 'Video URL' }),
        imageThumbnail: fields.image({
          label: 'Image Thumbnail',
          directory: 'public/assets/images/blog/thumbnails',
          publicPath: '/assets/images/blog/thumbnails/',
        }),
        videoThumbnail: fields.text({
          label: 'Video Thumbnail',
        }),
        body: fields.markdoc({
          label: 'Body',
          extension: 'md',
        }),
      },
    }),
    work: collection({
      label: 'Work',
      path: 'src/content/work/**',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        subtitle: fields.text({
          label: 'Subtitle',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          validation: { isRequired: true },
        }),
        list: fields.array(fields.text({ label: 'List Item' }), {
          label: 'List',
        }),
        imageThumbnail: fields.image({
          label: 'Image Thumbnail',
          directory: 'public/assets/images/work/thumbnails',
          publicPath: '/assets/images/work/thumbnails/',
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/assets/images/work',
          publicPath: '/assets/images/work/',
        }),
        video: fields.text({ label: 'Video URL' }),
        introduction: fields.object(
          {
            title: fields.text({
              label: 'Title',
              validation: { isRequired: true },
            }),
            subtitle: fields.text({
              label: 'Subtitle',
              validation: { isRequired: true },
            }),
            body: fields.text({
              label: 'Body',
              validation: { isRequired: true },
              multiline: true,
            }),
          },
          { label: 'Introduction' }
        ),
        whatWeDid: fields.object(
          {
            title: fields.text({
              label: 'Title',
              validation: { isRequired: true },
            }),
            subtitle: fields.text({
              label: 'Subtitle',
              validation: { isRequired: true },
            }),
            images: fields.array(
              fields.image({
                label: 'Image',
                directory: 'public/assets/images/work/what-we-did',
                publicPath: '/assets/images/work/what-we-did/',
              }),
              {
                label: 'Images',
              }
            ),
            body: fields.text({
              label: 'Body',
              validation: { isRequired: true },
              multiline: true,
            }),
          },
          { label: 'What We Did' }
        ),
        feedback: fields.object(
          {
            title: fields.text({
              label: 'Title',
              validation: { isRequired: true },
            }),
            subtitle: fields.text({
              label: 'Subtitle',
              validation: { isRequired: true },
            }),
            clientFeedback: fields.object(
              {
                blockquote: fields.text({
                  label: 'Blockquote',
                  validation: { isRequired: true },
                }),
                figcaption: fields.text({
                  label: 'Figcaption',
                  validation: { isRequired: true },
                }),
              },
              { label: 'Client Feedback' }
            ),
            body: fields.text({
              label: 'Body',
              validation: { isRequired: true },
              multiline: true,
            }),
          },
          { label: 'Feedback' }
        ),
        body: fields.markdoc({
          label: 'Work Post Body (Not required)',
          extension: 'md',
        }),
      },
    }),
  },
})

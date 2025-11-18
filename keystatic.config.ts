import { config, fields, collection } from '@keystatic/core'

export default config({
  // GitHub mode: Client edits commit directly to GitHub repo
  storage: {
    kind: 'github',
    repo: 'eliteweblabs/solid',
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
        image: fields.text({ label: 'Image URL' }),
        video: fields.text({ label: 'Video URL' }),
        imageThumbnail: fields.text({
          label: 'Image Thumbnail',
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
        imageThumbnail: fields.text({
          label: 'Image Thumbnail',
          validation: { isRequired: true },
        }),
        image: fields.text({ label: 'Image URL' }),
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
            images: fields.array(fields.text({ label: 'Image URL' }), {
              label: 'Images',
            }),
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

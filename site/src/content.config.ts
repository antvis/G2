import { defineCollection } from 'astro:content';
import { antvDocsLoader, antvDocsSchema } from '@antv/astro-theme-antv/content';

export const collections = {
  docs: defineCollection({
    loader: antvDocsLoader({ base: './docs' }),
    schema: antvDocsSchema,
  }),
};

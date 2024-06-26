import { Disc, Home, Tags, Users } from 'lucide-react';
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure';

import OGPreview from '~/sanity/components/OGPreview';
import { resolveOGUrl } from '~/sanity/structure/resolveOGUrl';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.listItem()
        .icon(Home)
        .id('home')
        .schemaType('home')
        .title('Home')
        .child(S.editor().id('home').schemaType('home').documentId('home')),
      S.listItem()
        .icon(Users)
        .id('profile')
        .schemaType('profile')
        .title('Profile')
        .child(
          S.editor().id('profile').schemaType('profile').documentId('profile')
        ),
      S.divider(),
      // Document lists
      S.documentTypeListItem('project').title('Projects').icon(Disc),
      S.divider(),
      S.documentTypeListItem('tag').title('Tags').icon(Tags),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: resolveOGUrl(documentId),
    })
    .title('OG Preview');

  switch (schemaType) {
    case `home`:
      return S.document().views([S.view.form()]);
    case `project`:
      return S.document().views([S.view.form(), OGPreviewView]);
    default:
      return S.document().views([S.view.form()]);
  }
};

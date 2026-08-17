/**
 * CatalogImage — catalog category photography with graceful fallback.
 *
 * Renders the local WebP photo at /assets/catalog/catalog-<slug>.webp
 * (4:3, e.g. catalog-olive-oil.webp). Until a photo file exists for a
 * category it falls back to the license-clean vector art in
 * <CategoryVisual>, so cards never show a broken image. No external
 * image sources are used — drop the 17 WebP files into
 * site/public/assets/catalog/ and they are picked up automatically.
 */
import { useState } from 'react'
import type { CategoryId } from '../data/catalog'
import CategoryVisual from './CategoryVisual'

export const CATALOG_IMAGE_PATH = (id: CategoryId) => `/assets/catalog/catalog-${id}.webp`

export default function CatalogImage({ id, name }: { id: CategoryId; name: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <CategoryVisual id={id} />
  return (
    <img
      src={CATALOG_IMAGE_PATH(id)}
      alt={name}
      loading="lazy"
      decoding="async"
      width={640}
      height={480}
      onError={() => setFailed(true)}
      className="size-full object-cover"
    />
  )
}
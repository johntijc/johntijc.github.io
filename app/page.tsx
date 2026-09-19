import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import fs from 'fs'
import path from 'path'

import { name, ownerProfile } from '@/config'
import { CustomMDX } from '@/components/mdx'

const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '')

function getPublicAsset(filename: string) {
  const normalizedFilename = filename.trim().replace(/^\/+/, '')
  return normalizedFilename ? `${basePath}/${normalizedFilename}` : null
}

export default function Page() {
  const photoSrc = getPublicAsset(ownerProfile.photo.filename)
  const introDirectory = path.join(process.cwd(), 'app', 'components')
  const source = fs.readFileSync(path.join(introDirectory, 'intro.mdx'), 'utf-8')

  return (
    <section className="grid items-start gap-8 sm:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="min-w-0 space-y-6 font-mono" aria-label={`Profile of ${name}`}>
        <div className="relative aspect-square w-56 overflow-hidden rounded-sm bg-muted sm:w-full">
          {photoSrc && (
            <Image
              src={photoSrc}
              alt={ownerProfile.photo.alt}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <dl className="space-y-4 text-xs">
          {ownerProfile.facts.map((fact) => (
            <div key={fact.label} className="space-y-1">
              <dt className="font-medium text-foreground">{fact.label}</dt>
              <dd className="break-words text-muted-foreground">
                {'href' in fact ? (
                  <a
                    href={fact.href as string|undefined}
                    className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        {ownerProfile.links.length > 0 && (
          <nav aria-labelledby="profile-links-heading" className="space-y-2 text-xs">
            <h2 id="profile-links-heading" className="font-medium text-foreground">
              {ownerProfile.linksTitle}
            </h2>
            <ul className="space-y-1 leading-tight">
              {ownerProfile.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex w-fit max-w-full items-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <span className="min-w-0 break-words underline decoration-border underline-offset-4">{link.label}</span>
                    <ArrowUpRight className="size-3 shrink-0 -translate-y-px" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>

      <div className="prose min-w-0 max-w-none break-words">
        <CustomMDX dir={introDirectory} source={source} />
      </div>
    </section>
  )
}

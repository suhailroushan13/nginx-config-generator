import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 text-sm text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <>
                <Link
                  href={item.href}
                  itemProp="item"
                  className="hover:text-foreground focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
                <meta itemProp="position" content={String(i + 1)} />
              </>
            ) : (
              <>
                <span itemProp="name" className="text-foreground">
                  {item.label}
                </span>
                <meta itemProp="position" content={String(i + 1)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

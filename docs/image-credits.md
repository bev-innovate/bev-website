# Image credits

Most photography on the site is Better Earth Ventures' own. The exceptions are the three
sector photographs below, sourced through [Openverse](https://openverse.org) and filtered
to **CC0 / Public Domain Mark** only: commercial use is permitted and no attribution is
required. They are recorded here anyway, so provenance is never a question later.

All three are Asia-Pacific.

| File | Subject | Source | Licence |
| --- | --- | --- | --- |
| `public/images/sectors-clean-cities.webp` | Buona Vista MRT, Singapore | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Buona-Vista-MRT-Station-04-fws.jpg) | CC0 |
| `public/images/sectors-circularity.webp` | Metal scrap yard, Daikoku Pier, Yokohama, Japan | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Metal_scrap_yard_on_Daikoku_Pier_3.jpg) | CC0 |
| `public/images/sectors-industrial-decarbonisation.webp` | Industrial area, Kawasaki, Japan | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Industrial_area_in_Kawasaki_14.jpg) | CC0 |

Each is written at 1600px and 800px (`-sm`), WebP quality 82, matching what
`npm run images` produces for the rest of the library.

## Replacing them

These are stand-ins for the sectors where Better Earth Ventures has no photography of its
own yet. Swap the file in place and nothing else needs to change: the paths are referenced
once each, from `verticals` in `src/lib/seed-content.ts`. Delete the row here when a real
photograph replaces one.

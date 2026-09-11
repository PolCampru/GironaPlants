# Image credits

Photos added to `public/images/plants/` for the home page "Our plants" cards.
All are **CC0 1.0 / public domain**: free for commercial use, no attribution
required, no permission needed. They were found through the Openverse API
(`api.openverse.org`) filtered to `license=cc0,pdm`, then centre-cropped to
5:4 and re-encoded at 1000x800, JPEG q82.

The provenance below is recorded for traceability only — the licence does not
oblige us to publish it.

| File | Card | Licence | Source | Original |
| --- | --- | --- | --- | --- |
| `rootedCuttings.jpg` | Catalogue card, no cover | CC0 1.0 | rawpixel | [Potted plants](https://www.rawpixel.com/image/8726059/potted-plants) |
| `groundcovers.jpg` | Groundcovers | CC0 1.0 | wordpress | [The green ground cover plant Periwinkle (en), Immergrün (de) (Vinca minor) with a single purple flower in detail.](https://wordpress.org/photos/photo/419660d058/) |
| `grasses.jpg` | Grasses | CC0 1.0 | wordpress | [Lush ornamental grass with green and white variegated leaves flowing outward. Photographed in Washington Park, Portland.](https://wordpress.org/photos/photo/12468d2a1a/) |
| `aquatic.jpg` | Aquatic plants | CC0 1.0 | rawpixel | [Pink water lily](https://www.rawpixel.com/image/6019804/pink-water-lily-free-public-domain-cc0-image) |
| `ferns.jpg` | Catalogue card, no cover | CC0 1.0 | stocksnap | [Ferns Green](https://stocksnap.io/photo/ferns-green-2G7YH4XHF5) |
| `nursery.jpg` | Others | CC0 1.0 | rawpixel | [Plant nursery, Whitebark Pine restoration](https://www.rawpixel.com/image/8733874/photo-image-plants-tree-public-domain) |

Photos added to `public/images/` for the home hero and to
`public/images/aboutUs/` for the About Us mosaic. Every one of these slots
previously reused a photograph that already appeared elsewhere on the site
(the hero showed the Lavandula card's picture; the mosaic showed the Quercus
and Juniperus cards, plus the Contact aside). All are **CC0 1.0 or public
domain** (US federal works are PD by statute): free for commercial use, no
attribution required. Found through the Wikimedia Commons API filtered to
CC0/PD, then centre-cropped to the slot's aspect and re-encoded at JPEG q82.

| File | Slot | Licence | Author | Original |
| --- | --- | --- | --- | --- |
| `nurseryRows.jpg` | Home hero | Public domain (USDA) | U.S. Department of Agriculture | [20170831-OSEC-LSC-0144](https://commons.wikimedia.org/wiki/File:20170831-OSEC-LSC-0144_(36915132991).jpg) |
| `aboutUs/glasshouse.jpg` | About Us mosaic, tall tile | CC0 1.0 | Faust002 | [The interior of small Greenhouse in Hortus Botanicus of Amsterdam](https://commons.wikimedia.org/wiki/File:The_interior_of_small_Greenhouse_in_Hortus_Botanicus_of_Amsterdam.jpg) |
| `aboutUs/seedlingTrays.jpg` | About Us mosaic | Public domain (USFS) | Forest Service Northern Region | [Aspen seedlings at the Coeur d'Alene Nursery](https://commons.wikimedia.org/wiki/File:Aspen_seedlings_at_the_Coeur_d%27Alene_Nursery_(50826119622).jpg) |
| `aboutUs/potRows.jpg` | About Us mosaic | CC0 1.0 | Rohitjahnavi | [Olea dioica seedlings nursery, restoration](https://commons.wikimedia.org/wiki/File:Olea_dioica_seedlings_nursery,_restoration.jpg) |
| `aboutUs/conifers.jpg` | About Us mosaic | CC0 1.0 | Daderot | [Picea pungens - witch's broom seedlings - Stanley M. Rowe Arboretum](https://commons.wikimedia.org/wiki/File:Picea_pungens_-_witch%27s_broom_seedlings_-_Stanley_M._Rowe_Arboretum_-_DSC03514.JPG) |

`mainCatalogue.jpg` is ours: the general-catalogue cover is composed from
`lavenders.jpg` (the same photograph the Lavandula card uses) under the brand
green, set in the site's own faces — Newsreader for the wordmark, Manrope for
everything else. It carries no third-party licence beyond that photograph's.

Other pre-existing photos (`hazelnut.jpg`, `redCedar.jpg`, `lavenders.jpg`
and `aboutUs/ilex.jpg`) are unchanged and are not covered by this file. The
local catalogue covers that Strapi's uploads replaced — `productionCatalogue`,
`availableCatalog` and `perennialsCatalog` — were deleted once nothing
referenced them; they are in the git history if they are ever wanted back.

Each photograph is now used in exactly one on-page slot. `lavenders.jpg` is
the only one that appears twice, and the second use is the Open Graph /
structured-data image, which never renders next to the Lavandula card.

The two `plants/` photographs left over from the category cards are the
fallback covers a catalogue gets when the CMS has none — see `CatalogueCard`.

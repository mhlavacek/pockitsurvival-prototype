export type Category = {
  id: string
  slug: string
  name: string
  parentId?: string
  color: string
}

export type Product = {
  id: string
  slug: string
  name: string
  price: number
  categoryId: string
  description: string
  keywords: string[]
  stockCount: number
  isBestSeller: boolean
  isNewProduct: boolean
  videoUrl?: string
  competitorPrice?: number
  metaDescription?: string
  imageUrl?: string
}

export type Promotion = {
  id: string
  title: string
  description: string
  threshold: number
}

export const categories: Category[] = [
  { id: 'consumables',    slug: 'consumables',    name: 'Consumables',           color: '#4a7c59' },
  { id: 'containers',     slug: 'containers',     name: 'Containers',            color: '#7c4a4a' },
  { id: 'edc',            slug: 'edc',            name: 'EDC',                   color: '#4a5c7c' },
  { id: 'fire',           slug: 'fire',           name: 'Fire',                  color: '#c65c00' },
  { id: 'first-aid',      slug: 'first-aid',      name: 'First Aid',             color: '#c60000' },
  { id: 'navigation',     slug: 'navigation',     name: 'Navigation & Rescue',   color: '#3a7c7c' },
  { id: 'repair',         slug: 'repair',         name: 'Repair & Maintenance',  color: '#5c5c7c' },
  { id: 'survival-cards', slug: 'survival-cards', name: 'Survival Cards',        color: '#7c6a3a' },
  { id: 'tools',          slug: 'tools',          name: 'Tools',                 color: '#4a4a4a' },
  { id: 'trap-hunt',      slug: 'trap-hunt',      name: 'Trap & Hunt',           color: '#5c7c3a' },
  // Sub-categories
  { id: 'fire-starters',  slug: 'fire-starters',  name: 'Fire Starters', parentId: 'fire',  color: '#c65c00' },
  { id: 'fire-tools',     slug: 'fire-tools',     name: 'Fire Tools',    parentId: 'fire',  color: '#c65c00' },
  { id: 'cutting-tools',  slug: 'cutting-tools',  name: 'Cutting Tools', parentId: 'tools', color: '#4a4a4a' },
  { id: 'multi-tools',    slug: 'multi-tools',    name: 'Multi-Tools',   parentId: 'tools', color: '#4a4a4a' },
]

export const products: Product[] = [
  {
    id: '1', slug: 'super-sharpie-vault', name: 'Super Sharpie Vault',
    price: 5, categoryId: 'fire',
    description: 'A waterproof, fire-resistant vault for your strike-anywhere matches. Compact enough for any pocket kit.',
    keywords: ['fire', 'matches', 'waterproof', 'vault'],
    stockCount: 47, isBestSeller: false, isNewProduct: true, competitorPrice: 8.99,
    metaDescription: 'Waterproof match vault for pocket survival kits.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/PXL_20260207_160706827.MP_-300x300.jpg',
  },
  {
    id: '2', slug: 'pocket-folding-saw-130', name: 'Pocket Folding Saw (130mm)',
    price: 15, categoryId: 'tools',
    description: 'Aggressive TiN-coated blade tackles branches up to 3 inches. Folds safely into a compact package.',
    keywords: ['saw', 'cutting', 'folding', 'survival'],
    stockCount: 23, isBestSeller: false, isNewProduct: true, competitorPrice: 22.50,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    metaDescription: '130mm folding pocket saw for field use.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/PXL_20260207_161018062.MP_-300x300.jpg',
  },
  {
    id: '3', slug: 'pocket-folding-saw-95', name: 'Pocket Folding Saw (95mm)',
    price: 6, categoryId: 'tools',
    description: 'Compact version of our folding saw. Perfect for lighter duty cutting tasks in the field.',
    keywords: ['saw', 'cutting', 'folding', 'compact'],
    stockCount: 31, isBestSeller: false, isNewProduct: true, competitorPrice: 10.99,
    metaDescription: '95mm compact folding pocket saw.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/pocket-folding-saw-01-300x300.webp',
  },
  {
    id: '4', slug: 'hex-bit-ratchet-combo', name: 'Hex Bit Ratchet Combo',
    price: 10, categoryId: 'tools',
    description: 'Micro ratchet with 6 hex bits. Fits standard 1/4" bits. Indispensable for field repairs.',
    keywords: ['ratchet', 'hex', 'repair', 'tool'],
    stockCount: 18, isBestSeller: false, isNewProduct: true, competitorPrice: 15.99,
    metaDescription: 'Compact hex bit ratchet for field repairs.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/hex-ratchet-combo-01-300x300.webp',
  },
  {
    id: '5', slug: 'caliper-card', name: 'Caliper Card',
    price: 6, categoryId: 'tools',
    description: 'Credit card-sized stainless steel caliper. Measures up to 3 inches with 1/32 inch precision.',
    keywords: ['caliper', 'measure', 'card', 'edc'],
    stockCount: 55, isBestSeller: false, isNewProduct: true, competitorPrice: 9.99,
    metaDescription: 'Pocket-sized stainless caliper card.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/caliper-card-01-300x300.webp',
  },
  {
    id: '6', slug: 'folding-butter-knife', name: 'Folding Butter Knife',
    price: 2, categoryId: 'consumables',
    description: 'Lightweight folding butter knife for meals on the go. Doubles as a food prep tool.',
    keywords: ['knife', 'utensil', 'food', 'folding'],
    stockCount: 80, isBestSeller: false, isNewProduct: true, competitorPrice: 4.50,
    metaDescription: 'Compact folding butter knife for field meals.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/folding-butter-knife-01-300x300.webp',
  },
  {
    id: '7', slug: 'braided-wire-saw', name: 'Braided Wire Saw',
    price: 4, categoryId: 'tools',
    description: '24 inches of high-tensile braided stainless wire. Cuts wood, bone, and soft metals with pull-tab handles.',
    keywords: ['saw', 'wire', 'survival', 'cutting'],
    stockCount: 62, isBestSeller: false, isNewProduct: true, competitorPrice: 7.99,
    metaDescription: 'High-tensile braided wire saw for survival use.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/braided-wire-saw-01-1-300x300.webp',
  },
  {
    id: '8', slug: 'sidekick-salve', name: 'Sidekick Salve',
    price: 5, categoryId: 'first-aid',
    description: 'Multi-purpose healing salve with beeswax and essential oils. Treats cuts, chafing, dry skin, and minor burns.',
    keywords: ['salve', 'healing', 'first-aid', 'skin'],
    stockCount: 34, isBestSeller: false, isNewProduct: true, competitorPrice: 8.99,
    metaDescription: 'Natural healing salve for field first aid.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/PocKit-Survival-Sidekick-Salve-300x300.jpg',
  },
  {
    id: '9', slug: 'covert-safety-pin', name: 'Covert Safety Pin',
    price: 1, categoryId: 'consumables',
    description: 'Heavy-duty 2-inch stainless safety pin with locking clasp. 10x stronger than standard pins.',
    keywords: ['safety-pin', 'repair', 'fasten', 'edc'],
    stockCount: 120, isBestSeller: false, isNewProduct: true, competitorPrice: 2.99,
    metaDescription: 'Heavy-duty stainless covert safety pin.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/covert-safety-pin-01-300x300.webp',
  },
  {
    id: '10', slug: 'zorro-lighter-polished', name: 'Zorro 588 Brass Lighter (Polished)',
    price: 15, categoryId: 'fire',
    description: 'Butane-filled brass lighter with mirror polish. Windproof flame, refillable, built to last a lifetime.',
    keywords: ['lighter', 'fire', 'brass', 'windproof'],
    stockCount: 29, isBestSeller: false, isNewProduct: true, competitorPrice: 24.99,
    metaDescription: 'Polished brass windproof butane lighter.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2025/11/zerro-mini-punk-polished-01-300x300.jpg',
  },
  {
    id: '11', slug: 'zorro-lighter-brushed', name: 'Zorro 588 Brass Lighter (Brushed)',
    price: 15, categoryId: 'fire',
    description: 'Same great Zorro 588 in a brushed brass finish. Refined matte look for the discerning EDC enthusiast.',
    keywords: ['lighter', 'fire', 'brass', 'brushed'],
    stockCount: 17, isBestSeller: false, isNewProduct: true, competitorPrice: 24.99,
    metaDescription: 'Brushed brass windproof butane lighter.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2025/10/PXL_20251016_150242933-300x300.jpg',
  },
  {
    id: '12', slug: 'fire-blow-tube-xl', name: 'Fire Blow Tube XL',
    price: 4, categoryId: 'fire',
    description: 'Extended 8-inch blow tube for targeted airflow when building a fire. Collapsible and featherlight.',
    keywords: ['fire', 'blow', 'tube', 'tinder'],
    stockCount: 43, isBestSeller: false, isNewProduct: true, competitorPrice: 6.99,
    metaDescription: 'Extended collapsible fire blow tube.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/PXL_20260203_154215721.MP2_-300x300.jpg',
  },
  {
    id: '13', slug: 'safety-pin-large', name: 'Safety Pin Large',
    price: 1, categoryId: 'consumables',
    description: 'Classic 2-inch safety pin. Versatile for gear repair, first aid, and improvised solutions.',
    keywords: ['safety-pin', 'repair', 'consumable'],
    stockCount: 200, isBestSeller: true, isNewProduct: false, competitorPrice: 1.99,
    metaDescription: 'Durable large safety pin for gear and field repairs.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/large-bronze-safety-pin-01-300x300.webp',
  },
  {
    id: '14', slug: 'folding-spoon', name: 'Folding Spoon',
    price: 3, categoryId: 'consumables',
    description: 'Titanium-coated folding spoon. Lightweight, rust-proof, and packable for any kit.',
    keywords: ['utensil', 'spoon', 'folding', 'lightweight'],
    stockCount: 76, isBestSeller: true, isNewProduct: false, competitorPrice: 5.99,
    metaDescription: 'Compact folding spoon for field meals.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_143502698.jpg',
  },
  {
    id: '15', slug: 'led-photon-micro-light', name: 'LED Photon Micro-Light',
    price: 2, categoryId: 'tools',
    description: 'Ultra-compact LED keychain light. 100+ hour battery life, waterproof to 100 feet.',
    keywords: ['light', 'led', 'micro', 'keychain'],
    stockCount: 89, isBestSeller: true, isNewProduct: false, competitorPrice: 4.99,
    metaDescription: 'Ultra-compact waterproof LED keychain light.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_143107492-300x300.jpg',
  },
  {
    id: '16', slug: 'folding-fork', name: 'Folding Fork',
    price: 3, categoryId: 'consumables',
    description: 'Titanium-coated folding fork. Pairs perfectly with our Folding Spoon for a complete field cutlery set.',
    keywords: ['utensil', 'fork', 'folding', 'lightweight'],
    stockCount: 71, isBestSeller: true, isNewProduct: false, competitorPrice: 5.99,
    metaDescription: 'Compact folding fork for field meals.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_142832130-300x300.jpg',
  },
  {
    id: '17', slug: 'mini-permanent-marker', name: 'Mini Permanent Marker',
    price: 1, categoryId: 'consumables',
    description: 'Waterproof mini marker. Mark maps, label gear, write emergency info. Never runs dry in field tests.',
    keywords: ['marker', 'write', 'waterproof', 'edc'],
    stockCount: 150, isBestSeller: true, isNewProduct: false, competitorPrice: 2.49,
    metaDescription: 'Waterproof mini permanent marker for EDC.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_141015829-300x300.jpg',
  },
  {
    id: '18', slug: 'spice-tubes-5ml', name: 'Spice Tubes 5ml',
    price: 1, categoryId: 'containers',
    description: 'Watertight 5ml tube for spices, salt, pepper, or small items. Screw-top lid holds a solid seal.',
    keywords: ['container', 'tube', 'storage', 'waterproof'],
    stockCount: 95, isBestSeller: true, isNewProduct: false, competitorPrice: 2.99,
    metaDescription: 'Watertight 5ml tubes for spices and small items.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240627_135736663-300x300.jpg',
  },
  {
    id: '19', slug: 'pockit-survival-tin', name: 'PocKit Survival Tin',
    price: 2, categoryId: 'containers',
    description: 'The original PocKit Survival Tin. Premium hinged tin, 3.5" x 2.5". The foundation of your pocket kit.',
    keywords: ['tin', 'container', 'kit', 'storage'],
    stockCount: 110, isBestSeller: true, isNewProduct: false, competitorPrice: 5.99,
    metaDescription: 'The original PocKit hinged survival tin.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/pockit-survival-tin-01-300x300.webp',
  },
  {
    id: '20', slug: 'ranger-bands-x5', name: 'Ranger Bands x5',
    price: 1, categoryId: 'consumables',
    description: '5 heavy-duty rubber ranger bands. Wrap gear, make improvised slings, mark water levels. Endless uses.',
    keywords: ['rubber-band', 'ranger', 'secure', 'versatile'],
    stockCount: 180, isBestSeller: true, isNewProduct: false, competitorPrice: 3.99,
    metaDescription: '5-pack heavy-duty rubber ranger bands.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2026/02/ranger-bands-01-300x300.webp',
  },
  {
    id: '21', slug: 'fire-blow-tube', name: 'Fire Blow Tube',
    price: 4, categoryId: 'fire',
    description: 'Compact 5-inch blow tube. Delivers controlled airflow to kindle stubborn tinder bundles.',
    keywords: ['fire', 'blow', 'tinder', 'compact'],
    stockCount: 58, isBestSeller: true, isNewProduct: false, competitorPrice: 6.50,
    metaDescription: 'Compact 5-inch fire blow tube.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_142853338-300x300.jpg',
  },
  {
    id: '22', slug: 'fire-picks-x5', name: 'Fire Picks x5',
    price: 1, categoryId: 'fire',
    description: '5 waxed hemp fire picks. Each burns for 5+ minutes in wind and light rain. Ideal tinder supplement.',
    keywords: ['fire', 'tinder', 'picks', 'wax'],
    stockCount: 145, isBestSeller: true, isNewProduct: false, competitorPrice: 3.99,
    metaDescription: '5-pack waxed hemp fire picks.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_141918379.MP_-300x300.jpg',
  },
  {
    id: '23', slug: 'instant-towels-x3', name: 'Instant Towels x3',
    price: 1, categoryId: 'consumables',
    description: '3 compressed coin towels. Add a few drops of water to expand to a full-size towel. Reusable.',
    keywords: ['towel', 'compress', 'hygiene', 'lightweight'],
    stockCount: 200, isBestSeller: true, isNewProduct: false, competitorPrice: 2.99,
    metaDescription: '3-pack compressed reusable coin towels.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240621_143045787-300x300.jpg',
  },
  {
    id: '24', slug: 'glow-sticks-mini-5pack', name: 'Glow Sticks Mini 5-Pack',
    price: 1, categoryId: 'fire',
    description: '5 mini glow sticks with 8-hour glow life. Mark trails, signal for rescue, or light your camp area.',
    keywords: ['glow', 'light', 'signal', 'emergency'],
    stockCount: 130, isBestSeller: true, isNewProduct: false, competitorPrice: 3.49,
    metaDescription: '5-pack mini 8-hour glow sticks.',
    imageUrl: 'https://pockitsurvival.com/wp-content/uploads/2024/06/PXL_20240610_203858814.MP2_-300x300.jpg',
  },
]

export const promotions: Promotion[] = [
  { id: 'free-tin',      title: 'Free PocKit Survival Tin', description: 'Free tin on orders $25+',      threshold: 25 },
  { id: 'free-shipping', title: 'Free Shipping',            description: 'Free shipping on orders $75+', threshold: 75 },
]

// Helpers
export function getTopLevelCategories(): Category[] {
  return categories.filter(c => !c.parentId)
}

export function getSubCategories(parentId: string): Category[] {
  return categories.filter(c => c.parentId === parentId)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit)
}

export function getBestSellers(limit = 12): Product[] {
  return products.filter(p => p.isBestSeller).slice(0, limit)
}

export function getNewProducts(limit = 12): Product[] {
  return products.filter(p => p.isNewProduct).slice(0, limit)
}

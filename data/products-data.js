const PRODUCTS = [
  { id: 1, name: 'Silk Slip Dress', brand: 'Atelier Blanc', price: 24900, category: 'Women', sub: 'Dresses', emoji: '👗', badge: 'New', colors: ['#f5f0e8', '#c44040', '#1a1a1a'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 2, name: 'Linen Wrap Dress', brand: 'Maison Dora', price: 17900, category: 'Women', sub: 'Dresses', emoji: '🌸', colors: ['#c9b8a0', '#7a8c5a'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 3, name: 'Cashmere Blazer', brand: 'Atelier Blanc', price: 45900, category: 'Women', sub: 'Jackets', emoji: '🧥', colors: ['#6b4c3b', '#1a1a1a', '#f5f0e8'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 4, name: 'Oxford Shirt', brand: 'Savile Co.', price: 12900, category: 'Men', sub: 'Shirts', emoji: '👔', badge: 'New', colors: ['#f5f0e8', '#3a5a7c', '#1a1a1a'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Wool Overcoat', brand: 'Savile Co.', price: 62900, category: 'Men', sub: 'Outerwear', emoji: '🧥', colors: ['#6b4c3b', '#1a1a1a'], sizes: ['M', 'L', 'XL'] },
  { id: 6, name: 'Leather Tote', brand: 'Atelier Blanc', price: 34900, category: 'Accessories', sub: 'Bags', emoji: '👜', badge: 'New', colors: ['#6b4c3b', '#1a1a1a'], sizes: ['One Size'] },
  { id: 7, name: 'Gold Necklace', brand: 'Maison Dora', price: 18900, category: 'Accessories', sub: 'Jewelry', emoji: '📿', colors: ['#c9a96e'], sizes: ['One Size'] },
  { id: 8, name: 'Merino Turtleneck', brand: 'Maison Dora', price: 18900, category: 'Men', sub: 'Knitwear', emoji: '🧶', colors: ['#1a1a1a', '#7a8c5a'], sizes: ['S', 'M', 'L'] },
  { id: 9, name: 'Ruched Blouse', brand: 'Fil Rouge', price: 11900, category: 'Women', sub: 'Tops', emoji: '🌷', badge: 'Sale', originalPrice: 15900, colors: ['#c44040', '#f5f0e8'], sizes: ['XS', 'S', 'M'] },
  { id: 10, name: 'Pleated Trousers', brand: 'Studio', price: 19500, category: 'Women', sub: 'Trousers', emoji: '👖', colors: ['#1a1a1a', '#6b4c3b'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 11, name: 'Slim Suit Jacket', brand: 'Savile Co.', price: 48900, category: 'Men', sub: 'Suits', emoji: '🕴️', colors: ['#1a1a1a', '#3a5a7c'], sizes: ['S', 'M', 'L'] },
  { id: 12, name: 'Silk Scarf', brand: 'Fil Rouge', price: 8900, category: 'Accessories', sub: 'Scarves', emoji: '🧣', colors: ['#c44040', '#c9b8a0'], sizes: ['One Size'] },
  { id: 13, name: 'Denim Jacket', brand: 'Studio', price: 25900, category: 'Men', sub: 'Outerwear', emoji: '🔵', colors: ['#3a5a7c'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 14, name: 'Crossbody Bag', brand: 'Atelier Blanc', price: 22900, category: 'Accessories', sub: 'Bags', badge: 'Sale', originalPrice: 32900, emoji: '👝', colors: ['#6b4c3b', '#c9b8a0'], sizes: ['One Size'] },
  { id: 15, name: 'Knit Midi Skirt', brand: 'Fil Rouge', price: 13900, category: 'Women', sub: 'Skirts', emoji: '💫', colors: ['#8a7aa0', '#1a1a1a'], sizes: ['XS', 'S', 'M', 'L'] }
];

const CATEGORIES = ['All', 'Women', 'Men', 'Accessories', 'Sale'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const COLORS = [
  { hex: '#f5f0e8', name: 'Ivory' },
  { hex: '#1a1a1a', name: 'Black' },
  { hex: '#c44040', name: 'Red' },
  { hex: '#3a5a7c', name: 'Navy' },
  { hex: '#c9a96e', name: 'Gold' },
  { hex: '#7a8c5a', name: 'Olive' },
  { hex: '#6b4c3b', name: 'Brown' }
];
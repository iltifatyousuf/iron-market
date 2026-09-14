// ============================================================================
// IRONMARKET — Heavy Machinery Affiliate Marketplace
// Core Data Types
// ============================================================================

export enum ListingStatus {
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
}

export enum Condition {
  NEW = 'New',
  USED = 'Used',
  CERTIFIED_PRE_OWNED = 'Certified Pre-Owned',
  REFURBISHED = 'Refurbished',
}

export interface Specification {
  label: string;
  value: string;
  unit?: string;
}

export interface Seller {
  name: string;
  type: 'Dealer' | 'Manufacturer' | 'Marketplace' | 'Private';
  location: string;
  verified: boolean;
}

export interface Equipment {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  categorySlug: string;
  year: number;
  hours: number;
  condition: Condition;
  price: number;
  currency: string;
  location: string;
  country: string;
  seller: Seller;
  images: string[];
  description: string;
  features: string[];
  specifications: Specification[];
  affiliateUrl: string;
  affiliateNetwork: string;
  status: ListingStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  listingCount: number;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  country: string;
  listingCount: number;
  description: string;
  founded: number;
}

export interface IndustryType {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  equipmentTypes: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: number;
  publishedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FilterState {
  category: string;
  brand: string;
  condition: string;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  location: string;
  hoursMax: number;
  seller: string;
  search: string;
  sort: 'newest' | 'price-asc' | 'price-desc' | 'relevant';
}

import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

// ─── Equipment Table ───────────────────────────────────────
export const equipment = pgTable('equipment', {
  id:               uuid('id').primaryKey().defaultRandom(),
  slug:             text('slug').unique().notNull(),
  brand:            text('brand').notNull(),
  model:            text('model').notNull(),
  category:         text('category').notNull(),
  categorySlug:     text('category_slug').notNull(),
  year:             integer('year').notNull(),
  hours:            integer('hours').default(0),
  condition:        text('condition').notNull(),
  price:            decimal('price', { precision: 12, scale: 2 }).notNull(),
  currency:         text('currency').default('USD'),
  location:         text('location').notNull(),
  country:          text('country').notNull(),
  sellerName:       text('seller_name'),
  sellerType:       text('seller_type'),
  sellerLocation:   text('seller_location'),
  sellerVerified:   boolean('seller_verified').default(false),
  images:           text('images').array(),
  description:      text('description'),
  features:         text('features').array(),
  specifications:   jsonb('specifications'),
  affiliateUrl:     text('affiliate_url'),
  affiliateNetwork: text('affiliate_network'),
  status:           text('status').default('ACTIVE'),
  featured:         boolean('featured').default(false),
  createdAt:        timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:        timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Categories Table ──────────────────────────────────────
export const categories = pgTable('categories', {
  id:               uuid('id').primaryKey().defaultRandom(),
  name:             text('name').unique().notNull(),
  slug:             text('slug').unique().notNull(),
  description:      text('description'),
  shortDescription: text('short_description'),
  image:            text('image'),
  icon:             text('icon'),
});

// ─── Brands Table ──────────────────────────────────────────
export const brands = pgTable('brands', {
  id:               uuid('id').primaryKey().defaultRandom(),
  name:             text('name').unique().notNull(),
  slug:             text('slug').unique().notNull(),
  logo:             text('logo'),
  country:          text('country'),
  description:      text('description'),
  founded:          integer('founded'),
});

// ─── Inquiries Table (Lead Generation) ─────────────────────
export const inquiries = pgTable('inquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  equipmentType: varchar('equipment_type', { length: 100 }),
  location: varchar('location', { length: 255 }),
  budget: varchar('budget', { length: 100 }),
  condition: varchar('condition', { length: 50 }),
  requirements: text('requirements'),
  equipmentId: varchar('equipment_id', { length: 100 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const articles = pgTable('articles', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  image: varchar('image', { length: 500 }),
  author: varchar('author', { length: 255 }).default('IRONMARKET Team'),
  status: varchar('status', { length: 50 }).default('DRAFT'), // DRAFT, PUBLISHED
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── NextAuth Tables ───────────────────────────────────────
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  }
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  }
);

export const favorites = pgTable("favorites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  equipmentId: uuid("equipmentId")
    .notNull()
    .references(() => equipment.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

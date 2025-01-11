import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        isAdmin: false,
        token: uuid(),
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('securePass!@', 10),
        isAdmin: false,
        token: uuid(),
      },
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        isAdmin: true,
        token: uuid(),
      },
      { username: 'alice', email: 'alice@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
      { username: 'bob', email: 'bob@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
      { username: 'charlie', email: 'charlie@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
      { username: 'dave', email: 'dave@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
      { username: 'eve', email: 'eve@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
      { username: 'frank', email: 'frank@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
      { username: 'grace', email: 'grace@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: uuid() },
    ],
  });

  console.log(`Seeded ${users.count} users`);

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Tech', user_id: 1 },
      { name: 'Sports', user_id: 2 },
      { name: 'Music', user_id: 3 },
    ],
  });

  console.log(`Seeded ${categories.count} categories`);

  // Seed Events
  const events = await prisma.event.createMany({
    data: [
      {
        title: 'Tech Conference 2025',
        description: 'A gathering of tech enthusiasts.',
        location: 'Silicon Valley, CA',
        date: new Date('2025-05-20T10:00:00Z'),
        poster: 'tech-conference.jpg',
        category_id: 1,
        user_id: 3, // admin user
      },
      {
        title: 'Rock Concert',
        description: 'An amazing rock concert with live performances.',
        location: 'Austin, TX',
        date: new Date('2025-06-15T20:00:00Z'),
        poster: 'rock-concert.jpg',
        category_id: 3,
        user_id: 3, // admin user
      },
    ],
  });

  console.log(`Seeded ${events.count} events`);

  // Seed Event Attendance
  const eventAttendance = await prisma.event_attended.createMany({
    data: [
      { user_id: 1, event_id: 1, date_signed: new Date('2025-05-01T09:00:00Z') }, // John -> Tech
      { user_id: 2, event_id: 1, date_signed: new Date('2025-05-02T10:00:00Z') }, // Jane -> Tech
      { user_id: 4, event_id: 1, date_signed: new Date('2025-05-03T11:00:00Z') }, // Alice -> Tech
      { user_id: 5, event_id: 1, date_signed: new Date('2025-05-04T12:00:00Z') }, // Bob -> Tech
      { user_id: 6, event_id: 2, date_signed: new Date('2025-06-01T09:00:00Z') }, // Charlie -> Rock
      { user_id: 7, event_id: 2, date_signed: new Date('2025-06-02T10:00:00Z') }, // Dave -> Rock
      { user_id: 8, event_id: 2, date_signed: new Date('2025-06-03T11:00:00Z') }, // Eve -> Rock
      { user_id: 9, event_id: 2, date_signed: new Date('2025-06-04T12:00:00Z') }, // Frank -> Rock
    ],
  });

  console.log(`Seeded ${eventAttendance.count} event attendances`);

  // Seed Reviews
  const reviews = await prisma.review.createMany({
    data: [
      { user_id: 1, event_id: 1, rating: 5, title: 'Tech Enthusiast!', comment: 'Really insightful event!' },
      { user_id: 2, event_id: 1, rating: 4, title: 'Informative', comment: 'Enjoyed the topics, but could be more interactive.' },
      { user_id: 4, event_id: 1, rating: 5, title: 'Great Conference!', comment: 'Excellent networking opportunities.' },
      { user_id: 5, event_id: 1, rating: 3, title: 'Okay', comment: 'Expected more in-depth discussions.' },
      { user_id: 6, event_id: 2, rating: 5, title: 'Rock On!', comment: 'Amazing energy and vibes!' },
      { user_id: 7, event_id: 2, rating: 4, title: 'Fun Night', comment: 'Loved the performances.' },
      { user_id: 8, event_id: 2, rating: 5, title: 'Fantastic!', comment: 'The lineup was incredible!' },
      { user_id: 9, event_id: 2, rating: 4, title: 'Good Show', comment: 'Great music, but crowded.' },
    ],
  });

  console.log(`Seeded ${reviews.count} reviews`);
}

main()
  .then(() => {
    console.log('Seeding complete!');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error while seeding:', error);
    prisma.$disconnect();
    process.exit(1);
  });

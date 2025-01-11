import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid'; // Import UUID function
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10), // Hash password
        isAdmin: false,
        token: uuid(), // Generate token
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('securePass!@', 10), // Hash password
        isAdmin: false,
        token: uuid(), // Generate token
      },
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10), // Hash password
        isAdmin: true,
        token: uuid(), // Generate token
      },
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

  // Seed Events (Only admins can post events)
  const events = await prisma.event.createMany({
    data: [
      {
        title: 'Tech Conference 2025',
        description: 'A gathering of tech enthusiasts.',
        location: 'Silicon Valley, CA',
        date: new Date('2025-05-20T10:00:00Z'),
        poster: 'https://res.cloudinary.com/dggn8axkq/image/upload/v1736601343/event-posters/p00ls9vyqdc1bufpkqe8.jpg',
        category_id: 1,
        user_id: 3, // admin user
      },
      {
        title: 'Rock Concert',
        description: 'An amazing rock concert with live performances.',
        location: 'Austin, TX',
        date: new Date('2025-06-15T20:00:00Z'),
        poster: 'https://res.cloudinary.com/dggn8axkq/image/upload/v1736601343/event-posters/qvtyfrs5o5kuult8wrgj.jpg',
        category_id: 3,
        user_id: 3, // admin user
      },
    ],
  });

  console.log(`Seeded ${events.count} events`);

  // Seed Announcements
  const announcements = await prisma.announcement.createMany({
    data: [
      {
        content: 'Welcome to the Tech Conference!',
        date: new Date('2025-05-10T12:00:00Z'),
        event_id: 1,
      },
      {
        content: 'Don’t miss the opening act at 8 PM.',
        date: new Date('2025-06-15T18:00:00Z'),
        event_id: 2,
      },
    ],
  });

  console.log(`Seeded ${announcements.count} announcements`);

  // Seed Reviews
  const reviews = await prisma.review.createMany({
    data: [
      {
        user_id: 2,
        event_id: 1,
        rating: 5,
        title: 'Amazing Event',
        comment: 'Really enjoyed the talks and networking opportunities.',
      },
      {
        user_id: 1,
        event_id: 2,
        rating: 4,
        title: 'Great Music',
        comment: 'Loved the performances but the sound system could be better.',
      },
    ],
  });

  console.log(`Seeded ${reviews.count} reviews`);

  // Seed Event Attendance
  const eventAttendance = await prisma.event_attended.createMany({
    data: [
      {
        user_id: 1,
        event_id: 1,
        date_signed: new Date('2025-05-01T09:00:00Z'),
      },
      {
        user_id: 2,
        event_id: 2,
        date_signed: new Date('2025-06-10T14:00:00Z'),
      },
    ],
  });

  console.log(`Seeded ${eventAttendance.count} event attendances`);
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

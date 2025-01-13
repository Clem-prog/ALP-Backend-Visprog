import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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
        token: "",
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('securePass!@', 10),
        isAdmin: false,
        token: "",
      },
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        isAdmin: true,
        token: "",
      },
      { username: 'alice', email: 'alice@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
      { username: 'bob', email: 'bob@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
      { username: 'charlie', email: 'charlie@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
      { username: 'dave', email: 'dave@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
      { username: 'eve', email: 'eve@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
      { username: 'frank', email: 'frank@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
      { username: 'grace', email: 'grace@example.com', password: await bcrypt.hash('pass1234', 10), isAdmin: false, token: "" },
    ],
  });

  console.log(`Seeded ${users.count} users`);

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Tech' },
      { name: 'Sports' },
      { name: 'Music' },
      { name: 'Health' },
      { name: 'Travel' },
      { name: 'Education' },
      { name: 'Gaming' },
      { name: 'Art' },
      { name: 'Finance' },
      { name: 'Movies' },
      { name: 'Fashion' },
      { name: 'Food' },
      { name: 'Science' },
      { name: 'Photography' },
      { name: 'Lifestyle' },
    ],
  });

  console.log(`Seeded ${categories.count} categories`);

  // Seed Events
const events = await prisma.event.createMany({
  data: [
    {
      title: 'Tech Conference 2025',
      description: 'A gathering of tech enthusiasts starting at 10:00 AM on May 20, 2025. The event will kick off with keynote speeches from industry leaders, followed by breakout sessions on AI, cloud computing, and cybersecurity. After lunch, attendees can participate in hands-on workshops and network with fellow professionals. The day will conclude with an expert panel discussion and a Q&A session.',
      location: 'Silicon Valley, CA',
      date: new Date('2025-05-20T10:00:00Z'),
      poster: 'https://res.cloudinary.com/dggn8axkq/image/upload/v1736601343/event-posters/p00ls9vyqdc1bufpkqe8.jpg',
      category_id: 1,
      user_id: 3, // admin user
    },
    {
      title: 'Rock Concert',
      description: 'An amazing rock concert starting at 8:00 PM on June 15, 2025. Doors open at 7:00 PM for early entry, with local bands warming up the crowd. The main act will take the stage at 8:30 PM, performing a mix of classic hits and new songs. Between sets, enjoy refreshments at the concession stands and explore exclusive band merchandise. The night will close with a spectacular light show and an encore performance by the headliner.',
      location: 'Austin, TX',
      date: new Date('2025-06-15T20:00:00Z'),
      poster: 'https://res.cloudinary.com/dggn8axkq/image/upload/v1736601343/event-posters/qvtyfrs5o5kuult8wrgj.jpg',
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

  const announcements = await prisma.announcement.createMany({
    data: [
      {
        content: `Welcome to the Tech Conference! We're thrilled to have you join us in exploring the latest innovations and advancements in the tech world. This conference brings together industry leaders, tech enthusiasts, and curious minds from around the globe to share ideas and build connections.
  
        Don’t forget to check out our keynote speakers and breakout sessions designed to inspire and educate. We’ve got a jam-packed schedule, so make sure to plan ahead to make the most out of this exciting event.`,
        date: new Date('2025-05-10T12:00:00Z'),
        event_id: 1,
      },
      {
        content: `Don’t miss the opening act at 8 PM! We’re kicking off the Rock Concert with an electrifying performance by one of the hottest bands in the scene. Get ready for a night of high-energy music, incredible light shows, and an atmosphere like no other.
  
        Be sure to arrive early to grab your spot and soak in the pre-show buzz. The vendors are stocked with refreshments and merch, so you can fuel up and grab some goodies before the action begins!`,
        date: new Date('2025-06-15T18:00:00Z'),
        event_id: 2,
      },
    ],
  });
  
  console.log(`Seeded ${announcements.count} announcements`);  
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

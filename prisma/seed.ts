import 'dotenv/config';
import { PrismaClient, PersonStatus, TaskStatus, Priority, EmailStatus, NotificationType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error', 'warn'],
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data (in development only)
  await prisma.messageReaction.deleteMany();
  await prisma.messageAttachment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.emailLabel.deleteMany();
  await prisma.emailAttachment.deleteMany();
  await prisma.email.deleteMany();
  await prisma.eventReminder.deleteMany();
  await prisma.eventAttendee.deleteMany();
  await prisma.event.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.taskTag.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.document.deleteMany();
  await prisma.chartData.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.person.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@square-ui.com',
        name: 'Admin User',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=admin',
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah@brightwave.co',
        name: 'Sarah',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=sarah',
        role: 'MANAGER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'james@gmail.com',
        name: 'James',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=james',
        role: 'USER',
      },
    }),
  ]);

  console.log('✅ Created users');

  // Create People (for dashboard)
  await prisma.person.createMany({
    data: [
      {
        name: 'Sarah',
        jobTitle: 'Marketing Director',
        status: PersonStatus.ACTIVE,
        email: 'sarah@brightwave.co',
        phone: '(415) 283-9921',
        tags: ['Marketing', 'SaaS'],
        address: 'Pine St, San Francisco, CA 94109',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=sarah',
      },
      {
        name: 'James',
        jobTitle: 'Sales Manager',
        status: PersonStatus.OFFLINE,
        email: 'james@gmail.com',
        phone: '(646) 555-7310',
        tags: ['Sales', 'Enterprise'],
        address: 'West 42nd St, New York, NY 10036',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=james',
      },
      {
        name: 'Priya',
        jobTitle: 'Product Manager',
        status: PersonStatus.ACTIVE,
        email: 'priya@auroratech.io',
        phone: '(312) 449-2278',
        tags: ['Product', 'B2B'],
        address: 'Madison St, Chicago, IL 60612',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=priya',
      },
      {
        name: 'Lucas',
        jobTitle: 'Account Executive',
        status: PersonStatus.OFFLINE,
        email: 'lucas@yahoo.com',
        phone: '(512) 930-4456',
        tags: ['Sales', 'Startup'],
        address: 'Austin, TX 78701',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=lucas',
      },
      {
        name: 'Emily',
        jobTitle: 'Customer Success Lead',
        status: PersonStatus.ACTIVE,
        email: 'emily@zencloud.com',
        phone: '(206) 902-1884',
        tags: ['Customer Success'],
        address: 'Seattle, WA 98101',
        avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=emily',
      },
    ],
  });

  console.log('✅ Created people');

  // Create Stats
  await prisma.stat.createMany({
    data: [
      { titleKey: 'stats.totalClients', value: '67', icon: 'users', order: 1 },
      { titleKey: 'stats.activeProjects', value: '12', icon: 'clipboard', order: 2 },
      { titleKey: 'stats.weeklyRevenue', value: '$4,571', icon: 'wallet', order: 3 },
      { titleKey: 'stats.sentInvoices', value: '32', icon: 'invoice', order: 4 },
    ],
  });

  console.log('✅ Created stats');

  // Create Chart Data
  await prisma.chartData.createMany({
    data: [
      { month: 'Jan', newLeads: 600, replied: 400, year: 2025 },
      { month: 'Feb', newLeads: 800, replied: 600, year: 2025 },
      { month: 'Mar', newLeads: 748, replied: 512, year: 2025 },
      { month: 'Apr', newLeads: 900, replied: 700, year: 2025 },
      { month: 'May', newLeads: 500, replied: 350, year: 2025 },
      { month: 'Jun', newLeads: 750, replied: 550, year: 2025 },
    ],
  });

  console.log('✅ Created chart data');

  // Create Documents
  await prisma.document.createMany({
    data: [
      {
        name: 'Cold Call Scripts',
        size: '90mb',
        author: 'Jeremy',
        authorId: users[0].id,
        icon: 'files',
      },
      {
        name: 'Email Template',
        size: '150kb',
        author: 'Samantha',
        authorId: users[1].id,
        icon: 'mail',
      },
      {
        name: 'Meeting Agenda',
        size: '2mb',
        author: 'Alex',
        authorId: users[2].id,
        icon: 'checklist',
      },
      {
        name: 'Project Proposal',
        size: '1.2mb',
        author: 'Maya',
        icon: 'file',
      },
      {
        name: 'Feedback Report',
        size: '500kb',
        author: 'John',
        icon: 'files',
      },
    ],
  });

  console.log('✅ Created documents');

  // Create Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Website Redesign',
        description: 'Complete overhaul of company website',
        status: 'active',
        color: '#3B82F6',
      },
    }),
    prisma.project.create({
      data: {
        name: 'Mobile App Development',
        description: 'Build native mobile app for iOS and Android',
        status: 'active',
        color: '#10B981',
      },
    }),
  ]);

  console.log('✅ Created projects');

  // Create Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage mockup',
        description: 'Create high-fidelity mockups for the homepage',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        assigneeId: users[1].id,
        projectId: projects[0].id,
        order: 1,
      },
      {
        title: 'Set up API endpoints',
        description: 'Create REST API for user authentication',
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        assigneeId: users[2].id,
        projectId: projects[1].id,
        order: 2,
      },
      {
        title: 'Write documentation',
        description: 'Document API endpoints and usage',
        status: TaskStatus.TODO,
        priority: Priority.LOW,
        assigneeId: users[0].id,
        projectId: projects[1].id,
        order: 3,
      },
    ],
  });

  console.log('✅ Created tasks');

  // Create Teams
  const team = await prisma.team.create({
    data: {
      name: 'Square UI',
      description: 'Main development team',
      avatar: 'https://api.dicebear.com/9.x/glass/svg?seed=square-ui',
    },
  });

  await prisma.teamMember.createMany({
    data: [
      { teamId: team.id, userId: users[0].id, role: 'owner' },
      { teamId: team.id, userId: users[1].id, role: 'admin' },
      { teamId: team.id, userId: users[2].id, role: 'member' },
    ],
  });

  console.log('✅ Created teams');

  // Create Events
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  await prisma.event.createMany({
    data: [
      {
        title: 'Team Standup',
        description: 'Daily team standup meeting',
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30),
        color: '#3B82F6',
        userId: users[0].id,
      },
      {
        title: 'Project Review',
        description: 'Review project progress and next steps',
        startTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 0),
        endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 15, 0),
        color: '#10B981',
        userId: users[1].id,
      },
    ],
  });

  console.log('✅ Created events');

  // Create Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: users[0].id,
        type: NotificationType.TASK_ASSIGNED,
        title: 'New Task Assigned',
        message: 'You have been assigned to "Write documentation"',
        read: false,
      },
      {
        userId: users[1].id,
        type: NotificationType.PROJECT_UPDATED,
        title: 'Project Updated',
        message: 'Website Redesign project has been updated',
        read: true,
      },
    ],
  });

  console.log('✅ Created notifications');

  // Create Conversations
  const conversation = await prisma.conversation.create({
    data: {
      name: 'General Chat',
      type: 'GROUP',
    },
  });

  await prisma.conversationParticipant.createMany({
    data: [
      { conversationId: conversation.id, userId: users[0].id },
      { conversationId: conversation.id, userId: users[1].id },
      { conversationId: conversation.id, userId: users[2].id },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        content: 'Hey team! How is everyone doing?',
        conversationId: conversation.id,
        senderId: users[0].id,
      },
      {
        content: 'Great! Just finished the mockups',
        conversationId: conversation.id,
        senderId: users[1].id,
      },
      {
        content: 'Awesome work! 🎉',
        conversationId: conversation.id,
        senderId: users[2].id,
      },
    ],
  });

  console.log('✅ Created conversations and messages');

  // Create Emails
  await prisma.email.createMany({
    data: [
      {
        from: 'admin@square-ui.com',
        to: ['team@square-ui.com'],
        subject: 'Weekly Project Update',
        body: 'Here is this week\'s project update...',
        status: EmailStatus.SENT,
        userId: users[0].id,
        folder: 'sent',
        isRead: true,
      },
      {
        from: 'client@example.com',
        to: ['admin@square-ui.com'],
        subject: 'Question about the project',
        body: 'I have a question about the timeline...',
        status: EmailStatus.SENT,
        userId: users[0].id,
        folder: 'inbox',
        isRead: false,
      },
    ],
  });

  console.log('✅ Created emails');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('Created:');
  console.log(`- ${users.length} users`);
  console.log('- 5 people');
  console.log('- 4 stats');
  console.log('- 6 chart data points');
  console.log('- 5 documents');
  console.log(`- ${projects.length} projects`);
  console.log('- 3 tasks');
  console.log('- 1 team with 3 members');
  console.log('- 2 events');
  console.log('- 2 notifications');
  console.log('- 1 conversation with 3 messages');
  console.log('- 2 emails');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

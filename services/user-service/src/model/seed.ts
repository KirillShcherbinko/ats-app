import { db } from './index';
import { roles } from './schema';

export const seedDatabase = async () => {
  try {
    const existingRoles = await db.select().from(roles);
    
    if (existingRoles.length === 0) {
      await db.insert(roles).values([
        { title: 'Администратор' },
        { title: 'Рекрутер' },
      ]);
      console.log('Database seeded with initial roles');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
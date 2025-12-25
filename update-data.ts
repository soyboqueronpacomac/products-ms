import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateData() {
  try {
    // Update gender values from uppercase to lowercase using raw SQL
    await prisma.$executeRaw`
      UPDATE "Product"
      SET gender = CASE
        WHEN gender::text = 'MEN' THEN 'men'::text
        WHEN gender::text = 'WOMEN' THEN 'women'::text
        WHEN gender::text = 'KID' THEN 'kid'::text
        WHEN gender::text = 'UNISEX' THEN 'unisex'::text
        ELSE gender::text
      END::text::"ValidGender"
    `;

    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateData();

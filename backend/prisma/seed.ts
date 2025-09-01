import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Usuário admin criado:', adminUser);

  // Criar história inicial se não existir
  const existingStory = await prisma.story.findFirst();
  if (!existingStory) {
    const story = await prisma.story.create({
      data: {
        title: 'Minha História',
        content: 'Esta é a história inicial do SideLudi. Você pode editá-la através da interface.',
      },
    });
    console.log('História inicial criada:', story);
  }

  // Criar seção de fotos inicial se não existir
  const existingPhotoSection = await prisma.photoSection.findFirst();
  if (!existingPhotoSection) {
    const photoSection = await prisma.photoSection.create({
      data: {
        title: 'Galeria Principal',
      },
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
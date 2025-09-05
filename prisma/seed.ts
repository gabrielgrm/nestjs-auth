import { PrismaClient, Roles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@example.com',
      password: adminPassword,
      role: Roles.ADMIN,
    },
  });

  // Criar usuário editor
  const editorPassword = await bcrypt.hash('editor123', 10);
  const editor = await prisma.user.upsert({
    where: { email: 'editor@example.com' },
    update: {},
    create: {
      name: 'Editor',
      email: 'editor@example.com',
      password: editorPassword,
      role: Roles.EDITOR,
    },
  });

  // Criar usuário writer
  const writerPassword = await bcrypt.hash('writer123', 10);
  const writer = await prisma.user.upsert({
    where: { email: 'writer@example.com' },
    update: {},
    create: {
      name: 'Escritor',
      email: 'writer@example.com',
      password: writerPassword,
      role: Roles.WRITER,
    },
  });

  // Criar usuário reader
  const readerPassword = await bcrypt.hash('reader123', 10);
  const reader = await prisma.user.upsert({
    where: { email: 'reader@example.com' },
    update: {},
    create: {
      name: 'Leitor',
      email: 'reader@example.com',
      password: readerPassword,
      role: Roles.READER,
    },
  });

  // Criar posts de exemplo
  await prisma.post.upsert({
    where: { id: 'post-1' },
    update: {},
    create: {
      id: 'post-1',
      title: 'Bem-vindo ao Sistema',
      content: 'Este é o primeiro post do sistema de autenticação e autorização.',
      published: true,
      authorId: admin.id,
    },
  });

  await prisma.post.upsert({
    where: { id: 'post-2' },
    update: {},
    create: {
      id: 'post-2',
      title: 'Como usar o sistema',
      content: 'Este post explica como utilizar o sistema de forma eficiente.',
      published: true,
      authorId: editor.id,
    },
  });

  await prisma.post.upsert({
    where: { id: 'post-3' },
    update: {},
    create: {
      id: 'post-3',
      title: 'Dicas de segurança',
      content: 'Algumas dicas importantes sobre segurança no sistema.',
      published: false,
      authorId: writer.id,
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('👤 Usuários criados:');
  console.log(`   Admin: admin@example.com / admin123`);
  console.log(`   Editor: editor@example.com / editor123`);
  console.log(`   Writer: writer@example.com / writer123`);
  console.log(`   Reader: reader@example.com / reader123`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

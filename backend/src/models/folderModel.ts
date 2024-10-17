import prisma from "../db";

export const getLessons = async () => {
  return await prisma.lesson.findMany();
};

export const createFolder = async (lessonId: number, folderName: string) => {
  return await prisma.folder.create({
    data: {
      name: folderName,
      lessons: {
        create: {
          lesson: {
            connect: { id: lessonId },
          },
        },
      },
    },
  });
};

export const getFolders = async (lessonId: number) => {
  return await prisma.folder.findMany({
    where: {
      lessons: {
        some: {
          lessonId: lessonId,
        },
      },
    },
  });
};

export const deleteFolder = async (folderId: number) => {
  await prisma.lessonFolder.deleteMany({
    where: {
      folderId: folderId,
    },
  });

  return await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });
};

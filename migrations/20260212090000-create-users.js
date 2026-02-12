module.exports = {
  async up(db) {
    const collectionName = "users";

    const exists = await db.listCollections({ name: collectionName }).hasNext();
    if (!exists) {
      await db.createCollection(collectionName);
    }

    await db.collection(collectionName).createIndex({ email: 1 }, { unique: true });

    await db.collection(collectionName).insertOne({
      name: "Super Admin",
      email: "admin@local.test",
      passwordHash: null, // reemplaza con hash real cuando integres auth
      role: "super_admin",
      isAdmin: true,
      isSuperAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async down(db) {
    await db.collection("users").drop().catch(() => {});
  },
};

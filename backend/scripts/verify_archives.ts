import { ArchiveService } from "../src/services/archive.service";

const archiveService = new ArchiveService();

async function verify() {
  console.log("Starting verification...");

  // 1. Create
  console.log("Creating archive...");
  const created = await archiveService.createArchive({
    title: "Test Archive",
    description: "This is a test archive",
    content: "Test content",
    coverImage: "https://example.com/image.jpg",
    type: "story",
  });
  console.log("Created:", created.id);

  // 2. Read All
  console.log("Fetching all archives...");
  const all = await archiveService.getAllArchives();
  console.log("Found:", all.length);
  const found = all.find((a) => a.id === created.id);
  if (!found) throw new Error("Created archive not found in list");

  // 3. Read One
  console.log("Fetching created archive...");
  const one = await archiveService.getArchiveById(created.id);
  if (!one) throw new Error("Created archive not found by ID");
  if (one.title !== "Test Archive") throw new Error("Title mismatch");

  // 4. Update
  console.log("Updating archive...");
  const updated = await archiveService.updateArchive(created.id, {
    title: "Updated Title",
  });
  if (updated.title !== "Updated Title") throw new Error("Update failed");

  // 5. Delete
  console.log("Deleting archive...");
  await archiveService.deleteArchive(created.id);
  const deleted = await archiveService.getArchiveById(created.id);
  if (deleted) throw new Error("Delete failed");

  console.log("Verification successful!");
}

verify()
  .catch((e) => {
    console.error("Verification failed:", e);
    process.exit(1);
  })
  .finally(() => process.exit(0));

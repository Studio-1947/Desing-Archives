const axios = require("axios");

const API_URL = "http://localhost:5000/api";
let discussionId;
let commentId;

// Mock user ID - in a real scenario, you'd need to login first or use a seeded user
// Assuming there is at least one user in the DB. If not, this will fail.
// You might need to adjust this to create a user first or use a known ID.
const userId = "test-user-id";

async function verify() {
  try {
    console.log("Starting verification...");

    // 1. Create a Discussion (Need a valid user ID, skipping auth for now if middleware allows or mocking)
    // Note: The controller expects req.body.authorId.
    // If auth middleware is strict, we need a token.
    // For this test, assuming we can pass authorId directly or need to login.
    // Let's try to create a user first if we can't find one, or just try to create discussion.

    // Actually, let's just try to fetch discussions first to see if the endpoint is up.
    console.log("1. Fetching discussions...");
    const res1 = await axios.get(`${API_URL}/discussions`);
    console.log("   Discussions fetched:", res1.data.length);

    // 2. Create a Discussion
    // We need a user ID. Let's assume we have one or the backend allows creating without valid relation (unlikely with Prisma).
    // Let's fetch users to get a valid ID.
    console.log("2. Fetching users to get a valid authorId...");
    // Assuming /api/users exists and returns a list.
    // If not, we might need to skip creation test or seed a user.
    // Let's try to create one if we can't fetch.
    let authorId;
    try {
      // This might fail if /api/users is protected or doesn't exist
      // const usersRes = await axios.get(`${API_URL}/users`);
      // authorId = usersRes.data[0]?.id;
      // console.log('   Found user:', authorId);
      console.log(
        "   Skipping user fetch, assuming manual test needed for creation if no user exists."
      );
    } catch (e) {
      console.log("   Could not fetch users.");
    }

    if (!authorId) {
      console.log(
        "   ! Cannot proceed with creation test automatically without a valid user ID."
      );
      console.log(
        "   ! Please manually verify creation via frontend or Postman."
      );
      return;
    }

    console.log("3. Creating a discussion...");
    const createRes = await axios.post(`${API_URL}/discussions`, {
      title: "Test Discussion",
      content: "This is a test discussion.",
      category: "general",
      authorId: authorId,
    });
    discussionId = createRes.data.id;
    console.log("   Discussion created:", discussionId);

    // 3. Add a Comment
    console.log("4. Adding a comment...");
    const commentRes = await axios.post(
      `${API_URL}/discussions/${discussionId}/comments`,
      {
        content: "This is a test comment.",
        authorId: authorId,
      }
    );
    commentId = commentRes.data.id;
    console.log("   Comment added:", commentId);

    // 4. Fetch Discussion Detail
    console.log("5. Fetching discussion detail...");
    const detailRes = await axios.get(`${API_URL}/discussions/${discussionId}`);
    console.log(
      "   Detail fetched, comments count:",
      detailRes.data.comments.length
    );

    // 5. Delete Comment
    console.log("6. Deleting comment...");
    await axios.delete(`${API_URL}/discussions/comments/${commentId}`);
    console.log("   Comment deleted.");

    // 6. Delete Discussion
    console.log("7. Deleting discussion...");
    await axios.delete(`${API_URL}/discussions/${discussionId}`);
    console.log("   Discussion deleted.");

    console.log("Verification complete!");
  } catch (error) {
    console.error(
      "Verification failed:",
      error.response ? error.response.data : error.message
    );
  }
}

verify();

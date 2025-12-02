const axios = require('axios');

const challengeData = {
    title: "Test Challenge Full Data",
    description: "This is a test challenge with all fields populated to verify the admin form structure.",
    shortDescription: "Testing full data submission",
    status: "upcoming",
    category: ["UI/UX", "Web Design"],
    organizer: "Test Organizer",
    prizePool: 10000,
    currency: "INR",
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    imageUrl: "https://example.com/image.jpg",
    difficulty: "Beginner",
    tags: ["test", "verification"],
    overview: {
        brief: "This is the brief.",
        deliverables: ["Deliverable 1", "Deliverable 2"],
        criteria: [
            { title: "Criterion 1", weight: 50, description: "Desc 1" },
            { title: "Criterion 2", weight: 50, description: "Desc 2" }
        ],
        schedule: [
            { phase: "Phase 1", date: "Jan 1" },
            { phase: "Phase 2", date: "Feb 1" }
        ]
    },
    rules: ["Rule 1", "Rule 2"],
    assets: [
        { name: "Asset 1", type: "pdf", url: "http://example.com/1.pdf", size: "1MB" }
    ]
};

async function createChallenge() {
    try {
        const response = await axios.post('http://localhost:5000/api/challenges', challengeData);
        console.log('Status:', response.status);
        console.log('Created Challenge ID:', response.data.id);
        console.log('Title:', response.data.title);
        console.log('Overview:', JSON.stringify(response.data.overview, null, 2));
    } catch (error) {
        console.error('Error creating challenge:', error.response ? error.response.data : error.message);
    }
}

createChallenge();

const axios = require('axios');

const standardChallenge = {
    title: "Standard Challenge",
    description: "This is a standard challenge.",
    shortDescription: "Standard",
    status: "active",
    type: "standard",
    category: ["Web Design"],
    organizer: "Studio 1947",
    prizePool: 1000,
    currency: "USD",
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    imageUrl: "https://example.com/standard.jpg",
    difficulty: "Intermediate",
    tags: ["standard"],
    overview: { brief: "Brief", deliverables: [], criteria: [], schedule: [] },
    rules: [],
    assets: []
};

const studentChallenge = {
    title: "Student Challenge",
    description: "This is a student challenge.",
    shortDescription: "Student",
    status: "active",
    type: "student",
    category: ["UI/UX"],
    organizer: "University",
    prizePool: 500,
    currency: "USD",
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    imageUrl: "https://example.com/student.jpg",
    difficulty: "Beginner",
    tags: ["student"],
    overview: { brief: "Brief", deliverables: [], criteria: [], schedule: [] },
    rules: [],
    assets: []
};

async function verifyTypeFiltering() {
    try {
        // Create challenges
        console.log('Creating Standard Challenge...');
        await axios.post('http://localhost:5000/api/challenges', standardChallenge);
        
        console.log('Creating Student Challenge...');
        await axios.post('http://localhost:5000/api/challenges', studentChallenge);

        // Fetch All
        console.log('\nFetching All Challenges...');
        const all = await axios.get('http://localhost:5000/api/challenges');
        console.log(`Total: ${all.data.length}`);

        // Fetch Standard
        console.log('\nFetching Standard Challenges...');
        const standard = await axios.get('http://localhost:5000/api/challenges?type=standard');
        console.log(`Standard: ${standard.data.length}`);
        const standardOnly = standard.data.every(c => c.type === 'standard');
        console.log(`All are standard? ${standardOnly}`);

        // Fetch Student
        console.log('\nFetching Student Challenges...');
        const student = await axios.get('http://localhost:5000/api/challenges?type=student');
        console.log(`Student: ${student.data.length}`);
        const studentOnly = student.data.every(c => c.type === 'student');
        console.log(`All are student? ${studentOnly}`);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

verifyTypeFiltering();

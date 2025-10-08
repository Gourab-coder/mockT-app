const enquiryModel = require("../../App/models/enquiry");
const userModel = require("../../App/models/user");

// Handles the creation of a new test and associates it with the user.
const postEnquiry = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).send("User not authenticated. Please log in.");
        }

        const { name, description, timeLimit, numberOfQuestions, questions, testId } = req.body;
        if (!name || !description || !timeLimit || !numberOfQuestions || !questions || !testId) {
            return res.status(400).send("All fields are required");
        } 
        const newEnquiry = new enquiryModel({
            name,
            description,
            timeLimit,
            numberOfQuestions,
            questions,
            testId,
            createdBy: userId // 1. Link the test to the user
        });
        await newEnquiry.save();

        // 2. Find the user and add this new test's ID to their profile
        await userModel.findByIdAndUpdate(userId, { $push: { createdTests: newEnquiry._id } });

        res.status(201).send("Enquiry created successfully");
    } catch (error) {
        console.error("Error in postEnquiry:", error.message);
        res.status(500).json({
            message: "Internal server error while creating enquiry.",
            success: false
        });
    }
};

// Adds a student's score to a specific test.
const putEnquiryScore = async (req, res) => {
    try {
        const { testId, studentName, score } = req.body;
        if(!testId) {
            return res.status(404).send("testId is required");
        }
        const enquiry = await enquiryModel.findOne({ testId });
        if (!enquiry) {
            return res.status(404).send("Enquiry not found");
        }
        enquiry.scores.push({ studentName, score });
        await enquiry.save();
        res.status(200).send("Score added successfully");
    } catch (error) {
        console.error("Error in putEnquiryScore:", error.message);
        res.status(500).json({
            message: "Internal server error while adding score.",
            success: false
        });
    }
}

// Fetches the details of a single test by its testId.
const getEnquiry = async (req, res) => {
    try{
        const { testId } = req.params;
        console.log("Fetching enquiry for testId:", testId);
        if (!testId) { 
            return res.status(400).send("testId is required");
        }
        const enquiries = await enquiryModel.findOne({ testId: testId });
        if (!enquiries) {
            return res.status(404).json({ message: "Test not found." });
        }
        res.status(200).json(enquiries);
    } catch (error) {
        console.error("Error in getEnquiry:", error.message);
        res.status(500).json({
            message: "Internal server error while fetching enquiry.",
            success: false
        });
    }
}

// Deletes a test from the database based on its testId.
const deleteEnquiry = async (req, res) => {
    try {
        const { testId } = req.params;
        if (!testId) {
            return res.status(400).send("testId is required");
        }
        const deletedEnquiry = await enquiryModel.findOneAndDelete({ testId: testId });
        if (!deletedEnquiry) {
            return res.status(404).json({ message: "Test not found for deletion." });
        }
        res.status(200).json({ message: "Test deleted successfully.", deletedEnquiry });
    } catch (error) {
        console.error("Error in deleteEnquiry:", error.message);
        res.status(500).json({
            message: "Internal server error while deleting enquiry.",
            success: false
        });
    }
}

// Fetches all tests created by the currently authenticated user.
const getUserData = async (req, res) => {
    try {
        // The user's ID is available from the auth middleware
        const userId = req.user._id;
        const user = await userModel.findById(userId).populate({
            path: 'createdTests',
            model: 'mockT-enquiry', 
            select: 'name testId createdAt scores', 
            options: { sort: { 'createdAt': -1 } } 
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({ createdTests: user.createdTests });
    } catch (error) {
        console.error("Error in getUserData:", error.message);
        res.status(500).json({
            message: "Internal server error while fetching user data.",
            success: false
        });
    }
}

module.exports = {
    postEnquiry,
    getEnquiry,
    deleteEnquiry,
    getUserData,
    putEnquiryScore
};

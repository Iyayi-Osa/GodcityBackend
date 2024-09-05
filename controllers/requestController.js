const Request = require('../models/Request'); // Import the Request model

// Create a new request
const createRequest = async (req, res) => {
    try {
        const {
            userId, name, category, description, avatars, image, unit, community, attended
        } = req.body;

        const newRequest = new Request({
            userId,
            name,
            category,
            description,
            avatars,
            image,
            unit,
            community,
            attended,
        });

        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: "Error creating request", error });
    }
};

// Get all requests
const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests", error });
    }
};

// Get a single request by ID
const getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: "Error fetching request", error });
    }
};

// Update a request by ID
const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: "Error updating request", error });
    }
};

// Delete a request by ID
const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRequest = await Request.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting request", error });
    }
};

module.exports = {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest,
};

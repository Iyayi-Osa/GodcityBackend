// controllers/dialogflowController.js
const Member = require('../models/Member');
const Event = require('../models/Event');

exports.handleDialogflowRequest = async (req, res) => {
  const { queryResult } = req.body;
  const intent = queryResult.intent.displayName;

  switch (intent) {
    case 'RegisterMember':
      return registerMember(req, res, queryResult);
    case 'GetMemberInfo':
      return getMemberInfo(req, res, queryResult);
    case 'CreateEvent':
      return createEvent(req, res, queryResult);
    case 'RegisterForEvent':
      return registerForEvent(req, res, queryResult);
    case 'GetEventInfo':
      return getEventInfo(req, res, queryResult);
    case 'UploadDocument':
      return uploadDocument(req, res, queryResult);
    default:
      return res.json({ fulfillmentText: "Sorry, I didn't understand that." });
  }
};

const registerMember = async (req, res, queryResult) => {
  const { name, email, phone, address, demographics, affiliation } = queryResult.parameters;

  try {
    const newMember = new Member({ name, email, phone, address, demographics, affiliation });
    await newMember.save();
    res.json({ fulfillmentText: `Member ${name} registered successfully.` });
  } catch (error) {
    res.json({ fulfillmentText: `Failed to register member: ${error.message}` });
  }
};

// Other intent handlers like getMemberInfo, createEvent, registerForEvent, getEventInfo, uploadDocument would go here...

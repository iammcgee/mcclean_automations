const axios = require('axios');

// Function to fetch all campaigns - assuming there's an endpoint for this
async function fetchCampaigns() {
  try {
    const response = await axios.get('https://server.smartlead.ai/api/v1/campaigns?api_key=YOUR_API_KEY');
    return response.data; // Assuming this returns an array of campaigns
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
}

// Function to fetch leads for a given campaign
async function fetchLeads(campaignId) {
  try {
    const response = await axios.get(`https://server.smartlead.ai/api/v1/campaigns/${campaignId}/leads?api_key=YOUR_API_KEY`);
    return response.data; // Assuming this returns an array of leads
  } catch (error) {
    console.error(`Error fetching leads for campaign ${campaignId}:`, error);
    return [];
  }
}

// Function to fetch message history for a lead in a campaign
async function fetchMessageHistory(campaignId, leadId) {
  try {
    const response = await axios.get(`https://server.smartlead.ai/api/v1/campaigns/${campaignId}/leads/${leadId}/message-history?api_key=SMARTLEAD_API_KEY`);
    console.log(`Message history for campaign ${campaignId}, lead ${leadId}:`, response.data);
  } catch (error) {
    console.error(`Error fetching message history for campaign ${campaignId}, lead ${leadId}:`, error);
  }
}

// Main automation function
async function automate() {
  const campaigns = await fetchCampaigns();
  for (const campaign of campaigns) {
    const leads = await fetchLeads(campaign.id);
    for (const lead of leads) {
      await fetchMessageHistory(campaign.id, lead.id);
    }
  }
}

automate();


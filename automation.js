const axios = require('axios');

async function fetchCampaigns() {
  try {
    const response = await axios.get(`https://server.smartlead.ai/api/v1/campaigns?api_key=${process.env.SMARTLEAD_API_KEY}`);
    console.log("Campaigns data:", response.data);
    return response.data; // Check if this should be response.data.campaigns or similar based on actual response
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
}

async function fetchLeads(campaignId) {
  try {
    const response = await axios.get(`https://server.smartlead.ai/api/v1/campaigns/${campaignId}/leads?api_key=${process.env.SMARTLEAD_API_KEY}`);
    console.log(`Leads data for campaign ${campaignId}:`, response.data);
    return response.data; // Check if this should be response.data.leads or similar
  } catch (error) {
    console.error(`Error fetching leads for campaign ${campaignId}:`, error);
    return [];
  }
}

async function fetchMessageHistory(campaignId, leadId) {
  try {
    const response = await axios.get(`https://server.smartlead.ai/api/v1/campaigns/${campaignId}/leads/${leadId}/message-history?api_key=${process.env.SMARTLEAD_API_KEY}`);
    console.log(`Message history for campaign ${campaignId}, lead ${leadId}:`, response.data);
  } catch (error) {
    console.error(`Error fetching message history for campaign ${campaignId}, lead ${leadId}:`, error);
  }
}

async function automate() {
  const campaigns = await fetchCampaigns();
  for (const campaign of campaigns) {
    const leads = await fetchLeads(campaign.id);
    if (!Array.isArray(leads)) {
      console.error('Expected leads to be an array but received:', leads);
      continue; // Skip to next iteration if leads is not an array
    }
    for (const lead of leads) {
      await fetchMessageHistory(campaign.id, lead.id);
    }
  }
}

automate();


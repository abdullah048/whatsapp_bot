const fs = require('fs').promises;
const path = require('path');

const saveGroupInfoToJson = async groups => {
  const filePath = path.join(__dirname, '../tokens/groups.json');

  try {
    // Create the directory if it doesn't exist
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write the groups data to the JSON file
    await fs.writeFile(filePath, JSON.stringify(groups, null, 2));

    // Return mapped groups with id and name properties
    return groups.map(group => ({
      id: group.id._serialized,
      name: group.name || 'Unnamed Group',
    }));
  } catch (error) {
    console.error('Error saving groups to JSON file:', error);
    throw error; // Propagate the error back to the caller
  }
};

module.exports = saveGroupInfoToJson;

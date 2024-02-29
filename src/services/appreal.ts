import fs from 'fs';

const filePath = 'data.json';

const fetchJSONData = async () => {
    const fileData = await fs.readFileSync(filePath, 'utf8');
    const parsedFileData = JSON.parse(fileData);
    return parsedFileData
}

const writeJSONData = async (data) => {
   await fs.writeFileSync(filePath, JSON.stringify(data),'utf8');
}


export {
    fetchJSONData,
    writeJSONData
}
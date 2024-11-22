const path = require("path");
const {google} = require('googleapis');
const axios = require("axios");


require('dotenv').config()


const googleCredentials = path.join(__dirname, 'google-sheet-key.json')


async function google_auth(){
    const auth = new google.auth.GoogleAuth({
        keyFile: googleCredentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    return auth.getClient()
}

async function writeToTable(range, data){
    const auth = await google_auth()
    const sheets = await google.sheets({version: 'v4', auth})

    await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: range || 'Лист1!A1',
        valueInputOption: 'RAW',
        requestBody:{
            values: data
        }

    })

}

async function getApiClients(offset){
    try {
        const response = await axios.get(process.env.API_URL, {
            headers: {
                Authorization: process.env.API_KEY,
            },
            params: {
                limit: 1000,
                offset: offset
            }
        })
        return response.data


    }catch(err){
        console.error("Error getting API data")
        throw err;
    }
}

async function getApiStatuses(ids){
    try {
        const response = await axios.post(process.env.API_URL,
            {
                userIds: ids
                },
            {
                headers: {
                    Authorization: process.env.API_KEY,
                }
            }
           )

        return response.data


    }catch(err){
        console.error("Error getting API data")
        throw err;
    }
}

function delayOneSec(){
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function main(){
    try {
        let offset = 0
        let range = 2
        let userIds = Array.from({ length: 1000 }, (_, i) => i + 1);

        console.log('Writing to Google Sheet is started...')

        await writeToTable('Лист1!A1', [['id', 'firstName', 'lastName', 'gender', 'address', 'city', 'phone', 'email', 'status']]);

        while(true){

            const clients = await getApiClients(offset);
            const statuses = await getApiStatuses(userIds);

            if(!clients.length && !statuses.length) break;

            const clientsRows = clients.map((item) => [item.id, item.firstName, item.lastName, item.gender, item.address, item.city, item.phone, item.email]);
            const statusesRows = statuses.map((item) => [item.status]);

            await writeToTable(`Лист1!A${range}`, clientsRows);
            await writeToTable(`Лист1!I${range}`, statusesRows);
            await delayOneSec();

            offset += 1000;
            userIds = userIds.map((item) => item + 1000);
            range += 1000;

            console.log('Amount of records: ' + offset);
        }
        console.log("Writing to Google Sheet is completed!!!")

    }catch(err){
        console.error("Unexpected error")
        throw err;
    }
}

main()








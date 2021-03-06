const fs = require('fs');
const zips = JSON.parse(fs.readFileSync('CountyFromZip/counties.json','utf8'));

module.exports = async function (context, req) {
    const input = context.req.params.zip;
    
    if (input) {
        let county;
        let foundZips = [];
        zips.forEach( (item) => {
            if(input == item.zip) {
                county = item;
                console.log(county)
                foundZips.push(item)
            }
        })

        if (county) 
            context.res = {
                body: foundZips,
                
                headers: {
                    'Content-Type' : 'application/json',
                    "Cache-Control" : "public, max-age=84600" //1 day
                }
            };
        else 
            context.res = {
                status: 404,
                body: "Zip not found - " + input
            };
    } else 
        context.res = {
            status: 400,
            body: "Please pass a zip on the path"
        };
};
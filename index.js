const express = require("express");
const app = express();
const xlsx = require('xlsx');
const axios = require('axios');
const request = require('request');

app.get("/", async (req, res) => {

    const workbook = xlsx.readFile('Diff_15_11_2021.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const columnA = [];
    var data;
    var counter = 0;
    for (let z in worksheet) {
        if (z.toString()[0] === 'B') {
            columnA.push(worksheet[z].v);
            data = worksheet[z].v;

            if (data !== "Brand Name") {
                //  res.write(data + "\n");

                res.write("INSERT INTO `medicine`(`medicine_Name`) VALUES (\" " + data + " \"); \n")

                // //API Here
                // axios({
                //     method: 'POST',
                //     url: 'http://localhost/apis/api/medicine/CREATE.php',
                //     data: {
                //         medicine_Name: data,
                //     }
                // });
                // request.post(
                //     'http://localhost/apis/api/medicine/CREATE.php',
                //     { json: { medicine_Name: data } },
                //     function (error, response, body) {
                //         if (!error && response.statusCode == 200) {
                //             console.log(body);
                //         }
                //     }
                // );

                counter++;
            }

        }
    }
    console.log(counter);
});


app.listen(2400, () => {
    console.log("Server started at port 2400");
});

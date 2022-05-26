        const csvtojson = require("csvtojson");
        const modelCsv = require("../../models/csv");
        const { findNetwork,MyLogger } = require('../../utils/find_utils');
        const { vFCFa,v_C_U_C } = require('../../utils/validation/csv_val');
        const { validationArrayCsv,} = require("../../utils/validation/csv_val");
        require('express-async-errors');
       const { d_I_F_F_U } = require('../../utils/delete_pathFiles')
      const { GOVERNORATE,NETWORK,USER,PACKAGE,CARD,CSV } = require('../../utils/Error/utils_Errors')
       
        global.__basedir = __dirname;/* this for know direct file upload */


        /*  <<<// Documentation names //>>>
        1- existC = existCards  
        2- existD = exist Data Cards
        3- resultR = resultResponse
        4- resDa = response Data
        5- resultU = resultUsername
        6- resultP = resultPassword
        7- resultS = resultSerialNumber
        8- resP = response pas
        9- resU = response use
        10- resS = response se_Nu
        11- mRS = myResultSearch
        12- findN= find ne
        13- fC = find Cards
        14- vFCFa = validation Find Cards From Array
        15- v_C_U_C = Validation of Cards Csv Utils  
        16- inEr =invalid Error
        17-  d_I_F_F_U = delete Image From File Uploads

        */

        class CSV_CONTROLLER {

        async CreatCsv(req, res,) {

        try {

        const body = req.body;
        const inEr = await v_C_U_C(res,req)/* check invalid Error */
        if (inEr) return inEr
        if (req.file == undefined) { 
        await d_I_F_F_U(req);
        MyLogger("CreatCsv",CSV.NO_CSV);
        return res.status(404).json({ Error: CSV.NO_CSV }) }

        const csvData = await csvtojson({ delimiter: "auto",trim:true,checkColumn:true}).fromFile(__basedir + '/public/uploads/' + req.file.filename)
                
        var validate = await findN(res, body,)
        if (!validate) return validate;
        if (validate[0] == true) {
        await d_I_F_F_U(req)
        MyLogger("CreatCsv",NETWORK.NOTFOUND);
        return res.status(404).json({ "Error": NETWORK.NOTFOUND})}
        //search in pac for  same Package id who received you from FrontEnd
        const greaterThanTen = validate[1].pac.filter(element => element._id == body.package_Id);
        if (greaterThanTen[0] == null || greaterThanTen[0] == undefined){
        await d_I_F_F_U(req)
        MyLogger("CreatCsv",PACKAGE.NOTFOUND);
       return res.status(404).json({Error: PACKAGE.NOTFOUND})

        }
        if (csvData[0] == undefined) {
        await d_I_F_F_U(req)
        MyLogger("CreatCsv",CSV.ERROR_CSV);
        return res.status(404).json({ Error: CSV.ERROR_CSV })
        }
        var pac_Pr = greaterThanTen[0].pac_Pr;
        var findByUsername = csvData.map(function (id) { return id.use; });
        var findByPassword = csvData.map(function (id) { return id.pas; });
        var findBySerialNor = csvData.map(function (id) { return id.se_Nu; });
        let resultSearch;
        function cardData(item) {
        if (greaterThanTen[0].ha_Pa == true) {

        if (greaterThanTen[0].equalUAP == false && greaterThanTen[0].equalUAP != null) {/* check if package cards not Equal use And pas*/

        resultSearch = {
        net_Id: body.network_Id,
        use: { $in: findByUsername },
        pas: { $in: findByPassword },
        se_Nu: { $in: findBySerialNor },
        }

        return new modelCsv({
        use: item.use,
        pas: item.pas,
        se_Nu: item.se_Nu,
        is_Ac: true,
        Is_new: true,
        pac_Pr: pac_Pr,
        net_Id: body.network_Id,
        pac_Id: body.package_Id,

        });
        } else if (greaterThanTen[0].equalUAP == true && greaterThanTen[0].equalUAP != null) {
        return new modelCsv({
        use: item.use,
        /* <//<<pas: item.pas>>//> i am disable pas because use same pas so i dont need save pas in my database  */
        se_Nu: item.se_Nu,
        is_Ac: true,
        Is_new: true,
        pac_Pr: pac_Pr,
        net_Id: body.network_Id,
        pac_Id: body.package_Id,

        });
        }
        } else {

        return new modelCsv({
        use: item.use,
        //pas: item.pas,  /* i am deleted password because ha_Pa equal false */
        se_Nu: item.se_Nu,
        is_Ac: true,
        Is_new: true,
        pac_Pr: pac_Pr,
        net_Id: body.network_Id,
        pac_Id: body.package_Id,

        });
        }
        }

        const { error } = validationArrayCsv(csvData);
        if (error) {
        await d_I_F_F_U(req)
        MyLogger("CreatCsv", error.details[0].message );
        return res.status(404).json({ Error: error.details[0].message })
        }
        var myRS = vFCFa(
        body, greaterThanTen, resultSearch,
        findByUsername, findByPassword, findBySerialNor)

        var existC = await existD(res,req,greaterThanTen, {
        net_Id: myRS.net_Id,
        use: myRS.use,
        pas: myRS.pas,
        se_Nu: myRS.se_Nu
        })
        if (existC) return existC


        async function injectKeyValueInArray(array, keyValues) {
        return new Promise((resolve) => {
        if (!array.length) return resolve(array);
        array.forEach((object) => {
        for (let key in keyValues) {
        object[key] = keyValues[key]
        }
        }); resolve(array);
        })
        };

        injectKeyValueInArray(csvData,).then((newArrOfObj) => {

        newArrOfObj.forEach(myFunction);
        async function myFunction(item, index) {

        const Data = cardData(item)

        await modelCsv.insertMany([Data], { rawResult: true })
        }

        return res.status(200).json({
        'msg':CSV.SUCCESSFULLY,
        'file': req.file,
        'count cards': csvData.length
        });
        })

        } catch (error) {
        console.log(error);
        await d_I_F_F_U(req)
        MyLogger("injectKeyValueInArray Csv Cards", error.message );
        return res.status(404).json({ "Error": error.message });
        };
        }




        async getAllCSV(req, res) {
        const data = await modelCsv.find()
        var lengthData = data.length;
        return res.status(200).json({ "data": data, "status": 200, "lengthData": lengthData })
        }




        async getByIdCSV(req, res) {
        const id = req.params._id;
        const getAllData = await modelCsv.find({ pac_Id: id }).populate('pac_Id');
        return res.status(200).json({ "lengthData": getAllData.length, data: getAllData })

        }



        async deleteAllPackageCardsByid(req, res) {
        const id = req.params._id;
        const deleteAllData = await modelCsv.deleteMany({ pac_Id: id });
        let result;
        if (deleteAllData.deletedCount == 0) {
        MyLogger("deleteAllPackageCardsById", PACKAGE.DELETED_SUCCESS );
        result = PACKAGE.DELETED_SUCCESS
        } else { result = ' . has been deleted ' + deleteAllData.deletedCount + ' card successfully'; }
        return res.status(200).json(result)
        }

        }
        /* this is for validate if use or pas or se_Nu exist or no */
        async function existD(res,req,greaterThanTen, { net_Id, use, pas, se_Nu },) {

        const resultU = await fC({ net_Id: net_Id, use: use })
        const resultP = await fC({ net_Id: net_Id, pas: pas })
        const resultS = await fC({ net_Id: net_Id, se_Nu: se_Nu })


        if (resultU[0]) {
        await d_I_F_F_U(req)
        MyLogger("getByIdCSV", CARD.EXIST_CARD_USERNAME );
        var resU = findBy(resultU,)/* this is response details */
        return resDa(res, resU, CARD.EXIST_CARD_USERNAME)/* this is custom response */
        } if(greaterThanTen[0].equalUAP != true && greaterThanTen[0].equalUAP != null||greaterThanTen[0].ha_Pa==false){
        if (resultP[0]) {
        await d_I_F_F_U(req)
        MyLogger("getByIdCSV", CARD.EXIST_CARD_PASSWORD );
        var resP = findBy(resultP)
        return resDa(res, resP,CARD.EXIST_CARD_PASSWORD)
        }}
        if (resultS[0]) {
        await d_I_F_F_U(req)
        MyLogger("getByIdCSV", CARD.EXIST_CARD_SIR_NUMBER);
        var resS = findBy(resultS,)
        return resDa(res, resS, CARD.EXIST_CARD_SIR_NUMBER)
        }
        }
        function findBy(result) {
        return result.map(function (data) {//this is the cards if it already exist
        return ({
         /* NAJEEB */
        "use": data.use,
        "pas": data.pas ?? data.use,/* i am do if value pas equal null give it value use because maybe password and use equal or pas equal false */
        "se_Nu": data.ser
        });
        });
        }
        
        function resDa(res, result, error) {//response data
        if (result[0] != undefined) {
        return res.status(400).json({ Error: error, "count": result.length, "cards": result, });
        }
        }
        async function fC(data) {
        return await modelCsv.find(data).select('use , pas , ser -_id');

        }

        
        async function findN(res, body,) {
        const findN = await findNetwork(body.network_Id)
        return findN
        }
        module.exports = new CSV_CONTROLLER();
        module.exports.findN = findN;
        module.exports.findBy = findBy;
        module.exports.resDa = resDa;
        module.exports.fC = fC;











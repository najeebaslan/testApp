    const user_profile = require("../../models/users");
    const pac_Pr = require("../../models/packages");
    const Cards = require("../../models/cards");
    const coverageArea = require("../../models/allCoverage_Area");
    require('express-async-errors');
    const { Joi, ObjectId, mongoose, _, } = require('../../utils/utils')
    const {MyLogger } = require('../../utils/find_utils')
    const { GOVERNORATE,NETWORK,USER,PHONE,GLOBAL } = require('../../utils/Error/utils_Errors')

/*  <<<// Documentation names //>>>
1-pas =password
2-use =  username
3-is_Ac =  is Active
4-op_Nu = operation number 
5-de_st = devices status
6-bu_Da = buying Date
7-de_Id =device Id
8-pac_Pr= Package price
9-se_Nu = serial Number
10-ca_Nu = Card Number
11-pac_Id= package Id
12-bu_Ar =Buying Area
13-fr_Us = From User
14-to_Us = To User
15-ne= ne
16 -em =email
17- no = notice
18- am =amount
     
*/
 /*  <<<// Documentation log_Operation >>>
    1- userId = User Profile Id
    2- da_Ad = Date Add
    3- de_St = Device Status
    4- ip = ip address
    5- de_Na device name 
    6- de_Mo =device Model
    7- ty_Api=type api
    8- ty_st= type status
    9-we =weather
    10-cl=cloud 
    11- te=Temperature
    12-pl-place
    13-de =description Operation

    */

    class users_reports {

    async ReportsBuying(req, res) {
    const incomeId = req.query.inComeId;
    try {
    await user_profile.findOne({}, function (error, result) {
    // let profile = resulte[0] ?? { inCome: 0,};
    if (error) {
    MyLogger('ReportsBuying',error)
    return res.status(401).json({Error:error.message});}
    if(result==null){
    MyLogger('ReportsBuying',GLOBAL.DATA_NOTFOUND)
    return res.status(400).json({"Error":GLOBAL.DATA_NOTFOUND})
    }
    return res.status(200).json(result)
    }).where('inCome._id').equals(incomeId)
    .select("inCome.am , inCome.fr_Us , inCome.bu_Da , inCome.status , inCome._id")
    .populate('fr_Us', 'name') 
    } catch (error) {
    MyLogger('ReportsBuying',error.message)
   console.log(error.message);
    return res.status(400).json({"Error": error.message })
    }
    }



    async SalesReports(req, res) {
    const outcomeId = req.query.outComeId;
    try {
    await user_profile.find(
    function (error, result) {
    if (error) {
    MyLogger('SalesReports',error)
    return res.status(500).json({Error:error.message});}
    if(result[0]==null){
    MyLogger('SalesReports',USER.SALES_NOTFOUND)
    return   res.status(404).json({Error:USER.SALES_NOTFOUND})          }
    return res.status(200).json(result)
    }).where('outCome._id').equals(outcomeId)
    .select("outCome.am , outCome.to_Us , outCome.bu_Da , outCome.status , outCome._id")
    .populate('to_Us', 'name')
    } catch (error) {
    MyLogger('SalesReports',error.message)
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}
    }




    async getReportsBuying(req, res) {/* تقارير مشتريات الكروت */
    const userId = req.query.userId;
    const fromDate = req.query.FromDate;
    const toDate = req.query.ToDate;
    const toMyDate = new Date(toDate)
    const toDateBls1= toMyDate.setDate(toMyDate.getDate()+1);
    try {
    await user_profile.aggregate([/*  المستخدم المرسل ي idفلتر مشتريات الكروت  حسب التاريخ و  */
    { $match: { "userId": ObjectId(userId) } },
    { $project: { list: {
    $filter: { input: '$inCome', as: 'item',
    cond: {$and: [
    { $gte: ['$$item.bu_Da', new Date(fromDate)] },
    { $lte: ['$$item.bu_Da', new Date(toDateBls1)] 
    }
    ]
    }} } } },
    ]).exec((error, result) => {
    console.log(req.query);
    if (error) return res.status(401).json({Error:error.message});
    if(result[0]==null){
    MyLogger('getReportsBuying',USER.NOTFOUND)

    return res.status(400).json({ "Error": USER.NOTFOUND })
    }else if(result[0].list[0]==null){
    MyLogger('getReportsBuying',USER.DATA_NOTFOUND_BY_DATE)
    return res.status(400).json({ "Error":USER.DATA_NOTFOUND_BY_DATE })
    }
    if(result==null){
    MyLogger('getReportsBuying',GLOBAL.DATA_NOTFOUND)
    return res.status(400).json({"Error":GLOBAL.DATA_NOTFOUND})
    }
    console.log(error);
    return res.status(200).send(result)})    
    } catch (error) {
    MyLogger('getReportsBuying',error.message)
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}

    }




    async getReportsSales(req, res) {/* تقارير مبيعات الكروت  */
    const userId = req.query.userId;
    const fromDate = req.query.FromDate;
    const toDate = req.query.ToDate;
    const toUser = req.query.toUserId;
    try {

    console.log(new  Date(fromDate));
    console.log(new Date(toDate));
    await user_profile.aggregate([/*  المستخدم المرسل ي idفلتر مبيعات الكروت  حسب التاريخ و  */
    { $match: { "_id": ObjectId(userId) } },
    { $project: {list: { $filter: {input: '$outCome', as: 'item',
    cond: {$and: [ { $gte: ['$$item.bu_Da', new Date(fromDate)] },
    { $lte: ['$$item.bu_Da', new Date(toDate)] }, ],},}, }, }},
    // {   $unwind: {
    //     "path" : "$list",   "preserveNullAndEmptyArrays" : true
    // }},
    // {$unwind: { path: "$list", },},/* ملحوضه لا يعمل الامر الذي في السطر التالي الا بتفعيل هذا الامر */
    //  { $match: { 'list.to_Us': ObjectId(toUser) } },/* المرسل الية id فلتر حسب  */
    //  {$group: {  "_id": null, "list": { "$sum": '$list' }}}/*  اذا كنت كنت تريد اضهار عدد العمليات فقط من هذا الفلتر */

    ]).exec((error, result) => {
    if (error) return res.status(401).json({Error:error.message});
    if(result[0]==null){
    MyLogger('getReportsSales',USER.NOTFOUND)
    return res.status(400).json({ "Error": USER.NOTFOUND})
    }else if(result[0].list[0]==null){
    MyLogger('getReportsSales',USER.DATA_NOTFOUND_BY_DATE)
    return res.status(400).json({ "Error":USER.DATA_NOTFOUND_BY_DATE })
    }
    console.log(error);return res.status(200).send(result)}) 
    } catch (error) {
    MyLogger('getReportsSales',error.message)
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}

    }



    async getRemittancesToMyFromUserId(req, res) {/* الحولات الواصلة لي */
    const userId = req.query.userId;
    const fromUser = req.query.FromUserId;

    console.log(req.query);
    console.log(fromUser);        try {
    await user_profile.aggregate([/* ذالك المستخدم  (id) الحصول علا الحوالات الواصلة لي من  مستخدم معين عبر   */
    { $match: { "userId": ObjectId(userId) } },
    { $unwind: { path: "$inCome", }, },//convert array to object
    { $match: { 'inCome.fr_Us': ObjectId(fromUser) } },//filter by id fr_Us
    { $project: { _id: 0, inCome: 1, } },{$sort:{inCome:-1}},
    {$replaceRoot:{newRoot:"$inCome"}}
    ]).exec((error, result) => {
    if (error) return res.status(401).json({"Error":error.message})
    if(result[0]==null){
    MyLogger('getRemittancesToMyFromUserId',USER.NOTFOUND)
    return res.status(401).json({"Error":USER.NOTFOUND})
    }
    console.log(error); return res.status(200).json(result)})   
    } catch (error) {
    MyLogger('getRemittancesToMyFromUserId',error.message)
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}
    }




    async getTransferrersToUser(req, res) {/* الحولات الخارجه مني */
    const userId = req.query.userId;
    const toUser = req.query.toUserId;
    try {
    await user_profile.aggregate([/* ذالك المستخدم  (id) الحصول علا الحوالات التي ارسلها لي مستخدم معين عبر   */
    { $match: { "userId": ObjectId(userId) } },
    { $match: { 'outCome.to_Us': ObjectId(toUser) } },//filter by id to_Us
    { $project: { _id: 0, outCome: 1, }, },
    {$sort:{outCome:-1}},

    ]).exec((error, result) => {
    if (error) {
    MyLogger('getTransferrersToUser',error)
    return res.status(401).json({Error:error.message});}
    console.log(error);
    if(result[0]==null){
    MyLogger('getTransferrersToUser',USER.RECIPIENT_NOTFOUND)

    return res.status(401).json({"Error":USER.RECIPIENT_NOTFOUND})   
    }
    return res.status(200).json(result)})    
    } catch (error) {
    MyLogger("getTransferrersToUser==>" + error.message);
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}

    }



    async getTotalBuying(req, res) {/* اجمالي المشتريات */
    const userId = req.query.userId;
    try {
    await user_profile.aggregate([
    { "$match": { _id: ObjectId(userId) } },
    { $unwind: "$inCome" },
    { $group: { _id: "$inCome.am", count: { $sum: 1 } } },
    { $project: { _id: 0, inCome: "$_id", count: 1 } },
    {$sort:{inCome:-1}} ],
    function (err, data) {if (err) throw err;console.log(data);}
    ).exec((error, result) => {
    if (error) {
    MyLogger("getTotalBuying==>" + error.message);
     return res.status(401).json({Error:error.message});}
    if(result[0]==null){
    MyLogger("getTotalBuying==>" + USER.PURCHASING_NOTFOUND);
    return res.status(401).json({"Error":USER.PURCHASING_NOTFOUND})   
    }
    console.log(error);
    return res.status(200).send(result)
    });     
    } catch (error) {
    MyLogger("getTotalBuying==>" + error.message);
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}

    }



    async getTotalSales(req, res) {/* اجمالي المبيعات */
    const userId = req.query.userId;
    try {
    await user_profile.aggregate([
    { "$match": { _id: ObjectId(userId) } },
    { $unwind: "$outCome" },
    { $group: { _id: "$outCome.am", count: { $sum: 1 } } },
    { $project: { _id: 0, outCome: "$_id", count: 1,} },],
    function (err, data) {if (err) {
    MyLogger("getTotalSales==>" +error);
    throw err; console.log(data);}}
    ).exec((error, result) => {
    if (error) {
    MyLogger("getTotalSales==>" + error.message);
    return res.status(401).json({Error:error.message});}
    if(result[0]==null){
    MyLogger("getTotalSales==>" + USER.SALES_NOTFOUND);
    return res.status(401).json({"Error":USER.SALES_NOTFOUND})}
    console.log(error); 
    return res.status(200).send(result)});    
    } catch (error) {
    MyLogger("getTotalSales==>" +error.message);
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}
    }




    async getSalesAndBuying(req, res) {/* Post جلب المبيعات والمشتريات بنفس ال */
    const userId = req.query.userId;
    try {
    const findUser = await user_profile.find().where('inCome.fr_Us').equals(userId).select("inCome.am , inCome.status")
    .where('outCome.to_Us').equals(userId).select("outCome.am , outCome.status -_id")
    if(findUser[0]==null){
    MyLogger("getSalesAndBuying==>" +GLOBAL.DATA_NOTFOUNDe);
    return res.status(401).json({"Error":GLOBAL.DATA_NOTFOUND})
    }
    return res.status(200).json(findUser)
    } catch (error) {
    MyLogger("getSalesAndBuying==>" +error.message);
    console.log(error.message);
    return res.status(400).json({"Error": error.message })}
    }




    async CardStoreDetails(req, res) {
    const net_Id=req.query.network_Id;
    console.log(req.query);
    let mergeArrays;
    try {
    const pac = await   pac_Pr.find(/*   الحصول علا جميع الباقات ومقارنته با الباقات التي لم تضاف*/
    { ne: ObjectId(net_Id),isAdd: true,  },
    function(error, data) { 
    if(error)return res.status(404).json({Error:error.message})
    return data});
    const newArray=  pac.map(element => element.pac_Pr);
    await  Cards.aggregate([/* سيتم تكرار البيانات اكثر من مره من اجل فلترتها اكثر من مره */

    { $match: { "net_Id": ObjectId(net_Id),} },
    {$project:{ _id:{is_Ac:"$is_Ac",Is_new:"$Is_new",
    pac_Pr:"$pac_Pr", }}},
    { $facet: { "NewCards": [],}},
    {$unwind:"$NewCards"},
    {$replaceRoot:{newRoot:'$NewCards._id',}},

    { $facet: { "NewCards": [
    { $match: { "is_Ac":true,"Is_new":true,} },
    {$project:{
    _id:{is_Ac:"$is_Ac",Is_new:"$Is_new",pac_Pr:"$pac_Pr"}}},
    {$bucketAuto: {groupBy: "$_id.pac_Pr", buckets: 1000000000,
    output: { "count": { $sum: 1 },
    } }},    
    ],
    "SoldCards": [
    { $match: { "is_Ac":true,"Is_new":false,} },
    {$project:{
    _id:{is_Ac:"$is_Ac",Is_new:"$Is_new",pac_Pr:"$pac_Pr"}}},
    {$bucketAuto: {groupBy: "$_id.pac_Pr", buckets: 1000000000,
    output: { "count": { $sum: 1 },
    } }},    
    ],
    "InActive": [
    { $match: { "is_Ac":false,} },
    {$project:{
    _id:{is_Ac:"$is_Ac",Is_new:"$Is_new",pac_Pr:"$pac_Pr"}}},
    {$bucketAuto: {groupBy: "$_id.pac_Pr", buckets: 1000000000,
    output: { "count": { $sum: 1 },
    } }}, ],}},

    ]).exec((error,result)=>{

    let newCards=result[0].NewCards||0;

    let soldCards=result[0].SoldCards||0;

    let inActive=result[0].InActive||0;

    if(soldCards[0]==null){soldCards=[{_id:{min:0,max:0},count:0}]}

    if(newCards[0]==null){newCards=[{_id:{min:0,max:0},count:0}]}

    if(inActive[0]==null){inActive=[{_id:{min:0,max:0},count:0}]}
    const newArrays= inActive.map(element => element._id);
    const newArray1= soldCards.map(element => element._id.min);
    const newArray2= newCards.map(element => element._id.min);

    if(error)return res.status(404).json({Error:error.message})
    mergeArrays=[...newArray2, ...newArray1,];/* دمج اكثر من مصفوفة مع بعض */

    function arr_diff (a1, a2) {/* مقارنة الباقات التي مضاف اليها كروت وغير المضافة */
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {a[a1[i]] = true;}

    for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {  delete a[a2[i]];}
    else {a[a2[i]] = true;}
    }
    for (var k in a) {  diff.push(k);}
    return diff;
    }

    let packagenullcards= arr_diff(mergeArrays, newArray)
    if(packagenullcards[0]==null){
    packagenullcards[0]={_id:{min:0,max:0},count:0} }

    return res.status(200).json({
    "NewCards":newCards,"SoldCards":soldCards,
    "InActive":inActive,"EmptypackagesOfCards":packagenullcards})
    });
    } catch (error) {
    MyLogger("CardStoreDetails==>" +error.message);
    return res.status(401).json({Error:error.message});
    }
    }





    async  CardsSoldInSpecificated(req,res){
    let areas;
    const  net_Id=req.query.network_Id;
    try { 
    await coverageArea.find({net_Id:ObjectId(net_Id)}).select('name -_id').then(data=>{
    var nameSarees = data.map(x=>x.name)
    console.log(nameSarees)
    areas=nameSarees;
    console.log(areas);
    Cards.aggregate([

    { $match:{bu_Ar:{$in : [ 'الجرن', 'البعيمي', 'رقاب' ]}, "net_Id": ObjectId(net_Id), Is_new: false, is_Ac: true,} }, 
    { $project: {_id:{bu_Ar:"$bu_Ar",pac_Pr:"$pac_Pr"}}},
    { $facet: { 
    "outCome": [
    // {$bucketAuto: {groupBy: "$bu_Ar", buckets: 1000000000,
    // output: { "count": { $sum: 1 },
    // } }},
    {$bucketAuto: {groupBy: "$_id.bu_Ar", buckets: 1000000000,
    output: {
    //  "count": { $sum: 1 },
    "pac_Pr": { $push: "$_id.pac_Pr" },
    // count: { $sort: -1 },
    }}},
    ],

    //     "income": [
    //         // {$bucketAuto: {groupBy: "$bu_Ar", buckets: 1000000000,
    //         // output: { "count": { $sum: 1 },
    //         // } }},
    //     {$bucketAuto: {groupBy: "$_id.pac_Pr", buckets: 1000000000,
    //     output: { "count": { $sum: 1 }, "pac_Pr": { $push: "$_id.pac_Pr" },
    //     "bu_Ar": { $push: "$_id.bu_Ar" },
    //     countCards: { $sum: 1 },/* اجمالي الرصيد الذي اشتريت به من هذه الفئة */
    //     } }}


    // ],

    }},
    {$unwind:"$outCome"},
    {$replaceRoot:{newRoot:'$outCome',}},
    // {  $project: {
    //     item: 1,
    //     dimensions: { $arrayToObject: "$pac_Pr" }
    //  }}

    // {$unwind:"$pac_Pr"},
    // {$replaceRoot:{newRoot:'$pac_Pr',}},


    ]).then(data=>{
    console.log(data);
    return  res.json(data)
    //  console.log(data[index].pac_Pr+"");
    // var consume = [{"key":"Test1"},{"key":"Test2"},{"key":"Test3"},{"key":"Test1"},{"key":"Test3"},{"key":"Test1"}]
    //  const dats={}
    //             // var a = ["name", "name", "name", "2", "2", "2", "2", "2", "9", "4"]

    //             var a =  data[0].pac_Pr.reduce(function (acc, curr) {
    //                 if (typeof acc[curr] == 'undefined') {
    //                     acc[curr] = 1;
    //                 } else {
    //                     acc[curr] += 1;
    //                 }

    //                 return acc;
    //               }, {});


    //             //   console.log(a);
    //            var consume= [
    //             {
    //                 "bu_Ar": "الجرن",
    //                 "pac_Pr": 200
    //             },
    //             {
    //                 "bu_Ar": "الجرن",
    //                 "pac_Pr": 100
    //             },
    //             {
    //                 "bu_Ar": "رقاب",
    //                 "pac_Pr": 100
    //             },
    //             {
    //                 "bu_Ar": "رقاب",
    //                 "pac_Pr": 200
    //             },
    // { _id: { min: 'الجرن', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'الجرن', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'الجرن', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'الجرن', max: 'رقاب' }, pac_Pr: 100 },
    // { _id: { min: 'الجرن', max: 'رقاب' }, pac_Pr: 100 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 200 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 100 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 100 },
    // { _id: { min: 'رقاب', max: 'رقاب' }, pac_Pr: 100 }
    //   ]
    //  var temp = [];

    //  var produce = [];
    //  var produce1 = [];
    //  var nameSarees = data.map(x=>x.pac_Pr,function (x) { counts[x] = (counts[x] || 0) + 1; })
    // console.log([nameSarees]);
    // const array1 = ['a', 'b', 'c'];
    // var datass={};
    // var nameSarees=   data.forEach(element => {
    // //    var gg= element.pac_Pr. split(' []')[0]
    //     console.log(element.pac_Pr);

    //     // console.log(element.datass=   element.pac_Pr)
    // });
    // var index, len;
    // var a1 = data;
    // var array=[]
    // for (index = 0, len = a1.length; index < len; ++index) {
    //     // console.log(a1[index].pac_Pr);
    //     array.push(a1[index].pac_Pr   )
    // }
    // console.log(array);
    // var array_one = ['a','b','c','d'];
    // var array_two =['z','x','y','a'];
    // array_one.forEach(function(item){
    //   var isPresent = array_two.indexOf(item);
    //   if(isPresent !== -1){
    //     console.log(item)
    //   }
    // })
    // const counts = {};
    // const sampleArray =  [
    //             200,
    //             200,
    //             200,
    //             100,
    //             100
    //         ];
    // sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    // console.log(counts)
    //   const newData = [].concat(...array);

    // //   console.log(newData);
    //   var myArray =[[1,2,3,4,5], 
    //               [1,2,3,4,5], 
    //               [1,2,3,4,5], 
    //               [1,2,3,4,5]];
    //   console.log("[[" + myArray.join("],[") + "]]");
    // // # [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]
    // console.log(JSON.stringify(myArray));
    // # [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]
    // const items2 = ['pencil', 'book','pencil']

    // function find_duplicate_in_array(array){
    // const count = {}
    // const result = []

    // array.forEach(item => {
    //     if (count[item]) {
    //        count[item] +=1
    //        return
    //     }
    //     count[item] = 1
    // })

    // for (let prop in count){
    //     if (count[prop] >=2){
    //         result.push(prop)
    //     }
    // }

    // console.log(count)
    // return result;

    // }

    // find_duplicate_in_array(nameSarees)
    //  for(var i=0;i<data.length;i++){
    //      console.log('pac_Pr');
    //             var nameSarees = data.map(x=>x.pac_Pr,function (x) { counts[x] = (counts[x] || 0) + 1; })

    //      console.log(nameSarees);
    // //    function name(i) {
    // //    log
    // //     // for(var i=i;i<data.length;i++){
    // //     //     // console.log(data[i].pac_Pr[i]);
    // //     //     console.log('najeeb'+i);
    // //     //     // for(var i=0;i<data[0].pac_Pr.length;i++){
    // //     //     //     console.log('aslan');

    // //     //     //  } 
    // //     //  } 
    // //    }
    // //    name(i)
    //  }


    //  for(var i=0;i<consume.length;i++){
    //    if(temp.indexOf(consume[i].bu_Ar) == -1){
    //    		temp.push(consume[i].bu_Ar);
    //            var _datas = {};
    //            _datas.pac_Pr = consume[i].pac_Pr
    //            _datas.count = 1;
    //       var _data = [];

    //       _data.bu_Ar = consume[i].bu_Ar
    //       _data.count = 1;
    //       produce.push(_data,_datas,);

    //    }else{
    //      for(var j=0;j<produce.length;j++){
    //      		if(produce[j].pac_Pr === consume[i].pac_Pr){
    //         		var _x = parseInt(produce[j].count) + 1;
    //             produce[j].count = _x;
    //         }

    //      }
    //    }
    //  }

    // console.log(produce);
    // console.log(produce1);


    // const counts = {};
    // const sampleArray = ['a', 'a', 'b', 'c'];
    // sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    // console.log(counts)
    // var nameSarees = data[0].outCome.map(x=>x.pac_Pr,function (x) { counts[x] = (counts[x] || 0) + 1; })
    // console.log(nameSarees);
    // var namesareas1 = nameSarees.map(x=>x,function (x) { counts[x] = (counts[x] || 0) + 1; })
    // console.log(namesareas1);
    // const counts = {};
    // const sampleArray = ['a', 'a', 'b', 'c'];
    // nameSarees[0].map(function (x) { counts[x] = (counts[x] || 0) + 1; });
    // console.log(counts)
    // var nameSarees = data.map(x=>x,function (x) { counts[x] = (counts[x] || 0) + 1; })

    //    console.log(nameSarees);

    //    console.log(nameSarees[0].pac_Pr.sort());

    //    console.log(nameSarees.pac_Pr);
    // console.log(nameSarees[0].pac_Pr);
    // console.log(namesareasd);


    // const findDuplicates = (arr) => {
    //     let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
    //     // JS by default uses a crappy string compare.
    //     // (we use slice to clone the array so the
    //     // original array won't be modified)
    //     let results = [];
    //     for (let i = 0; i < sorted_arr.length - 1; i++) {
    //       if (sorted_arr[i + 1] == sorted_arr[i]) {
    //         results.push(sorted_arr[i]);
    //       }
    //     }
    //     return results;
    //   }

    //   let duplicatedArray = [9, 9, 111, 2, 2, 3, 4, 4, 5, 7];
    //   console.log(`The duplicates in ${duplicatedArray} are ${findDuplicates(duplicatedArray)}`);

    //               Array.prototype.unique = function () {
    //                 var r = new Array();
    //                 o:for(var i = 0, n = this.length; i < n; i++)
    //                 {
    //                     for(var x = 0, y = r.length; x < y; x++)
    //                     {
    //                         if(r[x]==this[i])
    //                         {
    //                             console.log('this is a DUPE!');
    //                             continue o;
    //                         }
    //                     }
    //                     r[r.length] = this[i];
    //                 }
    //                 return r;
    //             }

    //             var arr = [1,2,2,3,3,4,5,6,2,3,7,8,5,9];
    //             var unique = arr.unique();
    // console.log(unique);





















    //     Cards.aggregate(
    //     [
    //     { $match: { "net_Id": ObjectId(netwotkId), Is_new: false, is_Ac: true,} },

    //     /* get data from documents pac */
    //     {  $lookup:{from: "pac", pipeline: [{ $match: { net_Id: ObjectId (netwotkId) ,is_Ac:true } },
    //     { $project: { _id: 0, date: { _idpackage: "$_id", } } },
    //     { $replaceRoot: { newRoot: "$date" }
    //     }
    //     ], as: "detilecard"},},
    //     { $project: { _id: 0, date: { detilecard: "$detilecard",
    //     us_Bu:"$us_Bu",
    //     pac_Pr:"$pac_Pr"},},}, 

    // ]
    //     ).exec((error,result)=>{
    //     if(error)return res.status(404).json({Error:error.message})
    //     return  res.status(200).json(result)


    //     //     console.log(resulte[0]);
    //     //        const user = {'TheReports.to_Us.Village':'البعيمي' }

    //     //     const opts = [{ path: 'pac_Pr' ,
    //     //     select:"package_PriceId -_id",
    //     //     populate:{path:'package_PriceId',select:"pac_Pr "}}];

    //     //     const optsusers = [{ path: 'userId' ,
    //     //     select:"Village Governorate City -_id",

    //     //     //  match: { Village: { $sum: 1 } }
    //     //     }];

    //     //         const promise = pac.populate(resulte, opts)
    //     //         promise.then(data=>{
    //     //             const promise1 = users.  populate(data,optsusers);
    //     //             promise1.then(datas=>{
    //     //                 res.json(datas)


    //     //     // res.json(resulte)

    //     })
    }).catch(error=>{
    MyLogger("CardsSoldInSpecificated==>" +error.message);
    return res.status(401).json({Error:error.message});
    })  }).catch(error=>{
    MyLogger("CardsSoldInSpecificated==>" +error.message);
    return res.status(401).json({Error:error.message}); 
    })
    } catch (error) {
    MyLogger("CardsSoldInSpecificated==>" +error.message);
    return res.status(401).json({Error:error.message}); 
    }











    // .populate({path:'outCome.to_Us',select:('Village Governorate City -_id')});

    //    find({$match:{"outCome.status":'Salebalance'}}).select('-_id outCome')


    // {},{  "outCome.status":"baycard"})
    //    .where('outCome.status').equals('baycard')
    //    .select("outCome.am , outCome.to_Us , outCome.bu_Da , outCome.status , outCome._id")
    //    .populate('to_Us',) 

    // res.json(cardssold)


    // })
    }}


    module.exports = new users_reports();

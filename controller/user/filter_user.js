        const profile = require("../../models/users");
        const Cards = require("../../models/cards");
        const { Joi, ObjectId, mongoose, _, } = require('../../utils/utils')
        const {MyLogger } = require("../../utils/find_utils");
        const moment = require('moment');
        const { GOVERNORATE,NETWORK,USER,PHONE } = require('../../utils/Error/utils_Errors')

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
        15-ne= network
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

        class FilterBuying {


        async FilterBayingReports(req, res) {
        const net_Id = req.query.network_Id;
        const userId = req.query.userId;
        const package_Prices = req.query.package_Price;//🤨🤨🤨🤨🤨🤨🤨🤨
        const fromDate = req.query.FromDate;
        const toDate = req.query.ToDate;
        const fromUser = req.body.fromUserId;
        let try0 , try1;
        console.log(userId);
        /* Month  */ 
        var ThisMonth = moment().subtract(1,'month');
        const month1 = new Date(ThisMonth)
        const toMonthBlase1= month1.setDate(month1.getDate()+33);
        /* Day */
        var ThisToDay = moment().subtract('day').format('YYYY-MM-DD');
        const tomorrow = new Date(ThisToDay)
        const toDayBlase1= tomorrow.setDate(tomorrow.getDate()+1);
        const date = new Date(toDate)
        const ToDate=date.setDate(date.getDate()+1 )
        /* Year */
        var ThisYear = moment().subtract(1,'year');
        var ThisYear2 = moment().subtract(1,'year');

        var ThisYear2 = moment().subtract(10,'year');
        var ThisYear1 = moment().subtract('year');
        const blsYear=new Date(ThisYear1)
        console.log(new Date(ThisYear1));
        const resultBls=blsYear.setDate(blsYear.getDate()+250 )
        //........................................................
        const ToDay = req.query.ToDay;
        const Week = req.query.Week;
        const Month = req.query.Month;
        const Year = req.query.Year;
        let infoSelectData=false;
        console.log(Week);
        function filterAll() {
        if(moment(new Date(fromDate), "YYYY-MM-DD").isValid()==true&&
        moment(new Date(toDate),"YYYY-MM-DD").isValid()==true){
        try0=new Date(fromDate),try1=new Date(ToDate); console.log('toDate = Ok');}/* فلتر حسب التاريخ من ===>الي */
        /* فلتر حسب التاريخ من الى */
        else if(ToDay=='ToDay') {
        console.log(ToDay);
        try0= new Date(ThisToDay), try1=new Date(toDayBlase1)}/* فلتر حسب مبيعات اليوم */
        else if(Month=='Month'){
        console.log(Month);
        try0=new Date(ThisMonth._d) ,try1=new Date(toMonthBlase1)}/* فلتر حسب مبيعات الشهر */
        else if(Year=='Year'){
        console.log('Year');
        try0=new Date(ThisYear._d),try1= new Date(ThisYear1._d)}   /* فلتر حسب مبيعات السنه */
        else if(Week=='Week') {
        console.log('week');
        const date1 = new Date(); const today1 = date1.getDate();/* فلتر حسب مبيعات الاسبوع */
        const dayOfTheWeek1 = date1.getDay();
        const newDate1 = date1.setDate(today1 - dayOfTheWeek1 + 7);
        try1= new Date(newDate1);
        const date2= new Date();const today2 = date2.getDate();
        const dayOfTheWeek2 = date2.getDay();
        const newDate2 = date2.setDate(today2 - (dayOfTheWeek2 || 7));
        try0= new Date(newDate2);}else{
        infoSelectData=true;
        console.log('IF No Selected Data Do It This');
        try0=new Date(ThisYear2),try1=new Date(resultBls)}
        }
        filterAll()
        try {
        await profile.aggregate([/* فلتره تقارير المشتريات */
        { $match: { "_id": ObjectId(userId) } },
        /* get data from documents network */
        {  $lookup:{from: "networks", pipeline: [{ $match: { _id: ObjectId (net_Id) ,is_Ac:true } },
        { $project: { _id: 0, date: { na_A: "$na_A", } } },
        { $replaceRoot: { newRoot: "$date" } }], as: "networks"},},
        /* get data from documents users */
        { $lookup:{from: "users",pipeline: [{ $match: { "_id":ObjectId(userId)  } },
        { $project: { _id: 0, date: { us_Ty: "$us_Ty", nu_Ac: "$nu_Ac" ,},} },
        { $replaceRoot: { newRoot: "$date" } }], as: "users"},},
        { $project: { _id: 0,networks: "$networks", package_Prices: "$package_Prices" ,users:"$users",
        TheReports: { $filter: { input: '$outCome', as: 'item',cond: {$and: [
        {$eq: ['$$item.status','buyCard'],},/*فلتر حسب نوع العملية شراء كرت او تحويل رصيد  */
        { $gt: ['$$item.bu_Da',try0] }, { $lt: ['$$item.bu_Da',try1] },/* فلتر حسب مبيعات الاسبوع */
        { $eq: ['$$item.pac_Pr',Number(package_Prices)] },/* فلتر حسب سعر الباقة */
        ]},}},},},  
      
        { $project: {  TotalAmount: { $sum: "$TheReports.am" } ,package_Prices:1,TheReports:1,networks:1,users:1} },

        ]).exec((error, result) => {
          console.log(result);
        if(error){
        res.status(401).json({Error:error.message});
        return false;
        }
        if(result[0]==undefined){
          MyLogger('FilterBayingReports',USER.ERROR_ADDRESS)
        res.status(401).json({Error:USER.ERROR_ADDRESS});
        return false;
        }
        console.log(error);
        var b= JSON.stringify(result);
        var c = b.substring(1,b.length-1);
        const convertArray= JSON.parse(c);
        let am;
        let   TotalCommission;
        function validationAmount(){
        if(convertArray.TheReports[0]!==undefined){
        am =result[0].TheReports[0].am;
        const pac_Pr=result[0].TheReports[0].pac_Pr;
        TotalCommission =pac_Pr-am;
        if(infoSelectData==true){
          TotalCommission='No commission';
        console.log(infoSelectData);
        }
        }else {
        infoSelectData=false;
        const resultPri=am= result[0].TheReports[0]||0 ;
        console.log(resultPri);
        const pac_Pr=result[0].TheReports[0];
        TotalCommission =pac_Pr-am||{commission: 0};
        console.log(infoSelectData);
        }
        };

        validationAmount()
        console.log(TotalCommission);
        if(convertArray.TheReports[0]==undefined){
          MyLogger('FilterBayingReports',USER.MATCHES_NO_FILTER)
        res.status(401).json({Error:USER.MATCHES_NO_FILTER})
        return false;
        }else {
          console.log(TotalCommission+'lll');
        let countCards=0;convertArray.TheReports.forEach(function(element) { countCards++}); //<==== /* عدد الكروت */
        TotalCommission=  TotalCommission*countCards||0
       return  res.status(200).json({result,TotalCommission,countCards})
      }
        });
        } catch (error) {
        MyLogger('FilterBayingReports',error)
        return res.status(404).json({Error:error.message});
        }}




        async PackageBestSelling(req, res) { /* فلتر الاكثر باقات مشتريات */
        try {

        const reqQueryObject = req.query ;
        console.log(reqQueryObject);
        const userId = req.query.userId ;
        await profile.aggregate( [
        { $match: { "_id": ObjectId(userId), } },
        { $project: {list: { $filter: {input: '$outCome', as: 'item',
        cond: {
        $and: [ 
        {$eq: ['$$item.status','buyCard'],},],},}, }, }},
        { $project: {outCome:"$list"}},
        {$unwind: { path: "$outCome", },},
        { $facet: { 
        "outCome": [
        {$bucketAuto: {groupBy: "$outCome.pac_Pr", buckets: 1000000000,
        output: { "count": { $sum: 1 }, "outCome": { $push: "$outCome" },
        TotalBalance: { $sum: "$outCome.am" },/* اجمالي الرصيد الذي اشتريت به من هذه الفئة */
        } }}],}},
        {$unwind: '$outCome'}, 
        {$sort: {'outCome.count': -1}}, 
        {$group: {_id: '$_id', 'outCome': {$push: '$outCome'},},},
        {$unwind: '$outCome'}, 

        { $replaceRoot: { newRoot:{count:"$outCome.count",package:"$outCome._id.min",datas:"$outCome.outCome",TotalBalance:"$outCome.TotalBalance"}, } },
      // {$replaceRoot:{newRoot:"$outCome.outCome"}}
      // {$unwind: '$data'}, 

        ] ).exec((error ,result)=>{
     
        if (error)return res.status(401).json({Error:error.message});

        if(result[0]==undefined){
          MyLogger('FilterBayingReports',USER.MATCHES_NO_FILTER)
          res.status(401).json({Error:USER.MATCHES_NO_FILTER});
          return false;}
        var jsonObject = {
          "expirationDate":"April 21, 2017",
          "remainingDays":325,
          "seats":[{"activeStatus":"S","pid":"TE70","firstName":"TE70","countryid":840},
                  {"activeStatus":"Y","pid":"TE80","firstName":"TE80","countryid":845}]
           }
          var datass=[]
 var namesareas = result.map(x=>x.data,function (x) {

    counts[x] = (counts[x] || 0) + 1; 
    }
  
    
    )
          // console.log(namesareas);
        //   var lastElement = result[0].outCome.outCome[jsonObject.seats.length-1].countryid;
        //   console.log(lastElement);        // var countryId = result[0].outCome[0].outCome[result[0].outCome[0].outCome-1].op_Nu;
        // console.log(countryId);
        return res.json(result)
        })
        } catch (error) {
        MyLogger('PackageBestSelling',error.message)
        return res.status(401).json({Error:error.message});
        }
        }
     
   
        }
    module.exports = new FilterBuying();
    
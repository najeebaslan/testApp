



const DevicesInfo = require('../../models/devices/devices_info');
const { Joi, ObjectId, logger, mongoose, _ } = require('../../utils/utils')

/* <<<// Documentation >>>

1- De_StSchema = Devices Status Schema
2- dev_St_Id = Devices Status Id
3- De_In = Devices Info
4- de_Na = Devices Name
5-  ma = Manufacturer  الشركة المصنعة
6- de_Id= Device Id 
7- mac =Mac address
8- api_le= Api Level رقم النسخة ال 
9- re_Ba = released base  النطاق الاساسي
10- userId = User  Id
11- da_Ad =Date Add
*/


function De_In(id, body, userId,) {
   console.log(id);
   var info = {
      "_id": id,
      "de_Na": body.devices_Name,
      "model": body.model,
      "ma": body.Manufacturer,
      "de_Id": body.Device_Id,
      "mac": body.mac_Address,
      "re_Ba": body.releasedBase,
      "userId": userId,
      "dev_St_Id": body.dev_St_Id,
      "timestamps": true,
   };

   let Device_Info = new DevicesInfo(_.pick(info,
      [
         '_id',
         'de_Na',
         'model',
         'ma',
         'de_Id',
         'mac',
         're_Ba',
         'userId',
         'dev_St_Id',
         "timestamps",]
   ))



   return Device_Info


}

module.exports.De_In = De_In;


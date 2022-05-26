

const { Joi, ObjectId, logger, mongoose, _ } = require('../../utils/utils')
const DevicesSta = require('../../models/devices/devices_status');






/* <<<// Documentation >>>

1- De_StSchema = Devices Status Schema
2- de_In_Id = Devices Info Id
3- ip_Ad = Ip address
4- in = Interface
5- ap_Na = Apps Name
6- st = Status
7- ca = Capacity
8- da_Ad =Date Add 
9- ge = Gateway
10- ve = Version
11- te = Temperature 
12- sy_st = System Storage
13= ex_st = External Storage
14- userId = User Profile Id
15-in_Da=installing Date
16-De_St=Device status
*/

function myMap(AppsSchema) {
    return (AppsSchema).map(function (data, index) {
        return (
            {
                ap_Na: data.Apps_Name,
                ve: data.version,
                in_Da: data.installing_Date,
            }
        );
    });
}

function De_St(body, userId, device_Info_Id) {

    const id = new mongoose.Types.ObjectId();
    const BatterySchema = {
        level: body.level,
        st: body.status,
        te: body.temperature,
        ca: body.capacity,
        da_Ad: Date.now(),
    }
    const NetworkSchema = {
        ip_Ad: body.ip_Address,
        ge: body.gateway,
        in: body.interface,
        dbm: body.dbm,
        da_Ad: Date.now(),
    }

    const MemorySchema = {
        ram: body.ram,
        sy_St: body.system_Storage,
        ex_st: body.external_Storage,
        da_Ad: Date.now(),
    }

    let Device_Status = new DevicesSta({
        _id: id,
        De_St: {
            battery: BatterySchema,
            ne: NetworkSchema,
            apps: myMap(body.Apps,),
            memory: MemorySchema,
          
        },
        userId: userId,
        de_In_Id: device_Info_Id,
    })

    return Device_Status



}
module.exports.De_St = De_St;


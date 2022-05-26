      let { LANGUAGE } = require('../language/language')

      exports.NETWORK = {
      NOTFOUND: LANGUAGE ? 'not found this network .'
      : 'لم يتم العثور على هذه الشبكة',
      HAVENETWORK: LANGUAGE ? 'You already have a network added .'
      : '',
      EXIST_NETWORK_DETAILS: LANGUAGE ? "A network has been added with such details, please change the name or lo of the network ."
      : '',
      MATCHES_NO_FILTER: LANGUAGE ? 'There is no data that matches the filter you specified .'
      : '',
      NO_NETWORK_BY_NAME: LANGUAGE ? ' no network found by this name .'
      : 'لم يتم العثور على شبكة بهذا الاسم',

      ADD_IMG: LANGUAGE ? 'Image must be added .'
      : 'يجب اضافة  الصورة',
      ERROR_TYPE_IMG: LANGUAGE ? 'Only .png, .jpg and .jpeg format allowed! .'
      : 'يسمح فقط بتنسيق .png و .jpg و .jpeg!',





      }



      exports.USER = {
      NOTFOUND: LANGUAGE ? 'this user is not found .'
      : 'لم يتم العثور على هذا المستخدم',
      NOT_HAVE_THIS_NETWORK: LANGUAGE ? 'This network belongs to someone else .'
      : 'هذه الشبكة تنتمي إلى شخص آخر',
      EMAIL_EXIST: LANGUAGE ? 'This email already exists .'
      : ' هذا الايميل موجود مسبقاً',
      EMAIL_OR_PASS_ERR: LANGUAGE ? 'Username or password error ,'
      : ' خطاء في اسم المستخدم او كلمة المرور',
      ERROR_ADDRESS: LANGUAGE ? 'There is an error in the address .'
      : 'هناك خطأ في عناوين',
      MATCHES_NO_FILTER: LANGUAGE ? 'There is no data that matches the filter you selected'
      : 'لاتوجد بيانات متطابقة مع  الفلتر الذي قمت بتحديده',
      SAME_ID: LANGUAGE ? ' The id of the sender and receiver must not be the same .'
      : 'يجب ألا يكون معرف المرسل والمتلقي هو نفسه',
      SELECT_TYPE_OPERATION: LANGUAGE ? 'The type of transmission must be specified .'
      : 'يجب تحديد نوع عملية الإرسال',
      YOUR_BALANCE_IS: LANGUAGE ? 'Your balance is .'
      : 'رصيدك هو  ',
      YOUR_BALANCE_NOT_ENOUGH: LANGUAGE ? 'riyals not enough to perform this operation .'
      : 'غير كافي لاجراء هذه العملية ريال ',
      RIYALS: LANGUAGE ? 'riyals '
      : 'ريال',
      SALES_NOTFOUND: LANGUAGE ? 'Sales not found '
      : 'لا توجد مبيعات في الوقت الحالي',
      DATA_NOTFOUND_BY_DATE: LANGUAGE ? 'Data found for this date .'
      : 'يتم العثور على البيانات بهذا التاريخ',

      RECIPIENT_NOTFOUND: LANGUAGE ? 'The recipient  does not exist anymore .'
      : 'لم يعد المستلم موجودًا.',
      PURCHASING_NOTFOUND: LANGUAGE ? 'The purchases not found'
      : 'لا توجد مشتريات',


      }



      exports.GOVERNORATE = {
      NOTFOUND: LANGUAGE ? 'not found this governorate .'
      : 'لم يتم العثور على هذه المحافظة'

      }


      exports.PACKAGE = {
      NOTFOUND: LANGUAGE ? 'not found this package .'
      : 'لم يتم العثور على هذه الباقة',
      DELETED_SUCCESS: LANGUAGE ? 'The cards for this package have already been deleted .'
      : '',
      EQUAL_UAP: LANGUAGE ? "\"equalUAP\" must be one of [true or false ]. That means Equal username And password | or Different username and password ."
      : 'يجب أن تكون واحدة من [صواب أو خطأ]. هذا يعني أن اسم المستخدم وكلمة المرور متساويان | أو اسم مستخدم وكلمة مرور مختلفين',
      ALREADY_ADD: LANGUAGE ? 'You already have a package added with these same details .'
      : ' لديك بالفعل حزمة مضافة بنفس هذه التفاصيل .',
      EXIST_PACKAGE_DETAILS: LANGUAGE ? 'Details of this package have already been added .'
      : 'لقد تم اضافة تفاصيل هذة الباقة مسبقا .',
      EQUAL_UAP_NOT_ALLOWED: LANGUAGE ? 'Equal Username And Password is not allowed'
      : 'اسم مستخدم وكلمة مرور متساويين غير مسموح بهما',
      NOT_ADD: LANGUAGE ? 'This package is not added .'
      : 'هذه الباقة غير مضافة .',


      }


      exports.CARD = {
      NOTFOUND: LANGUAGE ? 'not found this card .'
      : 'هذا الكرت غير موجود',
      N_F_C_P: LANGUAGE ? 'There are no cards for this category at the moment .'
      : '',
      EXIST_CARD_USERNAME: LANGUAGE ? ' this is cards already exist . (The username already exist) .'
      : '',
      EXIST_CARD_PASSWORD: LANGUAGE ? 'this is cards already exist . (The password already exist) .'
      : '',
      EXIST_CARD_SIR_NUMBER: LANGUAGE ? 'this is cards already exist . (The serial Number already exist) .'
      : '',



      }
      exports.CSV = {
      NO_CSV: LANGUAGE ? 'csv file must be uploaded.'
      : '',
      ERROR_CSV: LANGUAGE ? 'There is an error. Verify that the data you have uploaded is correct .'
      : '',
      SUCCESSFULLY: LANGUAGE ? ' File uploaded successfully .'
      : 'تم رفع الملف بنجاح .',


      }



      exports.PHONE = {
      NOTFOUND: LANGUAGE ? 'Phone number not found .'
      : '',
      ALREADY_EXIST: LANGUAGE ? 'Phone number already exists .'
      : 'رقم الهاتف موجود مسبقاً',

      NOTFOUND_OLD: LANGUAGE ? 'not found old Phone number .'
      : 'لم يتم العثور على رقم الهاتف القديم.',

      EXIST: LANGUAGE ? 'The phone number is there'
      : 'رقم الهاتف موجود موجود',
      SEND_OLD_NUMBER_PH: LANGUAGE ? 'You must send your previous phone number'
      : 'يجب أن ترسل رقم هاتفك السابق',
      NUMBER_LENGTH: LANGUAGE ? 'length must be less than or equal to 9 characters long'
      : 'يجب أن يساوي الطول 9 ارقام ',
      INVALID: LANGUAGE ? 'invalid phone number .'
      : 'رقم الهاتف غير صحيح',
      TOW_NUMBER_FOR_MAIN: LANGUAGE ? '  Only two numbers are allowed for maintenance .'
      : 'يسمح فقط برقمين للصيانة',

      NO_TOW_EQUAL_NUMBER: LANGUAGE ? 'No two equal numbers are allowed .'
      : 'لا يسمح برقمين متساويين',

      IS_STRING: LANGUAGE ? 'must be a string'
      : 'يجب أن يكون نص',


      }



      exports.GLOBAL = {
      INVALID_DATA: LANGUAGE ? 'invalid data .'
      : 'البيانات غير صالحة',
      DATA_NOTFOUND: LANGUAGE ? 'Data not found'
      : 'لم يتم العثور على بيانات',

      }




      exports.AREA = {
      NOTFOUND: LANGUAGE ? 'Area not found .'
      : 'هذه المنطقة غير موجودة',
      EXIST: LANGUAGE ? 'this Area already exist .'
      : 'هذه المنطقة موجودة بالفعل ',
      AREAS_NOTFOUND: LANGUAGE ? 'Areas not found .'
      : 'لا توجد مناطق تغية',

      }



      exports.OFFER = {
      NOTFOUND: LANGUAGE ? 'There are no offers .'
      : 'لا توجد عروض',
      EXIST: LANGUAGE ? 'this offer already exist .'
      : 'هذا العرض موجود بالفعل.',
      NOT_AVAILABLE: LANGUAGE ? 'This offer is no longer available .'
      : 'هذا العرض لم يعد متوفر',
      NOTFOUND_ALL: LANGUAGE ? 'This offers is no longer available .'
      : 'هذه العروض لم تعد متوفرة',


      }




      exports.BLOCK = {
      IS_BLOCK: LANGUAGE ? 'You got banned for some reason !.'
      : 'لقد تم حظرك لسببً ما! ',

      }



      exports.LEVEL = {
      FIRST_REGISTER: LANGUAGE ? 'You must create details user .'
      : 'يجب عليك إنشاء تفاصيل المستخدم ',
      FIRST_DETAILS_USER: LANGUAGE ? 'You must create details user .'
      : 'يجب عليك إنشاء تفاصيل المستخدم  ',
      FIRST_NETWORK: LANGUAGE ? 'You must create network .'
      : 'يجب عليك إنشاء شبكة ',
      FIRST_COVERAGE_AREA: LANGUAGE ? 'You must create coverage areas the network .'
      : 'يجب إنشاء مناطق تغطية الشبكة .  ',

      FIRST_PACKAGE: LANGUAGE ? 'You must create packages .'
      : 'يجب عليك إنشاء الباقات  ',
      FIRST_COMMISSION: LANGUAGE ? 'You must create commission for users .'
      : 'يجب عليك إنشاء عمولة للمستخدمين ',
      FIRST_CSV: LANGUAGE ? 'You must create card csv first .'
      : 'يجب عليك إنشاء بطاقة csv أولاً',



      }



      exports.WEATHER = {
      NOTFOUND: LANGUAGE ? 'not found this card .'
      : 'هذا الكرت غير موجود',

      }




      exports.AUTH = {
      INVALID: LANGUAGE ? 'Access denied Make sure to send the token .'
      : 'الوصول مرفوض تاكد من ارسال التوكن',

      WRONG: LANGUAGE ? 'Wrong token .'
      : 'رمز التوكن خطاء',
      }




      exports.IS_ADMIN = {
      NOT_ADMIN: LANGUAGE ? 'You are is not Admin user....'
      : 'أنت لست مستخدم إداري ....',


      }
      exports.IS_BLOCK = {
      IS_BLOCK: LANGUAGE ? 'You got banned for some reason !.'
      : 'لقد تم حظرك لسبب ما!',


      }


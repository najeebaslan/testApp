/* 
4xx خطأ العميل 
============> 400 طلب سىء
لا يمكن تلبية الطلب بسبب سوء بناء الجملة.
خطأ عام عند تنفيذ الطلب قد يتسبب في حالة غير صالحة. بعض الأمثلة على ذلك أخطاء التحقق من صحة المجال ، والبيانات المفقودة ، وما إلى ذلك.


============>401 غير مصرح به
 استجابة رمز الخطأ لرمز المصادقة مفقود أو غير صالح.


 
============>403 ممنوع
فهم الخادم الطلب ، لكنه رفض تنفيذه. لن يساعد التفويض ولا يجب تكرار الطلب. إذا لم تكن طريقة الطلب هي HEAD ويرغب الخادم في الإعلان عن سبب عدم تلبية الطلب ، فيجب أن يصف سبب الرفض في الكيان. إذا لم يرغب الخادم في إتاحة هذه المعلومات للعميل ، فيمكن استخدام رمز الحالة 404 (غير موجود) بدلاً من ذلك.

ويكيبيديا
كان الطلب طلبا قانونيا لكن الخادم يرفض الرد عليه. على عكس الاستجابة 401 غير المصرح بها ، لن تحدث المصادقة أي فرق.

 رمز خطأ للمستخدم غير المصرح له بإجراء العملية أو أن المورد غير متوفر لسبب ما (مثل قيود الوقت ، وما إلى ذلك).


 ============> 404 غير موجود

ويكيبيديا
تعذر العثور على المورد المطلوب ولكن قد يكون متاحًا مرة أخرى في المستقبل. الطلبات اللاحقة من قبل العميل مسموح بها.

 يتم استخدامه عندما لا يتم العثور على المورد المطلوب ، سواء كان غير موجود أو إذا كان هناك 401 أو 403 تريد الخدمة إخفاءه لأسباب أمنية.


  ============> 406 غير مقبول
المورد المحدد بواسطة الطلب قادر فقط على إنشاء كيانات استجابة لها خصائص محتوى غير مقبولة وفقًا لعناوين القبول المرسلة في الطلب.

ما لم يكن طلب HEAD ، يجب أن تتضمن الاستجابة كيانًا يحتوي على قائمة بخصائص الكيان المتاحة والموقع (المواقع) التي يمكن للمستخدم أو وكيل المستخدم من خلالها اختيار الأكثر ملاءمة. يتم تحديد تنسيق الكيان بواسطة نوع الوسائط المحدد في حقل رأس نوع المحتوى. اعتمادًا على التنسيق وقدرات وكيل المستخدم ، قد يتم اختيار الخيار الأنسب تلقائيًا. ومع ذلك ، فإن هذه المواصفات لا تحدد أي معيار لمثل هذا الاختيار التلقائي.

ملاحظة: يُسمح لخوادم HTTP / 1.1 بإرجاع استجابات غير مقبولة وفقًا لعناوين القبول المرسلة في الطلب. في بعض الحالات ، قد يكون هذا أفضل من إرسال استجابة 406. يتم تشجيع وكلاء المستخدم على فحص رؤوس الاستجابة الواردة لتحديد ما إذا كانت مقبولة أم لا.
إذا كانت الاستجابة غير مقبولة ، يجب على وكيل المستخدم التوقف مؤقتًا عن استلام المزيد من البيانات والاستعلام من المستخدم لاتخاذ قرار بشأن الإجراءات الإضافية.

ويكيبيديا
المورد المطلوب قادر فقط على إنشاء محتوى غير مقبول وفقًا لرؤوس القبول المرسلة في الطلب.



============>407 مطلوب مصادقة الوكيل
هذا الرمز مشابه لـ 401 (غير مصرح به) ، لكنه يشير إلى أنه يجب على العميل أولاً مصادقة نفسه مع الوكيل. يجب أن يُرجع الوكيل حقل رأس مصادقة الوكيل (القسم 14.33) الذي يحتوي على تحدي ينطبق على الوكيل للمورد المطلوب. يجوز للعميل تكرار الطلب باستخدام حقل عنوان تفويض الوكيل المناسب (القسم 14.34). يتم شرح مصادقة وصول HTTP في "مصادقة HTTP: مصادقة الوصول الأساسية والملخصة".

ويكيبيديا
يجب على العميل أولاً مصادقة نفسه مع الوكيل.



 ==========>409 نزاع

من المرجح أن تحدث التعارضات استجابة لطلب PUT. على سبيل المثال ، إذا تم استخدام تعيين الإصدار وقام الكيان الذي يتم PUT بتضمين تغييرات على مورد تتعارض مع تلك التي تم إجراؤها بواسطة طلب سابق (جهة خارجية) ، فقد يستخدم الخادم الاستجابة 409 للإشارة إلى أنه لا يمكنه إكمال الطلب . في هذه الحالة ، من المحتمل أن يحتوي كيان الاستجابة على قائمة بالاختلافات بين النسختين بتنسيق محدد بواسطة نوع محتوى الاستجابة.

ويكيبيديا
يشير إلى أنه لا يمكن معالجة الطلب بسبب وجود تعارض في الطلب ، مثل تعارض التحرير.

متى سينتج تعارض في الموارد عن طريق تلبية الطلب. الإدخالات المكررة وحذف الكائنات الجذر عندما لا يتم دعم الحذف المتتالي هما مثالان.


===========>410 ذهب
تهدف الاستجابة 410 في المقام الأول إلى مساعدة مهمة صيانة الويب عن طريق إخطار المستلم بأن المورد غير متاح عن قصد وأن مالكي الخادم يرغبون في إزالة الروابط البعيدة إلى ذلك المورد. مثل هذا الحدث شائع للخدمات الترويجية محدودة الوقت وللموارد الخاصة بأفراد لم يعودوا يعملون في موقع الخادم. ليس من الضروري وضع علامة على جميع الموارد غير المتاحة بشكل دائم على أنها "مفقودة" أو الاحتفاظ بالعلامة لأي فترة زمنية - وهذا متروك لتقدير مالك الخادم.

ويكيبيديا
يشير إلى أن المورد المطلوب لم يعد متاحًا ولن يكون متاحًا مرة أخرى. يجب استخدام هذا عند إزالة المورد عن قصد ويجب إزالة المورد. عند استلام رمز الحالة 410 ، يجب ألا يطلب العميل المورد مرة أخرى في المستقبل. يجب على العملاء مثل محركات البحث إزالة المورد من مؤشراتهم. لا تتطلب معظم حالات الاستخدام من العملاء ومحركات البحث مسح المورد ، ويمكن استخدام "404 Not Found" بدلاً من ذلك.

===========>412 فشل الشرط المسبق
تم تقييم الشرط المسبق المقدم في واحد أو أكثر من حقول عنوان الطلب على "خطأ" عند اختباره على الخادم. يسمح رمز الاستجابة هذا للعميل بوضع شروط مسبقة على معلومات المورد الحالية (بيانات حقل الرأس) وبالتالي منع الطريقة المطلوبة من أن يتم تطبيقها على مورد آخر غير المقصود.

ويكيبيديا
عدم استيفاء الخادم لأحد الشروط المسبقة التي وضعها مقدم الطلب في الطلب.
==========>413 كيان الطلب كبير جدًا
يرفض الخادم معالجة الطلب لأن كيان الطلب أكبر مما يرغب الخادم في معالجته أو يكون قادرًا على معالجته. قد يغلق الخادم الاتصال لمنع العميل من متابعة الطلب.

إذا كانت الحالة مؤقتة ، فيجب أن يتضمن الخادم حقل إعادة المحاولة - بعد العنوان للإشارة إلى أنه مؤقت وبعد أي وقت قد يحاول العميل مرة أخرى.

ويكيبيديا
الطلب أكبر مما يرغب الخادم أو يمكنه معالجته.


===========>415 نوع وسائط غير مدعوم
يرفض الخادم خدمة الطلب لأن تنسيق كيان الطلب غير مدعوم من قبل المورد المطلوب للطريقة المطلوبة.

ويكيبيديا
يحتوي كيان الطلب على نوع وسائط لا يدعمه الخادم أو المورد. على سبيل المثال ، يقوم العميل بتحميل صورة كصورة / svg + xml ، لكن الخادم يتطلب أن تستخدم الصور تنسيقًا مختلفًا.


============>416 النطاق المطلوب غير مرضي
يجب أن يُرجع الخادم ردًا مع رمز الحالة هذا إذا تضمن الطلب حقل عنوان طلب النطاق (القسم 14.35) ، ولم تتداخل أي من قيم محدد النطاق في هذا الحقل مع النطاق الحالي للمورد المحدد ، ولم يكن الطلب كذلك تضمين حقل عنوان الطلب If-Range. (بالنسبة إلى نطاقات البايت ، يعني هذا أن نقطة البايت الأولى لجميع قيم مواصفات نطاق البايت كانت أكبر من الطول الحالي للمورد المحدد.)

عندما يتم إرجاع رمز الحالة هذا لطلب نطاق بايت ، يجب أن تتضمن الاستجابة حقل رأس كيان نطاق المحتوى يحدد الطول الحالي للمورد المحدد (انظر القسم 14.16). يجب ألا تستخدم هذه الاستجابة نوع المحتوى متعدد الأجزاء / النطاقات الثانوية.

ويكيبيديا
طلب العميل جزءًا من الملف ، لكن الخادم لا يمكنه توفير هذا الجزء. على سبيل المثال ، إذا طلب العميل جزءًا من الملف يقع بعد نهاية الملف



========>418 أنا إبريق شاي (RFC 2324)
ويكيبيديا
تم تعريف هذا الرمز في عام 1998 كواحد من نكات IETF April Fools التقليدية ، في RFC 2324 ، بروتوكول التحكم في Hyper Text Coffee Pot ، ولا يُتوقع أن يتم تنفيذه بواسطة خوادم HTTP الفعلية. ومع ذلك ، لا توجد تطبيقات معروفة. يستخدم خادم Nginx HTTP هذا الرمز لمحاكاة سلوك يشبه goto في تكوينه.



==========>420 تعزيز الهدوء الخاص بك (تويتر)
ويكيبيديا
يتم إرجاعها بواسطة Twitter Search and Trends API عندما يكون العميل محدود السعر. النص عبارة عن اقتباس من "Demolition Man" ومن المحتمل أن يكون رمز "420" إشارة إلى ارتباط هذا الرقم بالماريجوانا. قد ترغب خدمات أخرى في تنفيذ رمز استجابة 429 عددًا كبيرًا جدًا من الطلبات بدلاً من ذلك.



=============>423 مؤمن (WebDAV)
رمز الحالة 423 (مغلق) يعني أن المصدر أو المصدر الوجهة للطريقة مؤمن. يجب أن تحتوي هذه الاستجابة على كود شرط مسبق مناسب أو كود شرط لاحق ، مثل "lock-token-submit" أو "no-trouble-unlock-lock".

ويكيبيديا
المورد الذي يتم الوصول إليه مقفل.







===========>424 تبعية فاشلة (WebDAV)
رمز الحالة 424 (التبعية الفاشلة) يعني أنه لا يمكن تنفيذ الطريقة على المورد لأن الإجراء المطلوب يعتمد على إجراء آخر وفشل هذا الإجراء. على سبيل المثال ، إذا فشل أمر في طريقة PROPPATCH ، فعندئذٍ ، على الأقل ، ستفشل بقية الأوامر أيضًا مع 424 (التبعية الفاشلة).

ويكيبيديا
فشل الطلب بسبب فشل طلب سابق (مثل PROPPATCH).



=============>426 ترقية مطلوبة
يتطلب التفاوض الموثوق والقابل للتشغيل المتبادل لميزات الترقية إشارة فشل لا لبس فيها. يسمح كود الحالة المطلوب ترقية 426 للخادم بأن يحدد بشكل نهائي امتدادات البروتوكول الدقيقة التي يجب تقديم مورد معين بها.

ويكيبيديا
يجب على العميل التبديل إلى بروتوكول مختلف مثل TLS / 1.0.






=============>428 شرط مسبق مطلوب
يشير رمز الحالة 428 إلى أن الخادم الأصلي يتطلب أن يكون الطلب مشروطًا.

استخدامه المعتاد هو تجنب مشكلة "التحديث المفقود" ، حيث يقوم العميل بإرجاع حالة المورد وتعديلها ووضعها مرة أخرى على الخادم ، بينما يقوم طرف ثالث بتعديل الحالة على الخادم ، مما يؤدي إلى حدوث تعارض. من خلال طلب أن تكون الطلبات مشروطة ، يمكن للخادم التأكد من أن العملاء يعملون مع النسخ الصحيحة.

يجب أن توضح الردود التي تستخدم رمز الحالة هذا كيفية إعادة إرسال الطلب بنجاح.

رمز الحالة 428 اختياري ؛ لا يمكن للعملاء الاعتماد على استخدامه لمنع تعارضات "التحديث المفقود".

ويكيبيديا
يتطلب الخادم الأصلي أن يكون الطلب مشروطًا. يهدف إلى منع مشكلة "التحديث المفقود" ، حيث يستعيد العميل حالة المورد ويعدلها ويعيدها إلى الخادم ، بينما يقوم طرف ثالث بتعديل الحالة على الخادم ، مما يؤدي إلى حدوث تعارض.



===============>431 حقول رأس الطلب كبيرة جدًا
يشير رمز الحالة 431 إلى أن الخادم لا يرغب في معالجة الطلب لأن حقول رأسه كبيرة جدًا. يمكن إعادة تقديم الطلب بعد تقليل حجم حقول رأس الطلب.

يمكن استخدامه عندما تكون مجموعة حقول رأس الطلب في المجموع كبيرة جدًا ، وعندما يكون هناك خطأ في حقل رأس واحد. في الحالة الأخيرة ، يجب أن يحدد تمثيل الاستجابة حقل العنوان الذي كان كبيرًا جدًا.

الخوادم غير مطلوبة لاستخدام رمز الحالة 431 ؛ عند التعرض للهجوم ، قد يكون من الأنسب إسقاط الاتصالات أو اتخاذ خطوات أخرى.

ويكيبيديا
لا يرغب الخادم في معالجة الطلب لأن إما حقل رأس فردي ، أو جميع حقول الرأس مجتمعة ، كبيرة جدًا.



============>444 لا يوجد رد (Nginx)
ويكيبيديا
امتداد خادم Nginx HTTP. لا يعرض الخادم أي معلومات للعميل ويغلق الاتصال (مفيد كرادع للبرامج الضارة).



============>450 محظور بواسطة Windows Parental Controls (Microsoft)
ويكيبيديا
امتداد مايكروسوفت. يظهر هذا الخطأ عند تشغيل Windows Parental Controls وحظر الوصول إلى صفحة الويب المحددة.


=========>451 غير متوفر لأسباب قانونية
ويكيبيديا
يُقصد استخدامها عند رفض الوصول إلى الموارد لأسباب قانونية ، مثل الرقابة أو الوصول المحظور الذي تفرضه الحكومة. إشارة إلى رواية 1953 البائسة فهرنهايت 451 ، حيث تم حظر الكتب ، ودرجة حرارة الاشتعال الذاتي للورق ، 451 درجة فهرنهايت.



============>402 الدفع مطلوب
هذا الرمز محجوز للاستخدام في المستقبل.

ويكيبيديا
محجوزة للاستخدام في المستقبل. كان القصد الأصلي هو استخدام هذا الرمز كجزء من شكل من أشكال النقد الرقمي أو نظام الدفع المصغر ، لكن هذا لم يحدث ، وهذا الرمز لا يستخدم عادة. وكمثال على استخدامها ، تقوم خدمة MobileMe من Apple بإنشاء خطأ 402 ("httpStatusCode: 402" في سجل وحدة تحكم Mac OS X) إذا كان حساب MobileMe متأخرًا.


=============>405 طريقة غير مسموح بها
الطريقة المحددة في "سطر الطلب" غير مسموح بها للمورد المحدد بواسطة معرف URI للطلب. يجب أن تتضمن الاستجابة عنوان السماح الذي يحتوي على قائمة بالأساليب الصالحة للمورد المطلوب.

ويكيبيديا
تم تقديم طلب لمورد باستخدام طريقة طلب لا يدعمها هذا المورد ؛ على سبيل المثال ، استخدام GET في نموذج يتطلب تقديم البيانات عبر POST ، أو استخدام PUT في مورد للقراءة فقط.






=======>408 طلب المهلة
لم يقدم العميل طلبًا خلال الوقت الذي كان الخادم جاهزًا للانتظار. يجوز للعميل إعادة الطلب دون تعديلات في أي وقت لاحق.

ويكيبيديا
انتهت مهلة الخادم في انتظار الطلب. وفقًا لمواصفات W3 HTTP: "لم يقدم العميل طلبًا خلال الوقت الذي كان الخادم فيه جاهزًا للانتظار. يجوز للعميل إعادة الطلب دون تعديلات في أي وقت لاحق."


مطلوب الطول =======>411   
يرفض الخادم قبول الطلب بدون تحديد طول المحتوى. يجوز للعميل تكرار الطلب إذا قام بإضافة حقل صالح بطول المحتوى يحتوي على طول نص الرسالة في رسالة الطلب.

ويكيبيديا
لم يحدد الطلب طول المحتوى المطلوب من قبل المورد المطلوب.



==============>414 Request-URI طويل جدًا
يرفض الخادم خدمة الطلب لأن Request-URI أطول مما يرغب الخادم في تفسيره. من المحتمل أن تحدث هذه الحالة النادرة فقط عندما يقوم العميل بتحويل طلب POST بشكل غير صحيح إلى طلب GET مع معلومات استعلام طويلة ، عندما ينزل العميل إلى "ثقب أسود" URI لإعادة التوجيه (على سبيل المثال ، بادئة URI معاد توجيهها تشير إلى لاحقة من نفسها) ، أو عندما يتعرض الخادم للهجوم من قبل عميل يحاول استغلال الثغرات الأمنية الموجودة في بعض الخوادم باستخدام مخازن مؤقتة ذات طول ثابت لقراءة أو معالجة عنوان URI للطلب.

ويكيبيديا
كان URI المقدم طويلاً جدًا بحيث يتعذر على الخادم معالجته.






============>417 فشل التوقع
لا يمكن تلبية التوقع الوارد في حقل توقع عنوان الطلب (انظر القسم 14.20) بواسطة هذا الخادم ، أو إذا كان الخادم وكيلاً ، فإن الخادم لديه دليل لا لبس فيه على أنه لا يمكن تلبية الطلب بواسطة خادم الخطوة التالية .

ويكيبيديا
لا يمكن للخادم تلبية متطلبات حقل توقع عنوان الطلب.




===========>422 كيان غير قابل للمعالجة (WebDAV)
رمز الحالة 422 (كيان غير قابل للمعالجة) يعني أن الخادم يفهم نوع محتوى كيان الطلب (وبالتالي فإن رمز الحالة 415 (نوع الوسائط غير المدعوم) غير مناسب) ، وبناء جملة كيان الطلب صحيح (وبالتالي 400 (طلب غير صالح) ) رمز الحالة غير مناسب) ولكن لم يكن قادرًا على معالجة التعليمات الواردة. على سبيل المثال ، قد تحدث حالة الخطأ هذه إذا كان نص طلب XML يحتوي على تعليمات XML جيدة التكوين (أي صحيحة نحويًا) ، ولكنها خاطئة من الناحية اللغوية.

ويكيبيديا
تم صياغة الطلب بشكل جيد ولكن تعذر متابعته بسبب الأخطاء الدلالية.


==========>425 محجوز لـ WebDAV
سلين ، جيه ، وايتهيد ، إي جيه ، وآخرون ، "بروتوكول مجموعات WebDAV المتقدم" ، العمل قيد التقدم.

ويكيبيديا
تم تعريفه في مسودات "بروتوكول مجموعات WebDAV المتقدم" ، ولكنه غير موجود في "بروتوكول المجموعات المطلوبة للتأليف الموزع وتعيين الإصدار (WebDAV)".


=========>429 طلبات كثيرة جدًا
يشير رمز الحالة 429 إلى أن المستخدم أرسل عددًا كبيرًا جدًا من الطلبات في فترة زمنية معينة ("تحديد المعدل").

يجب أن تتضمن إقرارات الاستجابة تفاصيل تشرح الحالة ، وقد تتضمن رأس إعادة المحاولة بعد الذي يشير إلى مدة الانتظار قبل تقديم طلب جديد.

عندما يتعرض خادم للهجوم أو يتلقى عددًا كبيرًا جدًا من الطلبات من طرف واحد ، فإن الاستجابة لكل منها برمز الحالة 429 ستستهلك الموارد.

لذلك ، الخوادم غير مطلوبة لاستخدام رمز الحالة 429؛ عند الحد من استخدام الموارد ، قد يكون من الأنسب إسقاط الاتصالات أو اتخاذ خطوات أخرى.

ويكيبيديا
أرسل المستخدم عددًا كبيرًا جدًا من الطلبات في فترة زمنية معينة. معدة للاستخدام مع مخططات تحديد المعدل.



===========>449 أعد المحاولة مع (مايكروسوفت)
ويكيبيديا
امتداد مايكروسوفت. يجب إعادة محاولة الطلب بعد تنفيذ الإجراء المناسب.


========>499 طلب العميل مغلق (Nginx)
ويكيبيديا
امتداد خادم Nginx HTTP. يتم تقديم هذا الرمز لتسجيل الحالة عندما يتم إغلاق الاتصال بواسطة العميل أثناء معالجة خادم HTTP لطلبه ، مما يجعل الخادم غير قادر على إرسال رأس HTTP مرة أخرى.



















*/
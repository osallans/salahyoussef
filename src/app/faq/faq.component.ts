import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  enContent:string;
  arContent:string;
  constructor(public translateService:TranslateService) { }

  ngOnInit(): void {
    this.arContent='<b>ماهو بيتك جاييد؟</b> <br/> هو أول منصة إلكترونية تجمع العديد من المتخصصين المصريين المُتميزين في مجال الأثاث والمفروشات والتصميم الداخلي، لتُساعدك في تجهيز بيت أحلامك بطريقة أسهل وأسرع مِن أي وقتٍ مضى، وذلك عن طريق تقديم فيديوهات مُختلفة حول الأراء والمُقترحات التي تخص كُل ما له علاقة بتجهيز بيتك. <hr/><br/> <b>كيف يُمكنني استبدال أو استرجاع طلبي؟ </b> <br/> إذا لم تكن راضيًا عن طلبك؛ فيُمكنك إرجاعه أو استبداله وفقًا لسياسات المتجر الذي قُمت بالشراء مِن خلاله. لعمل طلب إرجاع أو استبدال للمُنتج، يرجى التواصل مع المتجر نفسه. <hr/><br/> <b>كيف يُمكنني التواصل مع أى متجر؟ </b> <br/> في حالة الرغبة في التواصل مع أى متجر فلك الاختيار بين خيارين: الأول: مِن خلال قائمة المتاجر على الموقع، قم باختيار المتجر الذي تريد زيارته، سيظهر لك كل أماكن الفروع مواعيد عمل كل فرع حتى تضمن الحفاظ على وقتك، ايضاً ارقام الفروع لسهولة التواصل و الاستفسارات مع عنوان الفرع و خاصية ظهور الموقع من خلال رابط خرائط جوجل لسهولة الوصول. الثاني: في حالة اختيار منتج بعينه، فاضغط على هذا المنتج، وضمن المعلومات المتوفرة على يمين الشاشة، قم بالضغط على "إظهار المزيد" في اسم المتجر، وسينقلك إلى نهاية الصفحة التي تعرض جميع فروع المتجر، ساعات العمل،ارقام التواصل وكافة العناوين بالتحديد، كذلك رابط خرائط جوجل لسهولة الوصول. <hr/><br/> <b>من هم المتاجر المُتواجده على بيتك جاييد؟ </b> <br/> كُل متجر متواجد على بيتك جاييد هو متجر مستقل يُمثل ذاته ويدير عمليات البيع والشراء وفقًا للسياسة الخاصة به. في حالة الرغبة في التواصل مع المتجر للسؤال عن منتج بعينه أو لتأكيد الشراء أو حتى لعمل طلب استرجاع، يُمكنك التواصل مع المتجر مُباشرةً من خلال الصفحة الخاصة به على مواقع التواصل الاجتماعي أو مِن خلال أرقام الهواتف المرفقة له مِن خلال بيتك جاييد. <br/> كذلك إذا كان لديك أي شكوى أو استسفار مُحدد حول ما قومت بشرائه أو عن أي مُنتج ترغب في شرائه، يُمكنك التواصل مع المتجر ذاته مِن خلال أرقام الهواتف المُتاحة أو مِن خلال صفحات التواصل الإجتماعي الخاصة بالمتجر والتي يُمكنك أن تجدها بسهولة على الصفحة الخاصة بالمتجر على بيتك جاييد. ايضًا، يُمكنك اللجوء لهذا الحل إذا كان الأمر يخص مشكلة ما أو طلب الاستفسار عن مُنتج قُمت بشرائه بالفعل مُسبقًا. <hr/><br/> <b>هل يُقدم بيتك جاييد سلع ام خدمات؟ </b> <br/> يقوم بيتك جاييد بتقديم خدمة بتوفير إرشادات عن سوق الاثاث فى مصر و ذلك من خلال: عرض المنتجات المتوفرة بالسوق المصري سواء كانت محلية الصنع أو مستوردة بأنماط وأصناف مختلفة.تقديم سلسلة من مراجعات الفيديو تعرض تفاصيل المفروشات المنزلية ذات العلامات التجارية الرائدة في مصر.إعداد مُدوًنة مِن قبل فريق العمل عن تَعطى نصائح هامة مُتعلقة برحلة البحث عن الافضل و المناسب من الاثاث مع كيفية اختيار المفروشات للحصول على غٌرفة متناسقة وجميلة. كذلك يُقدم بيتك جاييد عروض وخصومات حصرية فقط عند الشراء من المتاجر المشتركة معنا. <hr/><br/> <b>ما نوع الخدمات التي يُقدمها بيتك جاييد؟ </b> <br/> يوفر بيتك جاييد الخدمات التالية: <br/> نصائح وخدمات ومتاجر عديدة خاصة بالأثاث والمفروشات لنُسهل عليك عملية فرش منزلك وتوفير الوقت والمجهود لكافة عُملائنا. <br/> فيديوهات عن أحدث الصيحات والآراء والمقترحات الخاصة بالتجهيز والمفروشات. <br/> خصومات وعروض على المنتجات مِن قبل العديد مِن العلامات التجارية الشهيرة في صناعة الأثاث والمفروشات. <br/> مدونات حول أحدث الصيحات والآراء والمقترحات الخاصة بالتجهيز والمفروشات. <hr/><br/> <b>ماهي المتاجر التي يُمكنني الحصول على خصومات وعروض مِن خلالها؟ </b> <br/> يُمكنك معرفة كل المتاجر المتوفرة على بيتك جاييد التي يُمكنك الحصول على عروض وخصومات مِن خلالها مِن هُنا العروض <hr/><br/> <b>كيف يُمكنني معرفة أحدث العروض والخصومات؟ </b> <br/> قُمّ بزيارة الجزء الخاص بالعروض الآن على الموقع لمعرفة أخر وأحدث العروض والخصومات. اشترك مجانًا الآن. <hr/><br/> <b>كيف يُمكنني الاستفادة مِن الخصم الخاص ببيتك جاييد؟</b> <br/> قم مجاناً بالتسجيل على الموقع للإستفادة من الخصومات و العروض، عندها سيصلك بريد إلكترونى للتأكيد. لتفعيل الخدمة) لاول مرة فقط( عليك الانتظار 24 ساعة بعد التسجيل لزيارة أول متجر. <br/> عند وصولك للمتجر: ١- إفتح موقع www.beitakguide.com عند وصلك المحل. <br/> ٢- قُمّ بنسخ الـ QR كود الخاص بـبيتك جاييد والذي تجده عند الكاشيير. <br/> ٣- شارك كود الخصم مع مسؤول المبيعات لتستفيد مِن الخصم الحصري الخاص بك. <br/> قُم بزيارة الجزء الخاص بالعروض والخصومات على الموقع لمعرفة أي محلات/عروض يُمكنك الحصول على خصم مِن خلالها. ';
    this.enContent='<b/>What is Beitak-Guide?</b> <br/> It is the first furniture directory in Egypt that provides market guidance through video reviews created by our passionate expert team that show different furniture products’ design and quality as well as a variety of home furnishing products and accessories from very well-known brands in Egypt. Furthermore, it provides different blog posts discussing essential tips and tricks when furnishing your home. <hr/><br/> <b>How can I purchase an item?</b> <br/> To guarantee that you are choosing the right style for you, Beitak-Guide advises you to visit the nearest store branch to have that ‘touch and feel’ of selected products prior to purchase. Also, you can only enjoy our exclusive promotions for free-registered Beitak-Guide customers in-store. How can I make a return or exchange an item? Beitak-Guide is not an online shopping platform, it only connects you with different home product brands. Therefore, if you’re unsatisfied with an order, you may be able to return or exchange your order, depending on the furniture store’s policies. To request a return, or exchange an item, please contact the shop directly. <hr/><br/> <b>How to contact a furniture store?</b> <br/> You can contact a store through one of the below options: Browse the available furniture stores from the ‘Stores’ tab and click on the store of your choice. You will find a list showing all store branches showing all branch information for your convenience such as; opening hours, contact numbers and address with a google maps link to facilitate your drive. When you come across a product you like, click on that image and you’ll find the furniture brand mentioned on the left. To find out where are the store branches, click on ‘View more’ beneath the manufacturer’s name and you’ll be directed to all the necessary information such as; opening hours, contact numbers and address with a google maps link to facilitate your drive. <hr/><br/> <b>Who are the sellers?</b> <br/> Each shop on Beitak-Guide is independent. Shop owners (or ‘sellers’) are independent micro-businesses who create or curate their inventory and manage their orders. <br/> If you have specific requirements or questions, contacting a store/branch directly through their phone numbers available at the store’s info would be the best way to get information about any item. You can also do this to resolve any issues you may have with your order. Each seller on Beitak-Guide manages their own orders and makes decisions about cancellations, refunds, and returns according to their return policy. <hr/><br/> <b>Does Beitak-Guide provide products or services?</b> <br/> Beitak-Guide provides market guidance that highlight the wide variety of products and designs through four main services; Showcasing products available in the Egyptian market whether locally manufactured or imported with different styles and varieties. A series of video reviews that displays the intricate details of furniture designs displaying the quality, style and variety of home furniture stores from leading furniture brands in Egypt. Different blog articles discussing all tips and tricks when furnishing your homes. Exclusive discounts and offers for in-store purchases at all subscribed stores. <hr/><br/> <b>What are the services Beitak-Guide providing?</b> <br/> Beitak-Guide provides the following: <br/> A directory of furnishing brands in one place to save effort and time <br/> Video reviews on different furniture brands to help match your taste, style and budget easily <br/> Exclusive discounts to free-registered Beitak-Guide subscribers <br/> Blogs that have the latest home furnishing tips and tricks. <hr/><br/> <b>What stores can I get discounts at? </b> <br/> You’ll find all the available stores you can get discounts here: Promotions. <hr/><br/> <b>How can I be updated with new promotions?</b> <br/> For the latest exclusive promotions at our partner stores, please check ‘Promotions’ tab. <hr/><br/><b>How can I claim the discount?</b> <br/> Register -for free- through the website, automatically you will receive a confirmation e-mail. For activating the service (needed only once), kindly wait 24 hours after registration to have your first store visit. <br/> Sign in at www.beitakguide.com on your visit. <br/> Scan Beitak-Guide QR code located at the cashier. <br/> Share discount promo code received with the Sales person. <br/> Please visit the ‘promotion’ tab on the website to find all stores offering the discount. SUBSCRIBE NOW FOR FREE!! ';
  }

}

SANSHINE E-COMMERCE WEBSITE

Built with HTML, CSS, JavaScript and Bootstrap 5.3.3.

PAGES
- index.html: home page
- shop.html: product catalogue and filters
- order.html: order form that prepares a WhatsApp message
- admin.html: add/edit/delete products in this browser
- about.html and contact.html

PRODUCT PRICES
- Shirts: ₹300 (sizes M, L, XL)
- Purses: ₹200
- Bags: ₹250
- Small kits: ₹150

WHATSAPP
The store WhatsApp destination is configured in script.js as PHONE. Change it to your business number in international format with digits only (India: 91 + 10-digit number). Orders open WhatsApp with customer name, phone, chosen item, and the full delivery address entered by the customer. The customer must press Send in WhatsApp.

GITHUB PAGES
1. Extract the ZIP.
2. Upload the CONTENTS of the sanshine_store folder to the root of your GitHub repository (index.html should be at repository root).
3. Commit changes, then enable GitHub Pages from Settings > Pages and choose the main branch/root.
4. Keep assets/images folder and all its files together; image paths are relative, so they work on GitHub Pages.

ADMIN LIMITATION
The admin page uses browser localStorage. Changes are saved only in the browser where they are made and do not publish edits to all visitors. To make product changes live for everyone on GitHub Pages, update the website files and commit/push them. Image uploads in the admin page are also browser-local.


OWNER LOGIN SECURITY (SETUP REQUIRED)
- admin.html now shows a Google sign-in gate and does not display admin tools until the authorized email is signed in.
- Before publishing, open firebase-config.js and add your Firebase Web App config plus the owner's Gmail address. Do not share passwords or private/service-account keys.
- In Firebase Console: create a project, add a Web App, enable Authentication > Sign-in method > Google, and add your GitHub Pages domain under Authentication > Settings > Authorized domains.
- Replace PASTE_* values in firebase-config.js with the exact Firebase web config and set SANSHINE_OWNER_EMAIL to Sanshinems07@gmail.com (already filled in firebase-config.js).
- Important: this protects the admin interface, but current product edits are browser-localStorage only. A secure shared product database needs backend rules (for example Firebase Firestore with rules allowing writes only to the owner). GitHub Pages alone cannot securely save shared products or uploaded images.
- Until Firebase is configured, the admin panel stays locked.

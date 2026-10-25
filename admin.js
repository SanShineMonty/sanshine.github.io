/* Owner-only admin gate. Configure firebase-config.js before publishing. */
(function(){
 const $ = id => document.getElementById(id);
 const login=$('adminLogin'), app=$('adminApp'), msg=$('authMessage'), signIn=$('ownerSignIn'), signOut=$('ownerSignOut');
 const cfg=window.SANSHINE_FIREBASE_CONFIG;
 const ownerEmail=String(window.SANSHINE_OWNER_EMAIL||'').trim().toLowerCase();
 if(!cfg || !cfg.apiKey || String(cfg.apiKey).includes('PASTE_') || !ownerEmail || ownerEmail.includes('your-')){
   msg.textContent='Setup required: add your Firebase web config and owner Gmail in firebase-config.js. Admin tools remain locked until setup is complete.';
   signIn.disabled=true; return;
 }
 try { firebase.initializeApp(cfg); } catch(e) { msg.textContent='Firebase setup error. Check firebase-config.js.'; signIn.disabled=true; return; }
 const auth=firebase.auth();
 signIn.addEventListener('click', async()=>{
   msg.textContent='Opening Google sign-in…'; signIn.disabled=true;
   try { await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
   catch(e){ msg.textContent='Sign-in did not complete: '+(e.code||e.message||'Please try again.'); signIn.disabled=false; }
 });
 signOut.addEventListener('click',()=>auth.signOut());
 let initialized=false;
 auth.onAuthStateChanged(user=>{
   if(user && user.email && user.email.toLowerCase()===ownerEmail){
     login.hidden=true; app.hidden=false; signOut.hidden=false;
     if(!initialized){ initialized=true; startAdmin(); }
   } else {
     app.hidden=true; login.hidden=false; signOut.hidden=!user; signIn.disabled=false;
     msg.textContent=user ? 'This Google account is not authorized to manage SANSHINE.' : 'Sign in with the authorized Google account to manage products.';
     if(user) auth.signOut().catch(()=>{});
   }
 });
 function startAdmin(){
const $ = id => document.getElementById(id);
const originalProducts = JSON.parse(JSON.stringify(products));
let pendingImage = "";
function escapeHTML(v){return String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function drawAdminProducts(){const host=$("adminProducts");if(!products.length){host.innerHTML='<p>No products yet. Add one above.</p>';return}host.innerHTML=products.map(p=>`<div class="admin-product-row"><img src="${escapeHTML(p.image)}" alt=""><div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.category)} · ₹${Number(p.price)||0} · ${escapeHTML(p.image)}</p></div><div><button type="button" onclick="editProduct(${Number(p.id)})">Edit</button><button type="button" class="delete-product" onclick="deleteProduct(${Number(p.id)})">Delete</button></div></div>`).join("")}
function resetForm(){ $("productForm").reset();$("editId").value="";$("formTitle").textContent="Add a product";$("saveProductBtn").textContent="Save product";$("cancelEdit").style.display="none";$("pPrice").value="200";pendingImage="";$("adminMessage").textContent=""; }
function editProduct(id){const p=products.find(x=>x.id===id);if(!p)return;$("editId").value=p.id;$("pName").value=p.name;$("pCategory").value=p.category;$("pPrice").value=p.price;$("pColor").value=p.color||"";$("pColors").value=(p.colors||[]).join(",");$("pImagePath").value=p.image||"";$("pDescription").value=p.description||"";$("formTitle").textContent="Edit product";$("saveProductBtn").textContent="Update product";$("cancelEdit").style.display="inline-block";pendingImage="";window.scrollTo({top:0,behavior:"smooth"})}
function deleteProduct(id){const p=products.find(x=>x.id===id);if(!p||!confirm(`Delete “${p.name}” from this browser's catalogue?`))return;products=products.filter(x=>x.id!==id);saveProducts();drawAdminProducts();$("adminMessage").textContent="Product deleted from this browser's saved catalogue."}
$("pImage").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;if(file.size>1500000){alert("Please choose an image under 1.5 MB to avoid browser storage limits.");e.target.value="";return}const reader=new FileReader();reader.onload=()=>{pendingImage=reader.result;$("pImagePath").value=""};reader.readAsDataURL(file)});
$("productForm").addEventListener("submit",e=>{e.preventDefault();const id=Number($("editId").value)||Date.now();const category=$("pCategory").value;let image=pendingImage||$("pImagePath").value.trim();const old=products.find(p=>p.id===id);if(!image&&old)image=old.image;if(!image){alert("Please upload a product photo or enter an image path.");return}const colors=$("pColors").value.split(",").map(x=>x.trim()).filter(Boolean);const item={id,name:$("pName").value.trim(),category,price:Number($("pPrice").value),image,color:$("pColor").value.trim(),colors:colors.length?colors:["#c98791"],description:$("pDescription").value.trim()};if(old)products=products.map(p=>p.id===id?item:p);else products.unshift(item);try{saveProducts();drawAdminProducts();resetForm();$("adminMessage").textContent="Product saved in this browser. Check the Shop page to preview it."}catch(err){alert("Browser storage is full. Try a smaller photo or use an image path instead.");console.error(err)}});
$("cancelEdit").addEventListener("click",resetForm);
$("resetProducts").addEventListener("click",()=>{if(!confirm("Remove browser-saved changes and restore the original ZIP catalogue?"))return;localStorage.removeItem("sanshineProducts");products=originalProducts;drawAdminProducts();resetForm();$("adminMessage").textContent="Original catalogue restored in this browser."});
drawAdminProducts();

 }
})();

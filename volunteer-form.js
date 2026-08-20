const form=document.getElementById('hcVolunteerForm');
const steps=[...document.querySelectorAll('.form-step')];
const nextBtn=document.getElementById('nextBtn'),backBtn=document.getElementById('backBtn'),submitBtn=document.getElementById('submitBtn');
const progressFill=document.getElementById('progressFill'),stepCounter=document.getElementById('stepCounter'),stepTitle=document.getElementById('stepTitle');
const progressLabels=[...document.querySelectorAll('.progress-labels span')],errorsBox=document.getElementById('formErrors');
const dynamicContent=document.getElementById('dynamicStepContent'),dynamicHeading=document.getElementById('dynamicHeading'),dynamicSubheading=document.getElementById('dynamicSubheading');
const successScreen=document.getElementById('successScreen'),restartForm=document.getElementById('restartForm');
let currentStep=1; const titles=['About You','Get Involved','Your Fit','Finish'];
const FORM_ENDPOINT='https://script.google.com/macros/s/AKfycbzTq0wpEhLNtcgg_f4Tf8Iw9BxTFA3n7Lts7sgUrlPHqkn8BFn5jzdc09WkoMc12D8Q/exec';
const fieldLabels={
  firstName:'First Name',lastName:'Last Name',email:'Email Address',phone:'Phone Number',age:'Age',school:'School / University / Organization',city:'City / General Location',portfolio:'Instagram / Portfolio / Website',helpPath:'Volunteer Path',
  beyondCreate:'Beyond the Studio Interests',beyondExperience:'Beyond the Studio Experience',beyondExperienceDetail:'Relevant Creative Experience',beyondWhy:'Why Beyond the Studio',
  workshopTasks:'Workshop Interests',childrenExperience:'Experience Working with Children',childrenExperienceDetail:'Child / Youth Experience Detail',creativeAreas:'Creative Areas',workshopWhy:'Why Workshops',
  teamAreas:'H&C Team Interests',teamSkills:'Team Skills / Interests to Learn',teamWhy:'Why H&C Team',multipleAreas:'Multiple Volunteer Areas',multipleEnjoy:'Preferred Contributions',multipleWhy:'Why Hands & Canvas',multipleSkills:'Skills / Experience',
  unsureInterests:'Interests',unsureFormat:'Preferred Volunteer Format',unsureWhy:'Why Hands & Canvas',frequency:'Preferred Frequency',availability:'General Availability',travel:'Able to Travel in Toronto',anythingElse:'Additional Notes',accuracy:'Information Confirmed'
};

const check=(name,value,label)=>`<label class="check-card"><input type="checkbox" name="${name}" value="${value}"><span>${label}</span></label>`;
const pill=(name,value,label)=>`<label><input type="radio" name="${name}" value="${value}"><span>${label}</span></label>`;
const textArea=(name,label,max,required=true,placeholder='A short answer is perfect.')=>`<label class="field full"><span>${label}${required?' <b>*</b>':''}</span><textarea name="${name}" maxlength="${max}" ${required?'required':''} data-count-target="${name}Count" placeholder="${placeholder}"></textarea><small class="char-count"><span id="${name}Count">0</span>/${max}</small></label>`;

const templates={
 beyond:{heading:'Beyond the Studio',sub:'Choose the kinds of creative contributions that sound interesting to you.',html:()=>`
 <div class="dynamic-section">
  <div class="mini-callout"><strong>No previous art experience is required.</strong> Select as many things as you’d be interested in trying or contributing to.</div>
  <div class="question-block"><h3>What would you like to create? <b>*</b></h3><p class="question-help">Choose one or more.</p>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--pink)"></span><strong>Shareable Art</strong><small>finished pieces</small></div><div class="check-grid three">${check('beyondCreate','Handmade cards','Handmade cards')}${check('beyondCreate','Bookmarks','Bookmarks')}${check('beyondCreate','Paintings','Paintings')}${check('beyondCreate','Illustrations','Illustrations')}${check('beyondCreate','Small sculptures','Small sculptures')}${check('beyondCreate','Textiles / crafts','Textiles / crafts')}</div></div>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--teal)"></span><strong>Create-With-Me Art</strong><small>interactive art</small></div><div class="check-grid three">${check('beyondCreate','Colouring pages','Colouring pages')}${check('beyondCreate','Drawing sheets','Drawing sheets')}${check('beyondCreate','Finish-the-art prompts','Finish-the-art prompts')}${check('beyondCreate','Collaborative illustrations','Collaborative illustrations')}${check('beyondCreate','Mini comics','Mini comics')}${check('beyondCreate','Design challenges','Design challenges')}</div></div>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--yellow)"></span><strong>Studio Kits</strong><small>simple creative kits</small></div><div class="check-grid">${check('beyondCreate','Printed activities','Printed activities')}${check('beyondCreate','Pencils / coloured pencils','Pencils / coloured pencils')}${check('beyondCreate','Eraser','Eraser')}${check('beyondCreate','Optional sketchbook','Optional sketchbook')}${check('beyondCreate','Help assemble complete kits','Help assemble complete kits')}${check('beyondCreate','Open to helping wherever needed','I’m open to helping wherever needed')}</div></div>
  </div>
  <div class="question-block"><h3>Have you done anything similar before?</h3><div class="pill-options">${pill('beyondExperience','Yes','Yes')}${pill('beyondExperience','A little','A little')}${pill('beyondExperience','No','No — this would be new for me')}</div><p class="question-help"><strong>No worries if you haven’t.</strong> Experience is not required.</p><div class="conditional-field" data-show-if="beyondExperience" hidden>${textArea('beyondExperienceDetail','Tell us briefly about any relevant creative experience.',350,false,'School projects, hobbies, personal art, clubs — anything counts.')}</div></div>
  ${textArea('beyondWhy','What made you want to help through Beyond the Studio?',300,true,'A couple of sentences is plenty.')}
 </div>`},
 workshops:{heading:'Workshops',sub:'Tell us what you would feel comfortable helping with in person.',html:()=>`
 <div class="dynamic-section"><div class="mini-callout"><strong>You do not need previous art or childcare experience.</strong> Choose the things you would feel comfortable trying.</div>
  <div class="question-block"><h3>How would you like to help at workshops? <b>*</b></h3><div class="check-grid">${check('workshopTasks','Help children with projects','Help children with projects')}${check('workshopTasks','Prepare art materials','Prepare art materials')}${check('workshopTasks','Set up workshops','Set up workshops')}${check('workshopTasks','Clean up / organize materials','Clean up / organize materials')}${check('workshopTasks','Demonstrate simple techniques','Demonstrate simple techniques')}${check('workshopTasks','Help develop activities','Help develop activities')}${check('workshopTasks','Take photos / document programming','Take photos / document programming')}${check('workshopTasks','Lead or co-lead an activity','Lead or co-lead an activity')}${check('workshopTasks','Help organize supplies','Help organize supplies')}${check('workshopTasks','Happy to help wherever needed','I’m happy to help wherever needed')}</div></div>
  <div class="question-block"><h3>Have you worked with children before?</h3><div class="pill-options">${pill('childrenExperience','Yes','Yes')}${pill('childrenExperience','A little','A little')}${pill('childrenExperience','No','No')}</div><div class="conditional-field" data-show-if="childrenExperience" hidden>${textArea('childrenExperienceDetail','Tell us briefly about it.',300,false,'Just a quick example is enough.')}</div></div>
  <div class="question-block"><h3>Are there any creative areas you’re interested in?</h3><div class="check-grid three">${check('creativeAreas','Drawing','Drawing')}${check('creativeAreas','Painting','Painting')}${check('creativeAreas','Clay / sculpture','Clay / sculpture')}${check('creativeAreas','Crafts','Crafts')}${check('creativeAreas','Mixed media','Mixed media')}${check('creativeAreas','Textiles','Textiles')}${check('creativeAreas','Digital art','Digital art')}${check('creativeAreas','Photography','Photography')}${check('creativeAreas','No particular medium','No particular medium')}</div></div>
  ${textArea('workshopWhy','What interests you about volunteering at our workshops?',300,true,'A couple of sentences is plenty.')}
 </div>`},
 team:{heading:'Join the H&C Team',sub:'Choose the areas where you might like to contribute behind the scenes.',html:()=>`
 <div class="dynamic-section"><div class="mini-callout"><strong>No previous experience is required.</strong> We’re interested in what you enjoy and what you would be excited to learn.</div>
  <div class="question-block"><h3>What areas interest you? <b>*</b></h3>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--teal)"></span><strong>Programs & Creativity</strong></div><div class="check-grid">${check('teamAreas','Workshop planning','Workshop planning')}${check('teamAreas','Developing art activities','Developing art activities')}${check('teamAreas','Beyond the Studio','Beyond the Studio')}${check('teamAreas','Creative resources / colouring book','Creative resources / colouring book')}</div></div>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--pink)"></span><strong>Community</strong></div><div class="check-grid">${check('teamAreas','Partnerships','Partnerships')}${check('teamAreas','School / community outreach','School / community outreach')}${check('teamAreas','Artist outreach','Artist outreach')}${check('teamAreas','Volunteer coordination','Volunteer coordination')}</div></div>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--purple)"></span><strong>Media & Design</strong></div><div class="check-grid">${check('teamAreas','Social media','Social media')}${check('teamAreas','Content creation','Content creation')}${check('teamAreas','Photography','Photography')}${check('teamAreas','Graphic design','Graphic design')}${check('teamAreas','Writing / copywriting','Writing / copywriting')}${check('teamAreas','Website / technology','Website / technology')}</div></div>
   <div class="subcategory"><div class="subcategory-title"><span style="background:var(--yellow)"></span><strong>Organization</strong></div><div class="check-grid">${check('teamAreas','Events / logistics','Events / logistics')}${check('teamAreas','Sponsorships / fundraising','Sponsorships / fundraising')}${check('teamAreas','Finance / administration','Finance / administration')}${check('teamAreas','Happy to help wherever needed','I’m happy to help wherever needed')}</div></div>
  </div>${textArea('teamSkills','Anything you’re especially good at or interested in learning?',350,false,'A skill you have or something you want to learn.')}${textArea('teamWhy','Why would you like to be part of the H&C team?',300,true,'A short answer is perfect.')}
 </div>`},
 multiple:{heading:'More Than One',sub:'Tell us which parts of Hands & Canvas you would like to explore.',html:()=>`
 <div class="dynamic-section"><div class="mini-callout"><strong>You can be interested in more than one area.</strong> Keep this simple — we’ll use your answers to understand where you may fit.</div><div class="question-block"><h3>Which areas interest you? <b>*</b></h3><p class="question-help">Choose at least two.</p><div class="check-grid">${check('multipleAreas','Beyond the Studio','Beyond the Studio')}${check('multipleAreas','Workshops','Workshops')}${check('multipleAreas','H&C Team','H&C Team')}</div></div>${textArea('multipleEnjoy','What kinds of things would you most enjoy helping with?',400,true,'Projects, roles, or skills you’d like to use.')}${textArea('multipleWhy','Why would you like to volunteer with Hands & Canvas?',500,true,'No formal response needed — a few sentences is plenty.')}${textArea('multipleSkills','Any skills or experience you’d like us to know about?',300,false,'Optional — no previous experience is required.')}</div>`},
 unsure:{heading:'Not sure yet? No problem.',sub:'Tell us what you enjoy and we’ll help identify a good fit.',html:()=>`
 <div class="dynamic-section"><div class="mini-callout"><strong>That’s completely fine.</strong> Tell us what sounds interesting and we can help figure out where you might fit.</div><div class="question-block"><h3>What sounds interesting to you? <b>*</b></h3><div class="check-grid">${check('unsureInterests','Making art','Making art')}${check('unsureInterests','Working with children','Working with children')}${check('unsureInterests','Planning creative projects','Planning creative projects')}${check('unsureInterests','Social media','Social media')}${check('unsureInterests','Graphic design','Graphic design')}${check('unsureInterests','Photography','Photography')}${check('unsureInterests','Writing','Writing')}${check('unsureInterests','Organizing events','Organizing events')}${check('unsureInterests','Reaching out to organizations','Reaching out to organizations')}${check('unsureInterests','Fundraising / sponsorships','Fundraising / sponsorships')}${check('unsureInterests','Working behind the scenes','Working behind the scenes')}${check('unsureInterests','Helping wherever needed','Helping wherever needed')}</div></div><div class="question-block"><h3>Would you rather volunteer:</h3><div class="pill-options">${pill('unsureFormat','In person','In person')}${pill('unsureFormat','Remotely','Remotely')}${pill('unsureFormat','Either','Either')}${pill('unsureFormat','Not sure','Not sure')}</div></div>${textArea('unsureWhy','What made you interested in Hands & Canvas?',300,true,'A short answer is perfect.')}</div>`}
};

function path(){return form.querySelector('input[name="helpPath"]:checked')?.value||''}
function bindCounts(scope=document){scope.querySelectorAll('textarea[maxlength]').forEach(t=>{const c=document.getElementById(t.dataset.countTarget);const u=()=>{if(c)c.textContent=t.value.length};t.addEventListener('input',u);u()})}
function bindConditionals(scope){scope.querySelectorAll('[data-show-if]').forEach(box=>{const n=box.dataset.showIf;const update=()=>{const v=scope.querySelector(`input[name="${n}"]:checked`)?.value;box.hidden=!(v==='Yes'||v==='A little')};scope.querySelectorAll(`input[name="${n}"]`).forEach(i=>i.addEventListener('change',update));update()})}
function renderDynamic(){const c=templates[path()];if(!c){dynamicContent.innerHTML='';return}dynamicHeading.textContent=c.heading;dynamicSubheading.textContent=c.sub;dynamicContent.innerHTML=c.html();bindCounts(dynamicContent);bindConditionals(dynamicContent)}
function updateUI(){steps.forEach(s=>s.classList.toggle('active',+s.dataset.step===currentStep));progressFill.style.width=(currentStep*25)+'%';stepCounter.textContent=`Step ${currentStep} of 4`;stepTitle.textContent=titles[currentStep-1];progressLabels.forEach((l,i)=>l.classList.toggle('active',i<currentStep));backBtn.hidden=currentStep===1;nextBtn.hidden=currentStep===4;submitBtn.hidden=currentStep!==4;errorsBox.classList.remove('show');if(currentStep===3)renderDynamic();document.querySelector('.workshop-only-final').hidden=!(path()==='workshops'||path()==='multiple')}
function fail(msg){errorsBox.textContent=msg;errorsBox.classList.add('show');return false}
function validate(n){const s=steps.find(x=>+x.dataset.step===n);s.querySelectorAll('.field.invalid').forEach(x=>x.classList.remove('invalid'));for(const el of s.querySelectorAll('[required]')){if(el.closest('[hidden]'))continue;if(el.type==='radio'||el.type==='checkbox'){if(![...s.querySelectorAll(`[name="${el.name}"]`)].some(i=>i.checked))return fail('Please answer the required question before continuing.')}else if(!el.value.trim()||!el.checkValidity()){el.closest('.field')?.classList.add('invalid');return fail('Please complete the required fields before continuing.')}}if(n===2&&!path())return fail('Please choose how you would like to help.');if(n===3){const p=path(),req={beyond:'beyondCreate',workshops:'workshopTasks',team:'teamAreas',unsure:'unsureInterests'}[p];if(req&&!s.querySelector(`input[name="${req}"]:checked`))return fail('Please select at least one option.');if(p==='multiple'&&s.querySelectorAll('input[name="multipleAreas"]:checked').length<2)return fail('Please choose at least two areas that interest you.')}return true}
nextBtn.addEventListener('click',()=>{if(validate(currentStep)){currentStep=Math.min(4,currentStep+1);updateUI();document.querySelector('.form-progress-wrap').scrollIntoView({behavior:'smooth',block:'start'})}});backBtn.addEventListener('click',()=>{currentStep=Math.max(1,currentStep-1);updateUI()});form.addEventListener('change',e=>{if(e.target.name==='helpPath')renderDynamic()});
form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!validate(4))return;
  errorsBox.classList.remove('show');
  const originalText=submitBtn.textContent;
  submitBtn.disabled=true;
  submitBtn.textContent='Sending…';
  const payload=new URLSearchParams();
  payload.append('Form Type','Volunteer Application');
  for(const [key,value] of new FormData(form).entries()){
    payload.append(fieldLabels[key]||key,value);
  }
  try{
    await fetch(FORM_ENDPOINT,{method:'POST',body:payload,mode:'no-cors',cache:'no-store'});
    form.hidden=true;
    document.querySelector('.form-progress-wrap').hidden=true;
    successScreen.hidden=false;
    successScreen.scrollIntoView({behavior:'smooth',block:'center'});
  }catch(error){
    console.error('Hands & Canvas form submission error:',error);
    fail('We couldn’t send your form right now. Please check your connection and try again, or email handsandcanvascontact@gmail.com.');
  }finally{
    submitBtn.disabled=false;
    submitBtn.textContent=originalText;
  }
});
restartForm.addEventListener('click',()=>{form.reset();dynamicContent.innerHTML='';currentStep=1;successScreen.hidden=true;form.hidden=false;document.querySelector('.form-progress-wrap').hidden=false;updateUI()});
bindCounts(document);updateUI();

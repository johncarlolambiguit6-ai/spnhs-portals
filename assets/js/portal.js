'use strict';
const $=s=>document.querySelector(s),Q=[];
const R={admin:'Administrator',teacher:'Teacher / Adviser',parent:'Parent / Guardian',student:'Student'};
const U={admin:['Ma. Lourdes Reyes',1],teacher:['Ramon Villanueva',2],parent:['Elena Ramirez',3],student:['Jose Ramirez',4]};
const BC={Active:'success',Regular:'success',Paid:'success',Present:'success',Enrolled:'success','At risk':'danger',Unpaid:'danger',Absent:'danger',Inactive:'secondary',Closed:'secondary',Partial:'warning',Late:'warning',Excused:'info'};

/* ---------- sample data ---------- */
const ST=[['Jose Ramirez','10 – Rizal',71,80],['Maria Santos','10 – Rizal',88,87],['Juan Dela Cruz','10 – Rizal',96,91],['Angela Bautista','10 – Rizal',94,93],['Mark Villanueva','10 – Rizal',68,74],['Trisha Aquino','10 – Rizal',73,78],['Carlo Mendoza','10 – Rizal',92,85],['Bea Navarro','10 – Rizal',97,90],['Renz Flores','10 – Rizal',90,82],['Hannah Lim','10 – Rizal',95,94],['Kristine Mendoza','9 – Bonifacio',97,89],['Paolo Garcia','8 – Mabini',82,80]].map((s,i)=>[s[0],'13624578'+(1000+i*17),s[1],s[2],s[3]]);
const J=ST[0],K=ST.filter(s=>s[2]=='10 – Rizal');
const SC=[['10 – Rizal','Grade 10','Ramon Villanueva',40,'Active'],['9 – Bonifacio','Grade 9','Grace Fernandez',41,'Active'],['8 – Mabini','Grade 8','Liza Manalo',39,'Active'],['7 – Luna','Grade 7','Dennis Cruz',38,'Active']];
const TC=[['Ramon Villanueva','Science'],['Grace Fernandez','Mathematics'],['Liza Manalo','English'],['Dennis Cruz','Filipino']].map((t,i)=>[t[0],t[1],SC[i][0],SC[i][3],'Active']);
const AR=[['Jose Ramirez','10 – Rizal','3 unexcused absences in a row','Sep 16–18'],['Mark Villanueva','10 – Rizal','4 unexcused absences in a row','Sep 15–18'],['Trisha Aquino','10 – Rizal','3 unexcused absences in a row','Sep 16–18']];
const AN=[['Enrollment for SY 2026–2027 is still open','Registrar','Sep 18','All'],['First quarter exams start Oct 5','Principal','Sep 17','All'],['Science project due Sep 28','Mr. Villanueva','Sep 15','10 – Rizal'],['PTA general assembly on Oct 2','Administrator','Sep 14','All']];
const NT=[['Jose was marked absent on Sep 18. This is his 3rd absence in a row.','Attendance','Friday'],['New grade posted: Science Q3, 77','Grades','Thursday'],['Parent-teacher conference on Oct 2','Events','Sep 15'],['Tuition installment due Sep 30','Payments','Sep 14']];
const NS=[['New grade posted: Science Q3, 77','Grades','Thursday'],['Science project due Sep 28','Class','Sep 15']];
const EV=[['Sep 25','Science Fair','Gym'],['Oct 2','Parent-Teacher Conference','Homerooms, 1:00 PM'],['Oct 5','First quarter exams begin','All grade levels'],['Oct 14','Intramurals opening','School oval'],['Oct 30','Report card distribution','Homerooms']];
const SB=[['Filipino',78,80,79],['English',75,77,76],['Mathematics',72,74,75],['Science',76,78,77],['Araling Panlipunan',80,79,81],['MAPEH',84,85,84],['Values Education',88,87,89]];
const ATT=[['Sep 18','Absent','Unexcused'],['Sep 17','Absent','Unexcused'],['Sep 16','Absent','Unexcused'],['Sep 15','Present',''],['Sep 14','Present',''],['Sep 11','Late','Arrived 8:20'],['Sep 10','Present',''],['Sep 9','Present','']];
const SCH=[['7:30 AM','Filipino','Dennis Cruz','Room 12'],['8:30 AM','English','Liza Manalo','Room 12'],['9:30 AM','Mathematics','Grace Fernandez','Room 12'],['10:45 AM','Science','Ramon Villanueva','Lab 2'],['1:00 PM','MAPEH','Grace Fernandez','Gym']];
const CT={teacher:[['Elena Ramirez','Parent of Jose Ramirez',1],['Rosa Bautista','Parent of Angela Bautista',1]],parent:[['Ramon Villanueva','Homeroom adviser',1]]};
const M=[[1,'Good afternoon po. Jose has been absent since Wednesday. Is everything okay?'],[0,'Good afternoon, Sir. He has a fever and will be back on Monday.'],[1,'Thank you. Please bring a medical certificate when he returns.']];
const PAY=ST.slice(0,8).map((s,i)=>{const p=[9000,18500,18500,12000,0,18500,9000,18500][i];return [s[0],s[1],'₱18,500','₱'+p.toLocaleString(),'₱'+(18500-p).toLocaleString(),p==18500?'Paid':p?'Partial':'Unpaid']});
const RP=[['Attendance summary','Daily and monthly attendance by section.','calendar-check'],['Grade summary','Quarterly grades and general averages.','chart-line'],['Risk indicators','Students flagged by the absence rule.','alert-outline'],['Payments','Tuition collected and outstanding balances.','cash'],['Enrollment','Enrollment by grade level and section.','account-plus-outline'],['System activity','Sign-ins and account changes.','history']];
const B={teacher:{'at-risk':AR.length,messages:2},parent:{'at-risk':1,messages:1,notifications:NT.length},student:{notifications:NS.length}};

/* ---------- navigation per role ---------- */
const N={
admin:[['Administrator',[['','Dashboard','home'],['users','User Management','users'],['students','Students','user'],['teachers','Teachers','briefcase'],['student-accounts','Student Accounts','credit-card']]],['Enrollment & School Setup',[['enrollment','Student Enrollment','user-plus'],['grade-levels','Grade Levels','layers'],['sections','Sections','grid'],['school-years','School Years','calendar']]],['Finance & Monitoring',[['payments','Student Payments','dollar-sign'],['monitoring','Admin Monitoring','activity'],['announcements','Announcements','volume-2'],['reports','Reports','file-text'],['audit','Audit Logs','shield'],['settings','System Settings','settings'],['account','Account Management','lock']]]],
teacher:[['Homeroom Adviser',[['','Dashboard','home'],['students','My Students','users'],['classes','Classes','book-open'],['attendance','Attendance','check-square'],['grades','Grades','award']]],['Class Management',[['at-risk','At-Risk Students','alert-triangle'],['announcements','Announcements','volume-2'],['messages','Messages','message-square'],['calendar','Activities & Calendar','calendar'],['reports','Class Reports','bar-chart-2'],['account','Account Settings','lock']]]],
parent:[['Parent / Guardian',[['','Dashboard','home'],['child','My Child','smile'],['attendance','Attendance','check-square'],['grades','Grades','award']]],['Stay Connected',[['at-risk','At-Risk Alerts','alert-triangle'],['announcements','Announcements','volume-2'],['messages','Messages','message-square'],['calendar','Activities & Calendar','calendar'],['notifications','Notifications','bell']]]],
student:[['My School',[['','Dashboard','home'],['grades','My Grades','award'],['attendance','My Attendance','check-square'],['classes','My Classes','book-open'],['announcements','Announcements','volume-2']]],['My Schedule',[['calendar','Calendar','calendar'],['notifications','Notifications','bell'],['profile','My Profile','user'],['security','Account Security','lock']]]]};

/* ---------- Minia components ---------- */
const avg=a=>Math.round(a.reduce((x,y)=>x+y,0)/a.length);
const tip=m=>{const d=document.createElement('div');d.className='toast-container position-fixed top-0 end-0 p-3';d.innerHTML=`<div class="toast show text-bg-primary border-0"><div class="toast-body">${m||'Demo only. Changes are not saved.'}</div></div>`;document.body.append(d);setTimeout(()=>d.remove(),2200)};
const flt=i=>{const q=i.value.toLowerCase();i.closest('.card').querySelectorAll('tbody tr').forEach(r=>r.hidden=!r.textContent.toLowerCase().includes(q))};
const bd=v=>BC[v]?`<span class="badge bg-${BC[v]}-subtle text-${BC[v]}">${v}</span>`:v;
const fg=v=>{const c=v>=75?'success':'danger';return `<span class="badge bg-${c}-subtle text-${c}">${v}</span>`};
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const openModal=(title,body,footer='')=>{
  const el=$('#spnhsModal'); if(!el)return;
  $('#spnhsModalTitle').textContent=title; $('#spnhsModalBody').innerHTML=body;
  $('#spnhsModalFooter').innerHTML=footer||'<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>';
  bootstrap.Modal.getOrCreateInstance(el).show();
};
const modalAction=(t)=>{
  const key=t.toLowerCase();
  if(key.includes('new announcement')){
    openModal('Create Announcement',`<form id="announcementForm" class="spnhs-modal-form">
      <div class="mb-3"><label class="form-label">Announcement title</label><input class="form-control" id="mTitle" required></div>
      <div class="mb-3"><label class="form-label">Audience</label><select class="form-select" id="mAudience"><option>All</option><option>Grade 10 – Rizal</option><option>Teachers</option><option>Parents</option><option>Students</option></select></div>
      <div class="mb-0"><label class="form-label">Message</label><textarea class="form-control" id="mMessage" rows="4" required></textarea></div>
    </form>`,
    '<button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary" onclick="saveAnnouncement()">Publish</button>');
  } else if(key.includes('save attendance')){
    openModal('Save Attendance','<p class="mb-0">Review the attendance entries for this class before saving. This prototype stores the action only in this browser.</p>',
      '<button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary" onclick="saveDemoAction(\'Attendance saved successfully.\')">Save attendance</button>');
  } else if(key.includes('save grades')){
    openModal('Save Grades','<p class="mb-0">Review the quarter 3 grades before saving. This prototype records the action locally.</p>',
      '<button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary" onclick="saveDemoAction(\'Grades saved successfully.\')">Save grades</button>');
  } else if(key.includes('message parent')){
    openModal('Message Parent',`<form id="messageForm"><div class="mb-3"><label class="form-label">Recipient</label><input class="form-control" value="Parent / Guardian" readonly></div><div><label class="form-label">Message</label><textarea class="form-control" rows="4" placeholder="Type your message..."></textarea></div></form>`,
      '<button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary" onclick="saveDemoAction(\'Message sent successfully.\')">Send message</button>');
  } else {
    openModal(t,'<p class="mb-0">This action is available in the SPNHS portal prototype. You can review or submit the information here.</p>',
      '<button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary" onclick="saveDemoAction(\'Action completed successfully.\')">Continue</button>');
  }
};
const saveDemoAction=m=>{bootstrap.Modal.getOrCreateInstance($('#spnhsModal')).hide();tip(m)};
const saveAnnouncement=()=>{
  const title=$('#mTitle')?.value.trim(),msg=$('#mMessage')?.value.trim();
  if(!title||!msg){tip('Please complete the announcement fields.');return}
  saveDemoAction('Announcement published successfully.');
};
const btn=(t,c='primary')=>`<button type="button" class="btn btn-${c} btn-sm" onclick="modalAction(${JSON.stringify(t)})">${t}</button>`;
const card=(h,b)=>`<div class="card"><div class="card-header d-flex align-items-center justify-content-between gap-2"><h5 class="card-title mb-0">${h[0]}</h5>${h[1]||''}</div><div class="card-body">${b}</div></div>`;
const tbl=(t,h,r,b)=>card([t,`<div class="d-flex gap-2"><input class="form-control form-control-sm" placeholder="Search" oninput="flt(this)">${b?btn(b):''}</div>`],`<div class="table-responsive"><table class="table align-middle table-nowrap mb-0"><thead class="table-light"><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(c=>`<td>${bd(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
const st=a=>`<div class="row">${a.map(([l,v,c,i,s])=>`<div class="col-xl-3 col-sm-6"><div class="card card-h-100"><div class="card-body d-flex align-items-center"><div class="flex-grow-1"><span class="text-muted d-block mb-2">${l}</span><h4 class="mb-1">${v}</h4><span class="text-muted font-size-13">${s}</span></div><div class="avatar-sm"><span class="avatar-title rounded bg-${c}-subtle text-${c} fs-3"><i class="mdi mdi-${i}"></i></span></div></div></div></div>`).join('')}</div>`;
const cx=(o,h=280)=>{const id='c'+Q.length;Q.push(()=>new ApexCharts($('#'+id),{colors:['#5156be','#2ab57d','#ffbf53','#fd625e'],dataLabels:{enabled:false},...o,chart:{height:h,toolbar:{show:false},fontFamily:'inherit',...o.chart}}).render());return `<div id="${id}"></div>`};
const wk=()=>cx({chart:{type:'area'},series:[{name:'Present %',data:[94,93,95,92,91]}],xaxis:{categories:['Mon','Tue','Wed','Thu','Fri']},yaxis:{min:80,max:100},stroke:{curve:'smooth',width:2}});
const gr=()=>cx({chart:{type:'bar'},series:[{name:'Average',data:SB.map(g=>avg(g.slice(1)))}],xaxis:{categories:SB.map(g=>g[0]),min:60,max:100},plotOptions:{bar:{horizontal:true,borderRadius:4}}},300);
const dn=()=>cx({chart:{type:'donut'},series:['Present','Absent','Late'].map(k=>ATT.filter(a=>a[1]==k).length),labels:['Present','Absent','Late'],colors:['#2ab57d','#fd625e','#ffbf53']});
const ann=post=>card(['Announcements',post?btn('New announcement'):''],AN.map(a=>`<div class="d-flex justify-content-between border-bottom py-3"><div><h6 class="mb-1">${a[0]}</h6><span class="text-muted font-size-13">${a[1]}, ${a[2]}</span></div><span class="badge bg-primary-subtle text-primary align-self-start ms-2">${a[3]}</span></div>`).join(''));
const nl=l=>card(['Notifications'],l.map(n=>`<div class="d-flex justify-content-between border-bottom py-3"><div><span class="badge bg-info-subtle text-info me-2">${n[1]}</span>${n[0]}</div><span class="text-muted font-size-13 text-nowrap ms-3">${n[2]}</span></div>`).join(''));
const cal=()=>card(['Activities & calendar'],EV.map(e=>`<div class="d-flex align-items-center py-3 border-bottom"><div class="avatar-sm me-3"><span class="avatar-title rounded bg-primary-subtle text-primary text-center lh-sm font-size-12">${e[0].replace(' ','<br>')}</span></div><div><h6 class="mb-1">${e[1]}</h6><span class="text-muted font-size-13">${e[2]}</span></div></div>`).join(''));
const prof=()=>card(['Student profile'],`<div class="d-flex align-items-center mb-4"><img src="assets/images/users/avatar-4.jpg" alt="" class="avatar-lg rounded-circle me-3"><div><h5 class="mb-1">${J[0]}</h5><span class="text-muted">LRN ${J[1]}</span></div></div><dl class="row mb-0">${[['Grade and section',J[2]],['Homeroom adviser','Ramon Villanueva'],['Guardian','Elena Ramirez'],['School year','2026–2027'],['Account','Active']].map(([k,v])=>`<dt class="col-sm-4 text-muted fw-normal">${k}</dt><dd class="col-sm-8">${bd(v)}</dd>`).join('')}</dl>`);
const gv=()=>tbl('Quarterly grades',['Subject','Q1','Q2','Q3','Q4','Average'],SB.map(g=>[g[0],g[1],g[2],g[3],'–',fg(avg(g.slice(1)))]));
const att=()=>`<div class="row"><div class="col-xl-4">${card(['Attendance summary'],dn())}</div><div class="col-xl-8">${tbl('Recent school days',['Date','Status','Remarks'],ATT)}</div></div>`;
const chat=r=>`<div class="row"><div class="col-md-4">${card(['Conversations'],CT[r].map(c=>`<div class="d-flex justify-content-between py-2"><div>${c[0]}<br><span class="text-muted font-size-13">${c[1]}</span></div>${c[2]?`<span class="badge bg-danger align-self-start">${c[2]}</span>`:''}</div>`).join(''))}</div><div class="col-md-8">${card([CT[r][0][0]],M.map(([t,x])=>{const me=(t==1)==(r=='teacher');return `<div class="d-flex ${me?'justify-content-end':''} mb-2"><div class="rounded p-2 px-3 ${me?'bg-primary text-white':'bg-light'}" style="max-width:75%">${x}</div></div>`}).join('')+`<div class="input-group mt-3"><input class="form-control" placeholder="Write a message"><button class="btn btn-primary" onclick="tip()">Send</button></div>`)}</div></div>`;
const fl=([l,v,t])=>`<div class="col-md-6 mb-3"><label class="form-label">${l}</label>${Array.isArray(v)?`<select class="form-select">${v.map(o=>`<option>${o}</option>`).join('')}</select>`:`<input type="${t||'text'}" class="form-control" value="${v}">`}</div>`;
const frm=(t,f,b)=>card([t],`<div class="row">${f.map(fl).join('')}</div><button class="btn btn-primary" onclick="tip()">${b||'Save changes'}</button>`);
const sw=(t,on=1)=>`<div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" ${on?'checked':''}><label class="form-check-label">${t}</label></div>`;
const sec=()=>frm('Change password',[['Current password','','password'],['New password','','password'],['Confirm new password','','password']],'Update password');
const rep=l=>`<div class="row">${l.map(([t,d,i])=>`<div class="col-xl-4 col-md-6"><div class="card"><div class="card-body"><div class="d-flex align-items-center mb-3"><div class="avatar-sm me-3"><span class="avatar-title rounded bg-primary-subtle text-primary fs-4"><i class="mdi mdi-${i}"></i></span></div><h5 class="mb-0">${t}</h5></div><p class="text-muted">${d}</p>${btn('Export','outline-primary')}</div></div></div>`).join('')}</div>`;
const sel=v=>`<select class="form-select form-select-sm w-auto">${['Present','Absent','Late','Excused'].map(o=>`<option${o==v?' selected':''}>${o}</option>`).join('')}</select>`;
const gi=v=>`<input class="form-control form-control-sm" style="width:80px" value="${v}">`;
const SR=s=>[s[0],s[1],s[2],s[3]+'%',s[4],s[3]<75?'At risk':'Regular'];
const SH=['Student','LRN','Section','Attendance','Average','Status'];
const ac=btn('Reset password','light')+' '+btn('Deactivate','light');
const USR=[...TC.map(t=>[t[0],'Teacher',t[0].split(' ')[0].toLowerCase()+'.t','Active']),...ST.slice(0,5).map(s=>[s[0],'Student',s[1],'Active'])].map(u=>[...u,ac]);

/* ---------- pages ---------- */
const PG={
admin:{
'':()=>st([['Students','1,248','primary','school','+36 this month'],['Teachers','62','success','account-tie','4 without an advisory'],['Parents and guardians','1,103','info','account-group','89% linked to a student'],['Active users','940','warning','account-check','Signed in this week']])+`<div class="row"><div class="col-xl-8">${card(['Attendance this week'],wk())}</div><div class="col-xl-4">${ann()}</div></div>`+tbl('Recent registrations',['Student','LRN','Section','Status'],ST.slice(0,5).map(s=>[s[0],s[1],s[2],'Enrolled'])),
users:()=>tbl('Teacher and student accounts',['Name','Role','Username','Status','Actions'],USR,'Create account'),
students:()=>tbl('All students',SH,ST.map(SR),'Add student'),
teachers:()=>tbl('Teachers',['Teacher','Subject','Advisory','Students','Status'],TC,'Add teacher'),
'student-accounts':()=>tbl('Student accounts',['Student','LRN','Enrollment','Tuition balance','Account'],ST.slice(0,8).map((s,i)=>[s[0],s[1],'SY 2026–2027, '+s[2],PAY[i][4],'Active'])),
enrollment:()=>frm('Enroll a student',[['School year',['2026–2027','2025–2026']],['Grade level',['Grade 10','Grade 9','Grade 8','Grade 7']],['Section',SC.map(s=>s[0])],['Student',['Hannah Lim','Renz Flores','Bea Navarro']],['Homeroom teacher',TC.map(t=>t[0])]],'Enroll student')+tbl('Recent enrollments',['Student','School year','Section','Homeroom teacher','Status'],ST.slice(0,4).map(s=>[s[0],'2026–2027',s[2],'Ramon Villanueva','Enrolled'])),
'grade-levels':()=>tbl('Grade levels',['Grade level','Sections','Enrolled','Status'],[['Grade 7',5,231,'Active'],['Grade 8',5,229,'Active'],['Grade 9',4,214,'Active'],['Grade 10',5,238,'Active'],['Grade 11',4,180,'Active'],['Grade 12',3,156,'Active']],'Add grade level'),
sections:()=>tbl('Sections',['Section','Grade level','Homeroom teacher','Students','Status'],SC,'Add section'),
'school-years':()=>tbl('School years',['School year','Starts','Ends','Status'],[['2026–2027','Jun 8, 2026','Mar 26, 2027','Active'],['2025–2026','Jun 9, 2025','Mar 27, 2026','Closed'],['2024–2025','Jun 10, 2024','Mar 28, 2025','Closed']],'Add school year'),
payments:()=>tbl('Tuition ledger',['Student','LRN','Total fee','Paid','Balance','Status'],PAY,'Record payment'),
monitoring:()=>st([['Present today','1,142','success','account-check','91.5% of students'],['Absent','61','danger','account-remove','4.9%'],['Late','27','warning','clock-outline','2.2%'],['Excused','18','info','file-document-outline','1.4%']])+card(['Needs your attention'],[[AR.length+' students flagged as at risk','Review the list with their advisers'],['12 accounts still on a temporary password','Ask users to change it at first sign-in'],['9 students with overdue tuition','See Student Payments']].map(a=>`<div class="border-bottom py-3"><h6 class="mb-1">${a[0]}</h6><span class="text-muted font-size-13">${a[1]}</span></div>`).join('')),
announcements:()=>ann(1),
reports:()=>st([['Attendance','93.4%','success','calendar-check','This quarter'],['General average','84','primary','chart-line','All grade levels'],['At-risk students',AR.length,'danger','alert-outline','Flagged now'],['Outstanding tuition','₱412,500','warning','cash','9 accounts']])+rep(RP),
audit:()=>tbl('Audit log (entries cannot be edited or deleted)',['When','User','Action','Target'],[['Sep 21, 8:12 AM','Ma. Lourdes Reyes','Reset password','Teacher: Liza Manalo'],['Sep 21, 7:58 AM','Ma. Lourdes Reyes','Enrolled student','Hannah Lim, 10 – Rizal'],['Sep 18, 4:40 PM','System','Sent at-risk alert','Jose Ramirez'],['Sep 18, 9:05 AM','Ma. Lourdes Reyes','Changed setting','At-risk threshold: 3'],['Sep 17, 2:15 PM','Ramon Villanueva','Changed password','Own account']],'Export'),
settings:()=>frm('School profile',[['School name','SPNHS'],['School ID',''],['Address',''],['Contact email','','email']])+card(['Automation and notifications'],`<div class="mb-3" style="max-width:340px"><label class="form-label">Flag a student after this many consecutive unexcused absences</label><input type="number" class="form-control" value="3"></div>${sw('Notify parents when a student is flagged')}${sw('Notify parents when grades are posted')}${sw('Send a weekly announcement digest',0)}<button class="btn btn-primary" onclick="tip()">Save changes</button>`)+card(['Data and security'],`${sw('Require a new password at first sign-in')}${sw('Record sensitive actions in the audit log')}`),
account:sec},
teacher:{
'':()=>st([['Students',K.length,'primary','school','10 – Rizal'],['Attendance',avg(K.map(s=>s[3]))+'%','success','calendar-check','Average this quarter'],['Class average',avg(K.map(s=>s[4])),'info','chart-line','Quarter 3'],['At risk',AR.length,'danger','alert-outline','Need follow-up']])+`<div class="row"><div class="col-xl-7">${card(['Class attendance this week'],wk())}</div><div class="col-xl-5">${nl(NT.slice(0,3).map((n,i)=>[['Elena Ramirez replied about Jose','Science grades are ready to enter','Parent-teacher conference on Oct 2'][i],['Messages','Grades','Events'][i],n[2]]))}</div></div>`+tbl('At-risk students',['Student','Section','Reason','Dates'],AR),
students:()=>tbl('My students, 10 – Rizal',SH,K.map(SR)),
classes:()=>tbl('My classes',['Class','Subject','Schedule','Room','Students'],[['10 – Rizal','Science','Mon to Fri, 10:45 AM','Lab 2',40],['9 – Bonifacio','Science','Mon and Wed, 1:00 PM','Lab 2',41],['8 – Mabini','Science','Tue and Thu, 1:00 PM','Lab 1',39]]),
attendance:()=>tbl('Attendance for Mon, Sep 21',['Student','LRN','Status'],K.map(s=>[s[0],s[1],sel(s[3]<75?'Absent':'Present')]),'Save attendance'),
grades:()=>tbl('Science, quarter 3',['Student','Q1','Q2','Q3','Q4','Average'],K.map(s=>[s[0],s[4]-1,s[4]+1,gi(s[4]),gi(''),s[4]]),'Save grades'),
'at-risk':()=>tbl('Students flagged after 3 consecutive unexcused absences',['Student','Section','Reason','Dates','Action'],AR.map(a=>[...a,btn('Message parent','light')])),
announcements:()=>ann(1),messages:()=>chat('teacher'),calendar:cal,reports:()=>rep(RP.slice(0,3)),account:sec},
parent:{
'':()=>st([['Attendance',J[3]+'%','danger','calendar-check','Below the 75% alert level'],['Average grade',J[4],'primary','chart-line','Quarter 3'],['Unread updates',NT.length,'warning','bell-outline','Since Friday'],['Next event','Sep 25','info','calendar-star','Science Fair']])+`<div class="row"><div class="col-xl-7">${card(['Grades by subject'],gr())}</div><div class="col-xl-5">${nl(NT)}</div></div>`,
child:()=>`<div class="row"><div class="col-xl-6">${prof()}</div><div class="col-xl-6">${card(['Homeroom adviser'],'<h6>Ramon Villanueva</h6><p class="text-muted mb-3">Science teacher and adviser of 10 – Rizal.</p><a href="#/parent/messages" class="btn btn-primary btn-sm">Send a message</a>')}</div></div>`,
attendance:att,grades:()=>`<div class="row"><div class="col-xl-7">${gv()}</div><div class="col-xl-5">${card(['Average by subject'],gr())}</div></div>`,
'at-risk':()=>card(['At-risk alerts'],`<div class="alert alert-danger mb-3"><h6 class="alert-heading">Jose Ramirez has 3 unexcused absences in a row</h6>Sep 16–18. Please contact his adviser so the absences can be excused or planned for.</div><a href="#/parent/messages" class="btn btn-primary btn-sm">Message adviser</a>`),
announcements:()=>ann(),messages:()=>chat('parent'),calendar:cal,notifications:()=>nl(NT)},
student:{
'':()=>st([['Average grade',J[4],'primary','chart-line','Quarter 3'],['Attendance',J[3]+'%','danger','calendar-check','Below 75%'],['Notifications',NS.length,'warning','bell-outline','Unread'],['Classes today',SCH.length,'info','book-open-variant','Mon, Sep 21']])+`<div class="row"><div class="col-xl-7">${card(['Grades by subject'],gr())}</div><div class="col-xl-5">${ann()}</div></div>`,
grades:gv,attendance:att,classes:()=>tbl('Today\'s classes',['Time','Subject','Teacher','Room'],SCH),announcements:()=>ann(),calendar:cal,notifications:()=>nl(NS),profile:prof,security:sec}};


/* ---------- theme + notification controls ---------- */
const notificationItems=r=>({admin:[['Enrollment for SY 2026–2027 is still open','Enrollment','Sep 18'],['First quarter exams start Oct 5','Academic','Sep 17']],teacher:NT.slice(0,3),parent:NT,student:NS}[r]||[]);
function renderNotifications(r){
  const list=notificationItems(r), menu=$('#notification-menu');
  if(!menu)return;
  menu.innerHTML=`<div class="d-flex align-items-center justify-content-between px-3 py-2 border-bottom"><strong>Notifications</strong><span class="badge bg-primary-subtle text-primary">${list.length} new</span></div>`+
    (list.length?list.map(n=>`<a href="#/${r}/${r==='parent'||r==='student'?'notifications':'announcements'}" class="notification-item"><span class="avatar-xs flex-shrink-0"><span class="avatar-title bg-primary-subtle text-primary rounded-circle"><i class="mdi mdi-bell-outline"></i></span></span><span class="flex-grow-1"><span class="d-block font-size-13">${esc(n[0])}</span><span class="text-muted font-size-11">${esc(n[1])} · ${esc(n[2])}</span></span></a>`).join(''):'<div class="p-3 text-muted text-center">No new notifications.</div>')+
    `<div class="text-center p-2 border-top"><a href="#/${r}/${r==='parent'||r==='student'?'notifications':'announcements'}" class="small">View all</a></div>`;
}
function applyTheme(){
  const dark=localStorage.getItem('spnhs_theme')==='dark';
  const body=document.body;
  const html=document.documentElement;

  // Use Minia's native dark-mode variables instead of mixing a second theme system.
  body.classList.toggle('spnhs-dark',dark);
  body.setAttribute('data-bs-theme',dark?'dark':'light');
  body.setAttribute('data-topbar',dark?'dark':'light');
  body.setAttribute('data-sidebar',dark?'dark':'light');
  html.setAttribute('data-bs-theme',dark?'dark':'light');

  const button=$('#theme-toggle');
  const i=$('#theme-icon');
  if(i){
    i.className=dark?'mdi mdi-white-balance-sunny spnhs-theme-icon':'mdi mdi-weather-night spnhs-theme-icon';
  }
  if(button){
    button.setAttribute('aria-pressed',String(dark));
    button.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
    button.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  }
}
function toggleTheme(){
  const next=localStorage.getItem('spnhs_theme')==='dark'?'light':'dark';
  localStorage.setItem('spnhs_theme',next);
  applyTheme();
}
document.addEventListener('click',e=>{
  const button=e.target.closest('#theme-toggle');
  if(button){
    e.preventDefault();
    toggleTheme();
  }
});
applyTheme();

/* ---------- router ---------- */
function go(){
  let [,r,p='']=location.hash.split('/');
  if(!R[r]){r=localStorage.eanhs_role;return R[r]?location.replace('#/'+r+'/'):location.replace('sign-in.html')}
  localStorage.eanhs_role=r;
  const g=N[r],it=g.flatMap(x=>x[1]).find(x=>x[0]==p)||g[0][1][0],bg=B[r]||{};
  $('#side-menu').innerHTML=g.map(([t,l])=>`<li class="menu-title">${t}</li>`+l.map(([k,n,i])=>`<li class="${k==it[0]?'mm-active':''}"><a href="#/${r}/${k}" class="${k==it[0]?'active':''}"><i data-feather="${i}"></i>${bg[k]?`<span class="badge rounded-pill bg-danger float-end">${bg[k]}</span>`:''}<span>${n}</span></a></li>`).join('')).join('');
  $('#roles').innerHTML=Object.entries(R).map(([k,n])=>`<a class="dropdown-item ${k==r?'active':''}" href="#/${k}/">${n}</a>`).join('');
  $('#who').textContent=U[r][0];$('#av').src=`assets/images/users/avatar-${U[r][1]}.jpg`;
  $('#nb').textContent=bg.notifications||'';$('#nb').hidden=!bg.notifications;
  renderNotifications(r);
  document.title=it[1]+' | SPNHS School Portal';
  $('#view').innerHTML=`<div class="row"><div class="col-12"><div class="page-title-box d-sm-flex align-items-center justify-content-between"><h4 class="mb-sm-0 font-size-18">${it[1]}</h4><ol class="breadcrumb m-0"><li class="breadcrumb-item">${R[r]}</li><li class="breadcrumb-item active">${it[1]}</li></ol></div></div></div>`+PG[r][it[0]]();
  Q.splice(0).forEach(f=>f());feather.replace();scrollTo(0,0);document.body.classList.remove('sidebar-enable');
}
addEventListener('hashchange',go);go();

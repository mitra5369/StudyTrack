const defaultData={subjects:[
{name:"Data Analytics",progress:65},{name:"DBMS",progress:45},{name:"DAA",progress:30},{name:"Web Technology",progress:55}
],tasks:[
{text:"Revise Unit 1",done:false},{text:"Practice 5 coding problems",done:false},{text:"Update GitHub project",done:true},{text:"Read today's notes",done:false}
],streak:1};

let data=JSON.parse(localStorage.getItem("studytrack"))||defaultData;

function save(){localStorage.setItem("studytrack",JSON.stringify(data));render()}
function render(){
  const done=data.tasks.filter(t=>t.done).length;
  document.getElementById("subjectCount").textContent=data.subjects.length;
  document.getElementById("taskCount").textContent=data.tasks.length-done;
  document.getElementById("doneCount").textContent=done;
  document.getElementById("progress").textContent=(data.tasks.length?Math.round(done/data.tasks.length*100):0)+"%";
  document.getElementById("streak").textContent=data.streak;

  document.getElementById("subjects").innerHTML=data.subjects.map((s,i)=>`
    <div class="subject"><div class="row"><strong>${escapeHTML(s.name)}</strong><span class="muted">${s.progress}%</span></div>
    <div class="mini-bar"><div style="width:${s.progress}%"></div></div></div>`).join("");

  document.getElementById("tasks").innerHTML=data.tasks.map((t,i)=>`
    <label class="task ${t.done?"done":""}"><input type="checkbox" ${t.done?"checked":""} onchange="toggleTask(${i})"><span>${escapeHTML(t.text)}</span></label>`).join("");

  const pct=Math.min(done/4*100,100);
  document.getElementById("goalText").textContent=`${done} / 4 tasks`;
  document.getElementById("goalBar").style.width=pct+"%";
}
function toggleTask(i){data.tasks[i].done=!data.tasks[i].done;if(data.tasks[i].done&&data.tasks.every(t=>t.done))data.streak++;save()}
document.getElementById("addTask").onclick=()=>{const text=prompt("Task name:");if(text?.trim()){data.tasks.push({text:text.trim(),done:false});save()}};
document.getElementById("addSubject").onclick=()=>{const name=prompt("Subject name:");if(name?.trim()){data.subjects.push({name:name.trim(),progress:0});save()}};
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("dark",document.body.classList.contains("dark"));document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙"};
if(localStorage.getItem("dark")==="true"){document.body.classList.add("dark");document.getElementById("themeBtn").textContent="☀️"}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
render();

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDark);

    themeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});
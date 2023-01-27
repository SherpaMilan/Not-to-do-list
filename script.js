// global variables

let taskList = [];
let badList = [];

const hrsPerWeek = 24 * 7;

// for invalid characters
let invalidChars = ["+", "-", "e", "E"];
const q = document.querySelector(".hr-input");
q.addEventListener("keydown", (e) => {
  invalidChars.includes(e.key) && e.preventDefault();
});

//submit form
document.querySelector("#form-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const task = document.querySelector(".task-input").value;
  const hr = document.querySelector(".hr-input").value;

  if (!task && !hr) return;

  const obj = {
    task,
    hr,
  };

  //to show the user that cannot have more than total hrsperweek
  const totalAllocatedHrs = totalTaskHours();
  if (totalAllocatedHrs + hr > hrsPerWeek) {
    return alert(
      "Sorry,you do not have enough time to add more tasks this week"
    );
  }

  taskList.push(obj);

  displayTasks();
  totalTaskHours();
});

const displayTasks = () => {
  let str = "";
  taskList.map((item, i) => {
    str += `
        <tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
        <button  onclick="deleteTask(${i})"  class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button onclick="markAsNotToDo (${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i></button>
        
        </td>
</tr>


        `;
  });
  document.querySelector("#task-list").innerHTML = str;
};

const displayBadTasks = () => {
  let str = "";
  badList.map((item, i) => {
    str += `
          <tr>
          <td>${i + 1}</td>
          <td>${item.task}</td>
          <td>${item.hr} hrs</td>
          <td class="text-end">
          <button  onclick="markAsToDo(${i})" class="btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
          <button  onclick="deleteBadTask(${i})"  class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
          
          </td>
  </tr>
  
  
          `;
  });
  document.querySelector("#bad-task").innerHTML = str;

  totalBadTaskHours();
};

//to add into MarkasNOtToDo
const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1);

  badList.push(item[0]);

  displayTasks();
  displayBadTasks();
};

// to send back to tasklist
const markAsToDo = (i) => {
  const item = badList.splice(i, 1);
  taskList.push(item[0]);
  displayTasks();
  displayBadTasks();
};

// to delete entrylist
const deleteTask = (i) => {
  if (window.confirm("Confirm to delete this task")) {
    taskList = taskList.filter((item, index) => index !== i);

    displayTasks();
  }
};

//to delete badtaskList

const deleteBadTask = (i) => {
  if (window.confirm("Confirm to delete")) {
    badList = badList.filter((item, index) => index !== i);
    displayBadTasks();
  }
};

//save hours
const totalBadTaskHours = () => {
  const total = badList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalBadHrs").innerText = total;
  return total;
};

//total hours
const totalTaskHours = () => {
  const total = taskList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalHrs").innerText = total + totalBadTaskHours();
  return total;
};

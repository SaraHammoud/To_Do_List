document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    checkTaskStatuses();
    setInterval(checkTaskStatuses, 60000); // Check every minute
  });
  
const taskInput = document.getElementById('taskInput');
const taskDateTime = document.getElementById('taskDateTime');
const taskPerson = document.getElementById('taskPerson');
const btn = document.querySelector('.addTask > button');

btn.addEventListener('click', addList);
taskInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    addList();
  }
});

function addList() {
  const notCompleted = document.querySelector('.notCompleted');
  const Completed = document.querySelector('.Completed');

  const newLi = document.createElement('li');
  const checkBtn = document.createElement('button');
  const delBtn = document.createElement('button');
  const taskInfo = document.createElement('div');

  checkBtn.innerHTML = '<i class="fa fa-check"></i>';
  delBtn.innerHTML = '<i class="fa fa-trash"></i>';

  const taskValue = taskInput.value;
  const dateTimeValue = taskDateTime.value;
  const personValue = taskPerson.value;

  if (taskValue !== '') {
    const currentTime = new Date();
    const taskTime = new Date(dateTimeValue);

    let pastDueMessage = '';
    if (taskTime < currentTime) {
      pastDueMessage = '<span style="color: red;"><strong>Past Due</strong></span><br>';
    }

    taskInfo.innerHTML = `${pastDueMessage}<strong>Task:</strong> ${taskValue}<br>
                          <strong>Due:</strong> ${dateTimeValue}<br>
                          <strong>Assigned to:</strong> ${personValue}`;

    taskInput.value = '';
    taskDateTime.value = '';
    taskPerson.value = '';

    newLi.appendChild(taskInfo);
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);
    notCompleted.appendChild(newLi);
  }

  checkBtn.addEventListener('click', function () {
    const parent = this.parentNode;
    parent.remove();
    Completed.appendChild(parent);
    checkBtn.style.display = 'none';
  });

  delBtn.addEventListener('click', function () {
    const parent = this.parentNode;
    parent.remove();
  });
}
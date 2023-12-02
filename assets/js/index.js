document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Secret Page');

  // INPUT ELEMENT
  const taskInput = document.getElementById('task');
  // ADD BUTTON / POST REQUEST LOGIC
  const addBtn = document.getElementById('task-button');
  addBtn.addEventListener('click', async () => {
    const task = taskInput.value;
    if (!task) return window.alert('Please provide a task');

    try {
      const response = await fetch('http://localhost:3333/task', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    taskInput.value = '';
  });

  // LIST CONTAINER
  // GET BUTTON LOGIC
  const getBtn = document.getElementById('retrieve');
  getBtn.addEventListener('click', async () => {
    const taskUl = document.getElementById('task-list');
    taskUl.remove();
    const newTaskUl = document.createElement('ul');
    newTaskUl.id = 'task-list';
    try {
      const response = await fetch('http://localhost:3333/task');
      const data = await response.json();
      console.log(data);

      data.forEach((task) => {
        const taskLi = document.createElement('li');
        taskLi.classList.add('task');
        taskLi.innerText = task.item;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'X';
        deleteBtn.classList.add('remove');
        taskLi.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', async () => {
          try {
            await fetch(`http://localhost:3333/task/${task._id}`, {
              method: 'DELETE',
              mode: 'same-origin',
            });
            taskLi.remove();
          } catch (err) {
            console.log(err);
          }
        });
        taskLi.appendChild(deleteBtn);
        newTaskUl.appendChild(taskLi);
        document.body.appendChild(newTaskUl);
      });
    } catch (err) {
      console.log(err);
    }
  });
});

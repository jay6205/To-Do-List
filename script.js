document.addEventListener("DOMContentLoaded", ()=>{
    const input=document.querySelector("#taskInput")
    const add_task_btn=document.querySelector("#addTaskBtn")
    const task_list=document.querySelector("#taskList")

    let tasks= JSON.parse(localStorage.getItem('tasks')) || []
    let total_tasks_completed=0;
    document.querySelector("#taskCounter").textContent =
    `Total Tasks Completed: ${total_tasks_completed}`;

    tasks.forEach(element => render_task(element));

    function save_tasks(){
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }

    function render_task(task){
        let list_elem=document.createElement('li')
        list_elem.setAttribute('data_id',task.id)
        if(task.completed) list_elem.classList.add('completed')
        list_elem.innerHTML=
        `
        <span>${task.text}</span>
        <button class="deleteBtn">Delete</button>
        `
        task_list.appendChild(list_elem)
        list_elem.addEventListener("click",function(dets){
            const task_index=tasks.findIndex(t=> t.id === task.id)
            if(dets.target.classList.contains("deleteBtn")){
                list_elem.remove();
                if (task_index !== -1) {
                    tasks.splice(task_index, 1);
                    if (tasks.length === 0) {
                        localStorage.removeItem("tasks");
                    }
                }
            }
            else{
                if (task.completed) return;
                list_elem.classList.toggle("completed");
                if(task_index !==-1){
                    tasks[task_index].completed = true;
                    total_tasks_completed++;
                }
            }
        save_tasks();
        document.querySelector("#taskCounter").textContent=`Total Tasks Completed: ${total_tasks_completed}`
        })
    }

    

    add_task_btn.addEventListener("click",()=>{
        try{
            const task_text=input.value.trim();
            if(task_text === ""){
                alert("Please enter a task")
            }
            else{
                const new_task={
                    id: Date.now(),
                    text: task_text,
                    completed: false
                }
                tasks.push(new_task);
                render_task(new_task);
                save_tasks();
                input.value="" //this is for clearing the input
                // console.log(tasks);
            }
        }
        catch(err){
            console.log(err);
        }    
})


})
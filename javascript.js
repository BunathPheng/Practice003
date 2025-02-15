const tasks = [];
        function addTask() {
            const taskName = document.getElementById("taskName").value.trim();
            const taskDueDate = document.getElementById("taskDueDate").value;
            const taskPriority = document.getElementById("taskPriority").value;
            const errorMsg = document.getElementById("error");

            if (!taskName || !taskDueDate || taskPriority === "Choose a priority") {
                errorMsg.textContent = "All fields are required!";
                return;
            }

            const dueDate = new Date(taskDueDate);
            if (dueDate <= new Date()) {
                errorMsg.textContent = "Due date cannot be in the past!";
                return;
            }
            tasks.push({
                name: taskName,
                dueDate: dueDate.toLocaleDateString("en-US"),
                priority: taskPriority,
                status: "Pending",
            });

            errorMsg.textContent = "";
            renderTasks();
        }

        function toggleStatus(index) {
            tasks[index].status = tasks[index].status === "Pending" ? "Completed" : "Pending";
            renderTasks();
        }

        function getPriorityColor(priority) {
            return priority === "High" ? "text-red-500" : priority === "Medium" ? "text-yellow-500" : "text-green-500";
        }
        function renderTasks() {
            const tableBody = document.getElementById("taskTableBody");
            tableBody.innerHTML = "";
            tasks.forEach((task, index) => {
                const row = `
                    <tr class="border-b ">
                        <td class="px-6 py-4">${task.name}</td>
                        <td class="px-6 py-4">${task.dueDate}</td>
                        <td class="px-6 py-4 ${getPriorityColor(task.priority)}">${task.priority}</td>
                        <td class="px-6 py-4">
                            <button onclick="toggleStatus(${index})" class="px-4 py-2 rounded-lg text-white ${task.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}">
                                ${task.status}
                            </button>
                        </td>
                    </tr>`;
                tableBody.innerHTML += row;
            });
        }

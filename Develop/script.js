// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeesArray = [];

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let keepAdding = true;

  while (keepAdding) {
    let firstName;
    let lastName;
    let salary;

    let keepAsking = true

    while (keepAsking) {
      firstName = prompt("Please provide your first name.");
      lastName = prompt("Please provide your last name.");
      salary = prompt("Please provide your salary.");

      if (firstName && lastName && salary) {
        if (isNaN(salary)) {
          salary = 0;
        }
        
        salary = Number(salary).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        keepAsking = false;
      } else {
        alert("ALL info MUST be entered!");
      }

    }

    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary
    };

    employeesArray.push(employee);

    keepAdding = confirm('Would you like to add another employee?');

  }
  
  return employeesArray;

};


// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  if (employeesArray.length === 0) return 0;

  const totalSalary = employeesArray.reduce((sum, employee) => {
    // Remove the dollar sign and commas, then convert to a number
    const salaryNumber = Number(employee.salary.replace(/[^0-9.-]+/g, ""));
    return sum + salaryNumber;
  }, 0);

  const averageSalary = totalSalary / employeesArray.length;
  console.log(`The average salary is: ${averageSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
};


// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  if (employeesArray.length === 0) return null;

  const Index = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[Index];
  console.log(`Congradulations to ${randomEmployee.firstName} ${randomEmployee.lastName} our random drawing winner!`);
};


addEmployeesBtn.addEventListener('click', collectEmployees);

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);

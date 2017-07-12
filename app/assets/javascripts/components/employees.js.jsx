var Employees = React.createClass({

	getInitialState() {
    return {
			// in order to hire an employee, create object for new employee
      employees: this.props.employees,
      employee: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    }
  },

	// handleHireEmployee method is called when Hire button is clicked 
	// when clicked, makes an AJAX call to create action for employees 
	// with values set in the employee object 
 
	 handleHireEmployee() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        employee: that.state.employee,
      },
      url: '/employees.json',
      success: function(res) {
        var newEmployeeList = that.state.employees;
        newEmployeeList.push(res);
        that.setState({
          employees: newEmployeeList,
          employee: {
            name: '',
            email: '',
            manager: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  // persist state of input values for employee name until employee values are successfully saved 
   handleNameChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.name = e.target.value;
    this.setState({employee: newEmployee});
  },

  // persist state of input values for employee email  until employee values are successfully saved 
   handleEmailChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.email = e.target.value;
    this.setState({employee: newEmployee});  
  },

  // persist state of input values for employee manager status  until employee values are successfully saved 
   handleManagerChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.manager = e.target.value;
    this.setState({employee: newEmployee});
  },
  
  // call prop method onFireEmployee on successful deleted employee
  handleFireEmployee(employee) {
    var employeeList = this.state.employees.filter(function(item) {
      return employee.id !== item.id;
    });
    this.setState({employees: employeeList});
  },

	render() {
    var that = this;
    employees = this.state.employees.map( function(employee) {
      return (
        <Employee employee={employee} key={employee.id} onFireEmployee={that.handleFireEmployee} />
      );
    });
    return (
      <div>
        <h1>Employees</h1>
        <div id="employees">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {employees}
              <tr>
                <td>
                  <input type="text" value={this.state.employee.name} onChange={this.handleNameChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input value={this.state.employee.email} type="text" onChange={this.handleEmailChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.email}</span>
                </td>
                <td><input value={this.state.employee.manager} type="checkbox" onChange={this.handleManagerChange} /></td>
                <td><button onClick={this.handleHireEmployee}>Hire</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

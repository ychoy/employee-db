var Employees = React.createClass({

// pass employee object as prop to component 
  getInitialState() {
    return {
      employee: this.props.employee
    }
  },

	render() {
    return (
      <tr>
        <td>{this.state.employee.name}</td>
        <td>{this.state.employee.email}</td>
        <td>{this.state.employee.manager ? '✔' : ''}</td>
      </tr>
    );
  }

// render Employee component 
  render () {
    employees = this.state.employees.map( function(employee) {
      return (
        <Employee employee={employee} key={employee.id} />
      );
   });
};

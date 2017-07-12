var Employee = React.createClass({
	getInitialState() {
  	return {
   		employee: this.props.employee // pass employee object as a prop to component 
   		editMode: false,
   		errors: {}
   	}
 	},

	setEditMode() {
    this.setState({editMode: true});
  },

  handleNameChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.name = e.target.value;
    this.setState({employee: newEmployee});
  },

  handleEmailChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.email = e.target.value;
    this.setState({employee: newEmployee});
  },

  handleManagerChange(e) {
    var newEmployee = this.state.employee;
    newEmployee.manager = e.target.value;
    this.setState({employee: newEmployee});
  },

	handleEmployeeUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        employee: that.state.employee,
      },
      url: '/employees/' + that.state.employee.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          employee: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  render() {
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.employee.name}
              onChange={this.handleNameChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td> 
          <td>
            <input
              type="text"
              value={this.state.employee.email}
              onChange={this.handleEmailChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.email}</span>
          </td>
          <td>
            <input
              type="checkbox"
              value={this.state.employee.manager}
              onChange={this.handleManagerChange} />
          </td>
          <td>
            <button onClick={this.handleEmployeeUpdate}>Save</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.employee.name}</td>
          <td>{this.state.employee.email}</td>
          <td>{this.state.employee.manager ? '✔' : ''}</td>
          <td>
            <button onClick={this.setEditMode}>Edit</button>
          </td>
        </tr>
      );
    }
    return markup;
  }


});

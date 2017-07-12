var Employee = React.createClass({
  getInitialState() {
    return {
      employee: this.props.employee // pass employee object as a prop to component 
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
});

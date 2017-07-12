class EmployeesController < ApplicationController
  def index
    @employees = Employee.all
    render component: 'Employees', props: { employees: @employees } #render react component to list all employees
  end
end  


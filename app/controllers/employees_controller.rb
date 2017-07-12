class EmployeesController < ApplicationController
  def index
    @employees = Employee.all
    render component: 'Employees', props: { employees: @employees } #render react component to list all employees
  end
	
	 def create
    @employee = Employee.new(employee_params)
    respond_to do |format|
      format.json do 
        if @employee.save
          render :json => @employee
        else
          render :json => { :errors => @employee.errors.messages }, :status => 422
        end
      end
    end
  end



end  


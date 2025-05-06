"use client"

import { useState } from "react"
import EmployeeForm from "./EmployeeForm"
import ShiftScheduler from "./ShiftScheduler"

// Sample employee data
const initialEmployees = [
  {
    id: "emp-001",
    name: "John Doe",
    email: "john@brewhaven.com",
    role: "Manager",
    phone: "555-123-4567",
    hireDate: "2022-01-15",
    status: "Active",
  },
  {
    id: "emp-002",
    name: "Jane Smith",
    email: "jane@brewhaven.com",
    role: "Barista",
    phone: "555-987-6543",
    hireDate: "2022-03-10",
    status: "Active",
  },
  {
    id: "emp-003",
    name: "Mike Johnson",
    email: "mike@brewhaven.com",
    role: "Cashier",
    phone: "555-456-7890",
    hireDate: "2022-05-22",
    status: "Active",
  },
  {
    id: "emp-004",
    name: "Sarah Williams",
    email: "sarah@brewhaven.com",
    role: "Barista",
    phone: "555-789-0123",
    hireDate: "2022-07-05",
    status: "On Leave",
  },
]

const EmployeesPage = ({ currentUser }) => {
  const [employees, setEmployees] = useState(initialEmployees)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [viewingShifts, setViewingShifts] = useState(null)
  const [filterRole, setFilterRole] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const roles = ["All", ...new Set(employees.map((emp) => emp.role))]

  // Filter employees based on role and search term
  const filteredEmployees = employees.filter((employee) => {
    const matchesRole = filterRole === "All" || employee.role === filterRole
    const matchesSearch =
      searchTerm === "" ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesRole && matchesSearch
  })

  const handleAddEmployee = (newEmployee) => {
    const employeeWithId = {
      ...newEmployee,
      id: `emp-${Math.floor(Math.random() * 10000)}`,
    }
    setEmployees([...employees, employeeWithId])
    setIsAddingEmployee(false)
  }

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
    setEditingEmployee(null)
  }

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((employee) => employee.id !== employeeId))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-amber-900">Employees</h1>
        <button
          onClick={() => setIsAddingEmployee(true)}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Add New Employee
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hire Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(employee.hireDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : employee.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingEmployee(employee)}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      Edit
                    </button>
                    <button onClick={() => setViewingShifts(employee)} className="text-blue-600 hover:text-blue-900">
                      Shifts
                    </button>
                    {currentUser?.role === "Manager" && employee.id !== currentUser?.id && (
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No employees found</p>
          <p className="text-sm mt-2">Try changing your filters or add new employees</p>
        </div>
      )}

      {(isAddingEmployee || editingEmployee) && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
          onCancel={() => {
            setIsAddingEmployee(false)
            setEditingEmployee(null)
          }}
          roles={roles.filter((role) => role !== "All")}
        />
      )}

      {viewingShifts && <ShiftScheduler employee={viewingShifts} onClose={() => setViewingShifts(null)} />}
    </div>
  )
}

export default EmployeesPage

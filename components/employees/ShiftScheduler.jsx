"use client"

import { useState, useEffect } from "react"

// Sample shift data
const initialShifts = {
  "emp-001": [
    { id: 1, date: "2023-05-15", startTime: "08:00", endTime: "16:00" },
    { id: 2, date: "2023-05-16", startTime: "08:00", endTime: "16:00" },
    { id: 3, date: "2023-05-17", startTime: "12:00", endTime: "20:00" },
  ],
  "emp-002": [
    { id: 4, date: "2023-05-15", startTime: "12:00", endTime: "20:00" },
    { id: 5, date: "2023-05-16", startTime: "12:00", endTime: "20:00" },
    { id: 6, date: "2023-05-18", startTime: "08:00", endTime: "16:00" },
  ],
  "emp-003": [
    { id: 7, date: "2023-05-17", startTime: "08:00", endTime: "16:00" },
    { id: 8, date: "2023-05-18", startTime: "12:00", endTime: "20:00" },
    { id: 9, date: "2023-05-19", startTime: "08:00", endTime: "16:00" },
  ],
  "emp-004": [
    { id: 10, date: "2023-05-15", startTime: "16:00", endTime: "22:00" },
    { id: 11, date: "2023-05-19", startTime: "16:00", endTime: "22:00" },
  ],
}

const ShiftScheduler = ({ employee, onClose }) => {
  const [shifts, setShifts] = useState([])
  const [newShift, setNewShift] = useState({
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
  })
  const [isAddingShift, setIsAddingShift] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Load shifts for this employee
    setShifts(initialShifts[employee.id] || [])
  }, [employee.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewShift({
      ...newShift,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateShift = () => {
    const newErrors = {}

    if (!newShift.date) {
      newErrors.date = "Date is required"
    }

    if (!newShift.startTime) {
      newErrors.startTime = "Start time is required"
    }

    if (!newShift.endTime) {
      newErrors.endTime = "End time is required"
    } else if (newShift.startTime >= newShift.endTime) {
      newErrors.endTime = "End time must be after start time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddShift = () => {
    if (validateShift()) {
      const newShiftItem = {
        id: Date.now(),
        ...newShift,
      }

      setShifts([...shifts, newShiftItem])
      setNewShift({
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "17:00",
      })
      setIsAddingShift(false)
    }
  }

  const handleDeleteShift = (shiftId) => {
    setShifts(shifts.filter((shift) => shift.id !== shiftId))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-amber-900">Shifts for {employee.name}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Upcoming Shifts</h3>
            <button
              onClick={() => setIsAddingShift(true)}
              className="px-3 py-1 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Add Shift
            </button>
          </div>

          {shifts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No shifts scheduled</p>
              <p className="text-sm mt-2">Click "Add Shift" to schedule a new shift</p>
            </div>
          ) : (
            <div className="space-y-2">
              {shifts
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((shift) => (
                  <div
                    key={shift.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium">{formatDate(shift.date)}</div>
                      <div className="text-sm text-gray-500">
                        {shift.startTime} - {shift.endTime}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteShift(shift.id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}

          {isAddingShift && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-3">Add New Shift</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className={`w-full px-3 py-2 border ${errors.date ? "border-red-300" : "border-gray-300"} rounded-md`}
                    value={newShift.date}
                    onChange={handleInputChange}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      id="startTime"
                      name="startTime"
                      type="time"
                      className={`w-full px-3 py-2 border ${errors.startTime ? "border-red-300" : "border-gray-300"} rounded-md`}
                      value={newShift.startTime}
                      onChange={handleInputChange}
                    />
                    {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
                  </div>

                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      id="endTime"
                      name="endTime"
                      type="time"
                      className={`w-full px-3 py-2 border ${errors.endTime ? "border-red-300" : "border-gray-300"} rounded-md`}
                      value={newShift.endTime}
                      onChange={handleInputChange}
                    />
                    {errors.endTime && <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingShift(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddShift}
                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                  >
                    Add Shift
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShiftScheduler

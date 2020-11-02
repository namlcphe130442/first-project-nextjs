export const  listAll = () => {
  return {
    type: "LIST_ALL"
  }
}

export const addStaffs = (staffs: Array<Staff>) => {
  return  {
    type: "ADD_STAFFS",
    staffs
  }
}

export const addStaff = (staff: Staff) => {
  return  {
    type: "ADD_STAFF",
    staff
  }
}

export const deleteStaff = (id: number) => {
  return {
    type: "DELETE_STAFF",
    id
  }
}

export const editStaff = (staff: Staff) => {
  return {
    type : "EDIT_STAFF",
    staff
  }
}
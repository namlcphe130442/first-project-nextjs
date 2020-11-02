import apiRequest from '../pages/api/tableApi';

var findIndex = (id: number, staffs: Array<Staff>) => {
  var result = -1;
  staffs.forEach((staff, index) => {
      if(staff.id === id){
          result = index;
      }
  });
  return result;
}
const removeData = async (staff_delete_id: number) => {
  try {
    await apiRequest.remove(staff_delete_id);
  } catch (error) {
    console.log('You have an error', error)
  }
}

const editData = async (staff: Staff) => {
  try {
    await apiRequest.update(staff.id, staff);
  } catch (error) {
    console.log('You have an error', error)
  }
}

const addData = async (staff: Staff) => {
  try {
    await apiRequest.create(staff);
  } catch (error) {
    console.log('You have an error', error)
  }
}

interface Action {
  staffs: Array<Staff>;
  staff: Staff;
  type: any;
  id: number;
}

const myReducer = (state = null, { staffs, staff, type, id} : Action) => {
    switch(type) {
      case "ADD_STAFFS":
        const newStaffs = staffs;
        state = newStaffs;
        return [...state];
      case "ADD_STAFF":
        const newStaff = staff;
        if(state !== null)
        state.push(newStaff);
        addData(newStaff);
        return state === null ? state : [...state];
      case "DELETE_STAFF":
        var staff_delete_id = id;
        let index = findIndex(staff_delete_id,  state);
        state.splice(index, 1);
        removeData(staff_delete_id);
        return [...state];
      case "EDIT_STAFF":
        if(state !== null){
          index = findIndex(staff.id,  state);
          state[index] = staff;
        }        
        editData(staff);
        return state === null ? state : [...state];
      default: return state;
    }
};

export default myReducer;
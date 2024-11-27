import {createSlice} from "@reduxjs/toolkit"


export const MenuSlice = createSlice({
    name:"menu",
    initialState :
        {
        showContactInfo:false,
        showMobileMenu: false
    },
reducers: {
    setShowContactInfo: (state,action)=>{
     state.showContactInfo = !state.showContactInfo;
    },
    setShowMobileMenu:(state)=>{
    state.showMobileMenu = !state.showMobileMenu; 
    }
}
});

export const {setShowMobileMenu,setShowContactInfo} = MenuSlice.actions;
export default MenuSlice.reducer;

function addEncounters(count){
    __$("encounter_types").innerHTML = "";

    pageCount = parseInt(count) + 1;   
    __$("content").innerHTML = ""; 
    
    var pageTypes = {
        1:"Login",
        2:"Application Dashboard",
        3:"Patient Dashboard",
        4:"Custom",
        5:"Report",
        6:"Other"
    };    
    
    for(var i = 0; i < count; i++){
        var row = document.createElement("tr");
        row.className = "highlight";
        
        __$("encounter_types").appendChild(row);
        
        var cell1 = document.createElement("td");
        cell1.innerHTML = "Encounter " + (i + 1) + "'s name:";
        
        row.appendChild(cell1);
        
        var cell2 = document.createElement("td");
        
        row.appendChild(cell2);
        
        var input = document.createElement("select");
        // input.type = "text";
        input.name = "encounter" + (i + 1);
        input.id = "encounter" + (i + 1);    	        
        input.setAttribute("banner", "banner" + (i + 1));
        input.setAttribute("i", i);
        input.onchange = function(){
            var pos = parseInt(__$(this.id).getAttribute("i"));
            
            switch(parseInt(this.value)){
                case 1:
                    createLoginForm(pos + 1);
                    break;
                case 2:
                    createApplicationDashboardForm(pos + 1);
                    break;
                case 3:
                    createPatientDashboardForm(pos + 1);
                    break;
                case 4:
                    createCustomPage(pos + 1);    
                    break;
                case 5:
                    createReportForm(pos + 1);
                    break;
                default:
                    createOtherForm(pos + 1);
                    break;
            }
            // 
            
            var id = this.getAttribute("banner");
            
            if(__$(id)){
                __$(id).innerHTML = pageTypes[this.value];
                isDirty = true;
            }
            if(this.value==6 || this.value==4){
                addOther(this.id + '_other', true, "Other Encounter Name:", id, pageTypes[this.value]);
            } else {
                addOther(this.id + '_other', false, "Other Encounter Name:", id, pageTypes[this.value]);
            }
            
            
            var filled = true;
        
            for(var e = 1; e <= pageCount; e++){
                if(__$("encounter" + e)){
                    if(__$("encounter" + e).value.trim() == "") {
                        filled = false;
                        continue;
                    }
                }
            }
        
            if(filled){
                __$("next0").className = "button next";
                __$("next0").onclick = function(){
                    if(pageCount > 0 && isDirty){
                        for(var page = 1; page < pageCount; page++){
                            if(__$("cancel_destination_" + page)){
                                __$("cancel_destination_" + page).innerHTML = "";
                                __$("next_destination_" + page).innerHTML = "";
                                for(var i = 1; i < pageCount; i++){
                                    if(__$("banner" + i)){
                                        var opt1 = document.createElement("option");
                                        opt1.innerHTML = __$("banner" + i).innerHTML;
                            
                                        var opt2 = document.createElement("option");
                                        opt2.innerHTML = __$("banner" + i).innerHTML;
                            
                                        if(i != page){
                                            __$("cancel_destination_" + page).appendChild(opt1);
                                            __$("next_destination_" + page).appendChild(opt2);
                                        }
                                    }
                                }
                            }                    
                        }
                        isDirty = false;
                    }
                    currentPage += 1;
                    navigateTo(currentPage);
                }
            } else {
                __$("next0").className = "button disabled";
            }
        }
        input.innerHTML = "<option></option>" + 
        "<option value='1'>Login</option>" + 
        "<option value='2'>Application Dashboard</option>" + 
        "<option value='3'>Patient Dashboard</option>" + 
        "<option value='4'>Custom</option>" +  
        "<option value='5'>Report</option>" + 
        "<option value='6'>Other</option>";
        input.className = "text";
        
        cell2.appendChild(input);
        
        var row2 = document.createElement("tr");
        __$("encounter_types").appendChild(row2);
        
        var cell2_1 = document.createElement("td");
        cell2_1.colSpan = "2";
        
        row2.appendChild(cell2_1);
        
        cell2_1.innerHTML = "<table style='float: right; margin-right: -10px;' border='0' " + 
        "cellspacing='0' cellpadding='10'><tbody id='encounter" + (i + 1) + 
        "_other'></tbody></table>";
    
    }
    
    if(pageCount > 1){
        if(currentPage == pageCount - 1){
            __$("next" + currentPage).value = "Finish";    
        } else {
            __$("next" + currentPage).value = "Next";
        }
        
        var filled = true;
        
        for(var e = 1; e <= pageCount; e++){
            if(__$("encounter" + e)){
                if(__$("encounter" + e).value.trim() == "") {
                    filled = false;
                    continue;
                }
            }
        }
        
        if(filled){
            __$("next0").className = "button next";
            __$("next0").onclick = function(){
                if(pageCount > 0 && isDirty){
                    for(var page = 1; page < pageCount; page++){
                        if(__$("cancel_destination_" + page)){
                            __$("cancel_destination_" + page).innerHTML = "";
                            __$("next_destination_" + page).innerHTML = "";
                            for(var i = 1; i < pageCount; i++){
                                if(__$("banner" + i)){
                                    var opt1 = document.createElement("option");
                                    opt1.innerHTML = __$("banner" + i).innerHTML;
                            
                                    var opt2 = document.createElement("option");
                                    opt2.innerHTML = __$("banner" + i).innerHTML;
                            
                                    if(i != page){
                                        __$("cancel_destination_" + page).appendChild(opt1);
                                        __$("next_destination_" + page).appendChild(opt2);
                                    }
                                }
                            }
                        }                    
                    }
                    isDirty = false;
                }
                currentPage += 1;
                navigateTo(currentPage);
            }
        } else {
            __$("next0").className = "button disabled";
        }
    } else {
        __$("next0").className = "button disabled";
        __$("next0").onclick = "";
    }
}

document.oncontextmenu=new Function("return false")
    
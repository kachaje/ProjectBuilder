var currentPage = 0;
var pageCount = 1;
var isDirty = true;

function __$(id){
    return document.getElementById(id);
}

function addQuestions(page, count){
    if(__$("tbody" + page)){
        __$("tbody" + page).innerHTML = "";
    }
    
    for(var i = 0; i < count; i++){
        if(__$("tbody" + page)){
            var row = document.createElement("tr");
            row.className = "highlight";
                    
            __$("tbody" + page).appendChild(row);
            
            var cell1 = document.createElement("td");
            cell1.innerHTML = "<b>Question " + (i + 1) + "</b>";
            
            row.appendChild(cell1);
            
            var cell2 = document.createElement("td");
            
            row.appendChild(cell2);
            
            var input = document.createElement("input");
            input.type = "text";
            input.name = "question" + page + "_" + i;
            input.id = "question" + page + "_" + i;
            input.value = "";
            input.className = "text";
            
            cell2.appendChild(input);
            
            var row2 = document.createElement("tr");
            row2.className = "gray";
            
            __$("tbody" + page).appendChild(row2);
            
            var cell2_1 = document.createElement("td");
            cell2_1.style.paddingLeft = "30px";
            cell2_1.innerHTML = "Field type Q. " + (i + 1);
            
            row2.appendChild(cell2_1);
            
            var cell2_2 = document.createElement("td");
            
            row2.appendChild(cell2_2);
            
            var fieldType = document.createElement("select");
            fieldType.id = "fieldType" + page + "_" + i;
            fieldType.name = "fieldType" + page + "_" + i;
            fieldType.onclick = function(){
                setOptions(this.id, __$(this.id).getAttribute("page"), __$(this.id).getAttribute("i"));
            }
            fieldType.className = "text";
            fieldType.setAttribute("page", page);
            fieldType.setAttribute("i", i);
            fieldType.innerHTML = "<option></option>" +
            "<option value=1>Number</option>" + 
            "<option value=2>Numbers Only</option>" + 
            "<option value=3>Numbers With Unknown</option>" + 
            "<option value=4>Numbers With Unknown and N/A</option>" + 
            "<option value=5>Text Only</option>" + 
            "<option value=6>Alphanumeric</option>" + 
            "<option value=7>Calendar</option>" + 
            "<option value=8>Date</option>" + 
            "<option value=9>Simple Time</option>" + 
            "<option value=10>Advanced Time</option>" + 
            "<option value=11>Single Select</option>" + 
            "<option value=12>Multiple Select</option>" + 
            "<option value=13>Multiple Select With Select All</option>" + 
            "<option value=14>Drug Dispensation</option>" + 
            "<option value=15>Dynamically Populated</option>";
                
            cell2_2.appendChild(fieldType);
            
            
            
            var row3 = document.createElement("tr");
            row3.style.backgroundColor = "#ccc";
            __$("tbody" + page).appendChild(row3);
            
            var cell3_1 = document.createElement("td");
            cell3_1.colSpan = "2";
            
            row3.appendChild(cell3_1);
            
            cell3_1.innerHTML = "<table style='float: right; width: 100%;' " + 
            "border='0' cellspacing='0' cellpadding='10'>" + 
            "<tbody id='tbody_fld_type_" + page + "_" + i + "'></tbody></table>";
            
            var row4 = document.createElement("tr");
            row4.style.backgroundColor = "#ddd";
            __$("tbody" + page).appendChild(row4);
            
            var cell4_1 = document.createElement("td");
            cell4_1.colSpan = "2";
            
            row4.appendChild(cell4_1);
            
            cell4_1.innerHTML = "<table style='float: right; width: 100%;' " + 
            "border='0' cellspacing='0' cellpadding='10'>" + 
            "<tbody id='tbody_limit_" + page + "_" + i + "'></tbody></table>";
            
            var row6 = document.createElement("tr");
            row6.style.backgroundColor = "#eee";
            __$("tbody" + page).appendChild(row6);
            
            var cell6_1 = document.createElement("td");
            cell6_1.style.paddingLeft = "30px";
            
            row6.appendChild(cell6_1);
            
            cell6_1.innerHTML = "Number of Conditions Q. " + (i + 1);
            
            var cell6_2 = document.createElement("td");
            
            row6.appendChild(cell6_2);
            
            var input2 = document.createElement("input");
            input2.type = "text";
            input2.name = "conditionsQ" + page + "_" + i;
            input2.id = "conditionsQ" + page + "_" + i;
            input2.value = "";
            input2.className = "text";
            input2.setAttribute("page", page);
            input2.setAttribute("i", i);
            input2.onchange = function(){
                createConditions(__$(this.id).getAttribute("page"), 
                    __$(this.id).getAttribute("i"), parseInt(__$(this.id).value));
            }
            
            cell6_2.appendChild(input2);
            
            var row5 = document.createElement("tr");
            __$("tbody" + page).appendChild(row5);
            
            var cell5_1 = document.createElement("td");
            cell5_1.colSpan = "2";
            
            row5.appendChild(cell5_1);
            
            cell5_1.innerHTML = "<table style='float: right; width: 100%;' " + 
            "border='0' cellspacing='0' cellpadding='10'>" + 
            "<tbody id='tbody_conditions_" + page + "_" + i + "'></tbody></table>";
            
        }
    }
    
    if(page == pageCount - 1){
        __$("next" + page).value = "Finish";    
    } else {
        __$("next" + page).value = "Next";
    }
    
    __$("next" + page).className = "button next";
    __$("next" + page).onclick = function(){
        if(page < (pageCount - 1)){
            currentPage += 1;
            navigateTo(currentPage);
        } else {
            document.forms[0].submit();
        }
    }
        
}

function setOptions(id, page, i){
    if(__$("tbody_fld_type_" + page + "_" + i)){
        __$("tbody_fld_type_" + page + "_" + i).innerHTML = "";
    }
    if(__$("tbody_limit_" + page + "_" + i)){
        __$("tbody_limit_" + page + "_" + i).innerHTML = "";
    }
    
    if(__$(id)){
        switch(parseInt(__$(id).value)){
            case 1:
            case 2:
            case 3:
            case 4:
                createLimits(page, i);
                break;
            case 11:
            case 12:
            case 13:
                createOptions(page, i);
                break;
            case 15:
                createAjax(page, i);
                break;
        }
    }
}

function createLimits(page, i){
    var fields = ["absMin", "min", "max", "absMax"];
    var definitions = ["Absolute Minimum Q." + (parseInt(i)+1), 
    "Minimum Q." + (parseInt(i)+1), 
    "Maximum Q." + (parseInt(i)+1), 
    "Absolute Maximum Q." + (parseInt(i)+1)];
    
    for(var j = 0; j < fields.length; j++){
        var row = document.createElement("tr");
                
        __$("tbody_limit_" + page + "_" + i).appendChild(row);
        
        var cell1 = document.createElement("td");
        cell1.innerHTML = definitions[j];
        cell1.style.paddingLeft = "20px";
        
        row.appendChild(cell1);
        
        var cell2 = document.createElement("td");
        cell2.style.width = "200px";
        
        row.appendChild(cell2);
        
        var input = document.createElement("input");
        input.type = "text";
        input.name = fields[j] + page + "_" + i;
        input.id = fields[j] + page + "_" + i;
        input.value = "";
        input.className = "text";
        
        cell2.appendChild(input);
    }     
}

function createOptions(page, i){
    var row = document.createElement("tr");
            
    __$("tbody_fld_type_" + page + "_" + i).appendChild(row);
    
    var cell1 = document.createElement("td");
    cell1.innerHTML = "Options for Q. " + (parseInt(i) + 1) + 
    " <sub style='font-style: italic;'>( Separated by ; )</sub>";
    cell1.style.paddingLeft = "20px";
    cell1.style.verticalAlign = "top";
    
    row.appendChild(cell1);
    
    var cell2 = document.createElement("td");
    cell2.style.width = "200px";
    
    row.appendChild(cell2);
    
    var input = document.createElement("textarea");
    input.name = "options" + page + "_" + i;
    input.id = "options" + page + "_" + i;
    input.className = "text";
    
    cell2.appendChild(input);
}

function createAjax(page, i){
    var row = document.createElement("tr");
                
    __$("tbody_limit_" + page + "_" + i).appendChild(row);
    
    var cell1 = document.createElement("td");
    cell1.innerHTML = "Ajax URL for Q. " + (parseInt(i) + 1);
    cell1.style.paddingLeft = "20px";
    
    row.appendChild(cell1);
    
    var cell2 = document.createElement("td");
    cell2.style.width = "200px";
    
    row.appendChild(cell2);
    
    var input = document.createElement("input");
    input.type = "text";
    input.name = "ajaxURL" + page + "_" + i;
    input.id = "ajaxURL" + page + "_" + i;
    input.value = "";
    input.className = "text";
    
    cell2.appendChild(input);
}
	
function createConditions(page, i, count){
    __$("tbody_conditions_" + page + "_" + i).innerHTML = "";
    
    for(var j = 0; j < count; j++){
        var row = document.createElement("tr");
                
        __$("tbody_conditions_" + page + "_" + i).appendChild(row);
        
        var cell1 = document.createElement("td");
        cell1.innerHTML = "Condition " + (j + 1) + " for Q. " + (parseInt(i) + 1);
        cell1.style.paddingLeft = "40px";
        
        row.appendChild(cell1);
        
        var cell6 = document.createElement("td");
        
        row.appendChild(cell6);
        
        var cell2 = document.createElement("td");
        
        row.appendChild(cell2);
        
        var cell3 = document.createElement("td");
        
        row.appendChild(cell3);
        
        var cell4 = document.createElement("td");
        
        row.appendChild(cell4);
        
        var cell7 = document.createElement("td");
        
        row.appendChild(cell7);
        
        var cell5 = document.createElement("td");
        
        row.appendChild(cell5);
        
        var bracket1 = document.createElement("select");
        bracket1.className = "othertext";
        bracket1.style.width = "40px";
        bracket1.id = "condition_select_bracket1_" + page + "_" + i + "_" + j;
        bracket1.name = "condition_select_bracket1_" + page + "_" + i + "_" + j;
        bracket1.innerHTML = "<option></option>" + 
        "<option>(</option>";
            
        cell6.appendChild(bracket1);
            
        var control = document.createElement("select");
        control.className = "smalltext";
        control.setAttribute("page", page);
        control.setAttribute("i", i);
        control.setAttribute("pos", j);
        control.id = "condition_select_" + page + "_" + i + "_" + j;
        control.name = "condition_select_" + page + "_" + i + "_" + j;
        control.onclick = function(){
            addOtherCondition(__$(this.id).getAttribute("page"), __$(this.id).getAttribute("i"), 
                __$(this.id).getAttribute("pos"));
        }
        
        control.innerHTML = "<option></option>";
        
        for(var k = 0; k < parseInt(i); k++){            
            control.innerHTML += "<option>Question " + (k + 1) + "</option>";        
        }
        
        control.innerHTML += "<option>Other</option>";
        
        cell2.appendChild(control);
        
        var control2 = document.createElement("select");
        control2.className = "smalltext";
        control2.style.textAlign = "center";
        control2.style.fontSize = "1.4em";
        control2.style.padding = "2px";
        control2.id = "condition_comparison_" + page + "_" + i + "_" + j;
        control2.name = "condition_comparison_" + page + "_" + i + "_" + j;
        control2.innerHTML = "<option></option>" + 
        "<option value='1'>&lt;</option>" + 
        "<option value='2'>&gt;</option>" + 
        "<option value='3'>==</option>" + 
        "<option value='4'>&le;</option>" + 
        "<option value='5'>&ge;</option>" + 
        "<option value='6'>!=</option>";
        
        cell3.appendChild(control2);
        
        var input = document.createElement("input");
        input.type = "text";
        input.name = "condition" + page + "_" + i + "_" + j;
        input.id = "condition" + page + "_" + i + "_" + j;
        input.value = "";
        input.style.width = "100px";
        input.className = "smalltext";
        
        cell4.appendChild(input);
        
        if(j < parseInt(count) - 1){
            var control3 = document.createElement("select");
            control3.className = "smalltext";
            control3.style.textAlign = "center";
            control3.id = "condition_concat_" + page + "_" + i + "_" + j;
            control3.name = "condition_concat_" + page + "_" + i + "_" + j;
            control3.innerHTML = "<option>AND</option>" + 
            "<option>OR</option>" + 
            "<option>AND NOT</option>";
            
            cell5.appendChild(control3);
        }
        
        var row2 = document.createElement("tr");
        __$("tbody_conditions_" + page + "_" + i).appendChild(row2);
        
        var cell2_1 = document.createElement("td");
        cell2_1.colSpan = "7";
        
        row2.appendChild(cell2_1);
        
        cell2_1.innerHTML = "<table style='float: right; width: 100%;' " + 
        "border='0' cellspacing='0' cellpadding='10'>" + 
        "<tbody id='tbody_other_condition_" + page + "_" + i + "_" + j + "'></tbody></table>";
    
        var bracket2 = document.createElement("select");
        bracket2.className = "othertext";
        bracket2.style.width = "40px";
        bracket2.id = "condition_select_bracket2_" + page + "_" + i + "_" + j;
        bracket2.name = "condition_select_bracket2_" + page + "_" + i + "_" + j;
        bracket2.innerHTML = "<option></option>" + 
        "<option>)</option>";
            
        cell7.appendChild(bracket2);
            
    }     
}

function addOtherCondition(page, i, pos){
    if(__$("tbody_other_condition_" + page + "_" + i + "_" + pos)){
        __$("tbody_other_condition_" + page + "_" + i + "_" + pos).innerHTML = "";
        
        if(__$("condition_select_" + page + "_" + i + "_" + pos).value == "Other"){
            var row = document.createElement("tr");
            row.style.backgroundColor = "#eee";
                
            __$("tbody_other_condition_" + page + "_" + i + "_" + pos).appendChild(row);
        
            var cell1 = document.createElement("td");
            cell1.innerHTML = "Other Condition " + (parseInt(pos) + 1) + " for Q. " + (parseInt(i) + 1);
            cell1.style.paddingLeft = "40px";
        
            row.appendChild(cell1);
        
            var cell2 = document.createElement("td");
        
            row.appendChild(cell2);
            
            var control3 = document.createElement("select");
            control3.className = "smalltext";
            control3.style.width = "120px";
            control3.name = "other_condition_type_" + page + "_" + i + "_" + pos;
            control3.id = "other_condition_type_" + page + "_" + i + "_" + pos;
            control3.innerHTML = "<option>Parameter</option>" + 
            "<option>Variable</option>";
            
            cell2.appendChild(control3);
            
            var input = document.createElement("input");
            input.type = "text";
            input.style.width = "250px";
            input.style.marginLeft = "10px";
            input.name = "other_condition_" + page + "_" + i + "_" + pos;
            input.id = "other_condition_" + page + "_" + i + "_" + pos;
            input.value = "";
            input.className = "smalltext";
        
            cell2.appendChild(input);
        }
    }
}
   
function addTabs(page, count){
    if(__$("tbodyAppDash_" + page)){
        __$("tbodyAppDash_" + page).innerHTML = "";
    }
    
    for(var i = 0; i < count; i++){
        if(__$("tbodyAppDash_" + page)){
            var row = document.createElement("tr");
            row.className = "highlight";
                    
            __$("tbodyAppDash_" + page).appendChild(row);
            
            var cell1 = document.createElement("td");
            cell1.innerHTML = "Tab " + (i + 1);
            
            row.appendChild(cell1);
            
            var cell2 = document.createElement("td");
            
            row.appendChild(cell2);
            
            var input = document.createElement("input");
            input.type = "text";
            input.name = "appDashTab" + page + "_" + i;
            input.id = "appDashTab" + page + "_" + i;
            input.value = "";
            input.className = "text";
            
            cell2.appendChild(input);
            
            var row2 = document.createElement("tr");
            row2.className = "gray";
            
            __$("tbodyAppDash_" + page).appendChild(row2);
            
            var cell2_1 = document.createElement("td");
            cell2_1.style.paddingLeft = "30px";
            cell2_1.innerHTML = "Tab page " + (i + 1) + " source";
            
            row2.appendChild(cell2_1);
            
            var cell2_2 = document.createElement("td");
            
            row2.appendChild(cell2_2);
            
            var fieldType = document.createElement("select");
            fieldType.id = "customFieldType" + page + "_" + i;
            fieldType.name = "customFieldType" + page + "_" + i;
            
            fieldType.className = "text";
            fieldType.setAttribute("page", page);
            fieldType.setAttribute("i", i);
            fieldType.innerHTML = "<option></option>";
            
            var controls = getCustomPages();
            
            for(var s = 0; s < controls.length; s++){
                var encounter = __$(controls[s]).value;
                
                if(encounter.trim().match(/^$/)){
                    var po = controls[s].match(/^other_custom_control_encounter(\d+)\_/);
                    
                    if(po){
                        encounter = "Custom Page " + po[1];
                    }
                }
                
                fieldType.innerHTML += "<option value='" + controls[s] + "'>{ " + 
                encounter + " }</option>";
            }
            
            cell2_2.appendChild(fieldType);
            
        }
    }
    
    __$("next" + page).className = "button next";
    __$("next" + page).onclick = function(){
        if(page < (pageCount - 1)){
            currentPage += 1;
            navigateTo(currentPage);
        } else {
            document.forms[0].submit();
        }
    }
}

function addOther(id, other, label, baner, category){   
    if(!__$(id)) return;
    
    __$(id).innerHTML = "";
    if(other){
        var row = document.createElement("tr");
        row.className = (typeof(label) == "undefined" ? "highlight" : "gray");
        
        __$(id).appendChild(row);
        
        var cell1 = document.createElement("td");
        cell1.innerHTML = (typeof(label) != "undefined" ? label : "Other platform name:");
        
        row.appendChild(cell1);
        
        var cell2 = document.createElement("td");
        
        row.appendChild(cell2);
        
        var input = document.createElement("input");
        input.type = "text";
        input.name = "other_" + (typeof(category) != "undefined" ? category.toLowerCase() : "") + "_control_" + id;
        input.id = "other_" + (typeof(category) != "undefined" ? category.toLowerCase() : "") + "_control_" + id;    	        
        input.value = "";
        input.className = "text";
        
        if(typeof(baner) != "undefined"){
            input.setAttribute("banner", baner);
            
            input.onchange = function(){
                var iid = this.getAttribute("banner");
                if(__$(iid)){
                    __$(iid).innerHTML = this.value;
                    isDirty = true;
                }
            }
        }
        
        cell2.appendChild(input);
    }
}
    	
function navigateTo(page){
    for(var i = 0; i < pageCount; i++){
        if(__$("frm" + i)){
            __$("frm" + i).style.display = "none";
        }
    }
    if(__$("frm" + page)){           
        __$("frm" + page).style.display = "block";
    }
}    	
   
function getQuestionControls(category){
    var ctrls = [];
    var controls = document.forms[0].getElementsByTagName("input");

    for(var i = 0; i < controls.length; i++){
        var c = controls[i].id.match(/^question(\d+)\_/);
        if(controls[i].type == "text" && c){        
            console.log(c);
            ctrls.push([__$("other_" + (typeof(category) != "undefined" ? category.toLowerCase() : "") + 
                "_control_encounter" + c[1] + "_other").id, controls[i].id]);        
        }
    }

    return ctrls;
}

function getCustomPages(){
    var ctrls = [];
    var controls = document.forms[0].getElementsByTagName("input");

    for(var i = 0; i < controls.length; i++){
        if(controls[i].type == "text" && controls[i].id.match(/other_custom_control_encounter\d+_other/)){
            ctrls.push(controls[i].id);
        }
    }

    return ctrls;
}

function addFields(page, count, type){
    if(__$("tbody_" + type + page)){
        __$("tbody_" + type + page).innerHTML = "";
    }
    
    for(var i = 0; i < count; i++){
        if(__$("tbody_" + type + page)){
            var row = document.createElement("tr");
            row.className = "highlight";
                    
            __$("tbody_" + type + page).appendChild(row);
            
            var cell1 = document.createElement("td");
            cell1.innerHTML = "<b>Field " + (i + 1) + " Name</b>";
            
            row.appendChild(cell1);
            
            var cell2 = document.createElement("td");
            
            row.appendChild(cell2);
            
            var input = document.createElement("input");
            input.type = "text";
            input.name = type + "_field" + page + "_" + i;
            input.id = type + "_field" + page + "_" + i;
            input.value = "";
            input.className = "text";
            
            cell2.appendChild(input);
            
            var row2 = document.createElement("tr");
            row2.className = "gray";
            
            __$("tbody_" + type + page).appendChild(row2);
            
            var cell2_1 = document.createElement("td");
            cell2_1.style.paddingLeft = "30px";
            cell2_1.innerHTML = "Field source F. " + (i + 1);
            
            row2.appendChild(cell2_1);
            
            var cell2_2 = document.createElement("td");
            
            row2.appendChild(cell2_2);
            
            var fieldType = document.createElement("select");
            fieldType.id = type + "FieldType" + page + "_" + i;
            fieldType.name = type + "FieldType" + page + "_" + i;
            
            fieldType.className = "text";
            fieldType.setAttribute("page", page);
            fieldType.setAttribute("i", i);
            fieldType.innerHTML = "<option></option>";
            
            var controls = getQuestionControls("other");
            
            for(var s = 0; s < controls.length; s++){
                var encounter = __$(controls[s][0]).value;
                var question = __$(controls[s][1]).value;
                
                if(encounter.trim().match(/^$/)){
                    var po = controls[s][0].match(/^other_other_control_encounter(\d+)\_/);
                    
                    if(po){
                        encounter = "Encounter " + po[1];
                    }
                }
                
                if(question.trim().match(/^$/)){
                    var qpo = controls[s][1].match(/^question\d+\_(\d+)/);
                    
                    if(qpo){
                        question = "Question " + (parseInt(qpo[1]) + 1);
                    }
                }
                
                fieldType.innerHTML += "<option value='" + controls[s][1] + "'>{ " + 
                encounter + "}.{" + question + "}</option>";
            }
            
            cell2_2.appendChild(fieldType);
            
            
        }
    }
    
    if(page == pageCount - 1){
        __$("next" + page).value = "Finish";    
    } else {
        __$("next" + page).value = "Next";
    }
    
    __$("next" + page).className = "button next";
    __$("next" + page).onclick = function(){
        if(page < (pageCount - 1)){
            currentPage += 1;
            navigateTo(currentPage);
        } else {
            document.forms[0].submit();
        }
    }
        
}

function addDashboardLinks(page, count, type){
    if(__$("tbody" + type + page)){
        __$("tbody" + type + page).innerHTML = "";
    }
    
    for(var i = 0; i < count; i++){
        if(__$("tbody" + type + page)){
            var row = document.createElement("tr");
            row.className = "highlight";
                    
            __$("tbody" + type + page).appendChild(row);
            
            var cell1 = document.createElement("td");
            cell1.innerHTML = "<b>Link " + (i + 1) + " Name</b>";
            
            row.appendChild(cell1);
            
            var cell2 = document.createElement("td");
            
            row.appendChild(cell2);
            
            var input = document.createElement("input");
            input.type = "text";
            input.name = type + "_field" + page + "_" + i;
            input.id = type + "_field" + page + "_" + i;
            input.value = "";
            input.className = "text";
            
            cell2.appendChild(input);
            
            var row2 = document.createElement("tr");
            row2.className = "gray";
            
            __$("tbody" + type + page).appendChild(row2);
            
            var cell2_1 = document.createElement("td");
            cell2_1.style.paddingLeft = "30px";
            cell2_1.innerHTML = "Link " + (i + 1) + " source";
            
            row2.appendChild(cell2_1);
            
            var cell2_2 = document.createElement("td");
            
            row2.appendChild(cell2_2);
            
            var fieldType = document.createElement("select");
            fieldType.id = type + "FieldType" + page + "_" + i;
            fieldType.name = type + "FieldType" + page + "_" + i;
            
            fieldType.className = "text";
            fieldType.setAttribute("page", page);
            fieldType.setAttribute("i", i);
            fieldType.innerHTML = "<option></option>";
            
            var controls = getQuestionControls("other");            
            var found = {};
            
            for(var s = 0; s < controls.length; s++){
                var encounter = __$(controls[s][0]).value;
                
                if(encounter.trim().match(/^$/)){
                    var po = controls[s][0].match(/^other_other_control_encounter(\d+)\_/);
                    
                    if(po){
                        encounter = "Encounter " + po[1];
                    }
                }
                
                if(!found[encounter]){
                    fieldType.innerHTML += "<option value='" + controls[s][0] + "'>{ " + 
                    encounter + " }</option>";
                
                    found[encounter] = true;
                }
            }
            
            cell2_2.appendChild(fieldType);
            
            
        }
    }
    
    if(page == pageCount - 1){
        __$("next" + page).value = "Finish";    
    } else {
        __$("next" + page).value = "Next";
    }
    
    __$("next" + page).className = "button next";
    __$("next" + page).onclick = function(){
        if(page < (pageCount - 1)){
            currentPage += 1;
            navigateTo(currentPage);
        } else {
            document.forms[0].submit();
        }
    }
        
}
 
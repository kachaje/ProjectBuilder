 
function createReportForm(page){
        var container;
    
    if(__$("frm" + page)){
        __$("frm" + page).innerHTML = "";
        container = __$("frm" + page);
    } else {
        container = document.createElement("div");
        container.id = "frm" + page;
        container.className = "frame";
        container.style.display = "none";
    
        __$("content").appendChild(container);
    }
    
    var table = document.createElement("table");
    table.border = "0";
    table.cellSpacing = "0";
    table.cellPadding = "10";
    
    container.appendChild(table);
    
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    
    var row0 = document.createElement("tr");
    tbody.appendChild(row0);
    
    var banner = document.createElement("td");
    banner.colSpan = "2";
    banner.className = "banner";
    banner.id = "banner" + page;
    banner.innerHTML = "Encounter " + page;
    
    row0.appendChild(banner); 
    
    var row6 = document.createElement("tr");
    tbody.appendChild(row6);
    
    var row1 = document.createElement("tr");
    tbody.appendChild(row1);
    
    var cell1_1 = document.createElement("td");
    cell1_1.innerHTML = "<b>Number of fields in section</b>";
    
    row1.appendChild(cell1_1);
    
    var cell6_1 = document.createElement("td");
    cell6_1.innerHTML = "<b>Selection Criteria</b>";
    
    row6.appendChild(cell6_1);
    
    var cell6_2 = document.createElement("td");
    
    row6.appendChild(cell6_2);
    
    var criteria = document.createElement("select");
    criteria.className = "text";
    criteria.innerHTML = "<option></option>" +
        "<option>By Day</option>" + 
        "<option>By Week</option>" + 
        "<option>By Month</option>" + 
        "<option>By Quarter</option>" + 
        "<option>By Year</option>" + 
        "<option>Custom Dates</option>" + 
        "<option>Custom Date and Time</option>";
    
    cell6_2.appendChild(criteria);
    
    var cell1_2 = document.createElement("td");
    
    row1.appendChild(cell1_2);
    
    var input = document.createElement("input");
    input.type = "number";
    input.className = "text";
    input.setAttribute("page", page);
    input.name = "field_count_" + page
    input.onchange = function(){
        addFields(this.getAttribute("page"), this.value, "report");
    }
    
    cell1_2.appendChild(input);
    
    var row2 = document.createElement("tr");
    tbody.appendChild(row2);
    
    var cell2_1 = document.createElement("td");
    cell2_1.colSpan = "2";
    
    row2.appendChild(cell2_1);
    
    cell2_1.innerHTML = "<table style='float: right; width: 100%;' border='0' cellspacing='0' cellpadding='10'>" + 
    "<tbody id='tbody_report" + page + "'></tbody></table>";
    
    var row3 = document.createElement("tr");
    tbody.appendChild(row3);
    
    var cell3_1 = document.createElement("td");
    cell3_1.colSpan = "2";
    
    row3.appendChild(cell3_1);
    
    var next = document.createElement("input");
    next.type = "button";
    next.id = "next" + page;
    next.className = "button disabled";    
    next.style.cssFloat = "right";
    if(page == pageCount - 1){
        next.value = "Finish";    
    } else {
        next.value = "Next";
    }
    
    cell3_1.appendChild(next);
    
    var back = document.createElement("input");
    back.type = "button";
    back.id = "back" + page;
    back.className = "button blue";
    back.style.cssFloat = "right";
    back.value = "Back";
    back.onclick = function(){
        currentPage -= 1;
        
        navigateTo(currentPage);
    }
    
    cell3_1.appendChild(back);
    
    var reset = document.createElement("input");
    reset.type = "button";
    reset.style.cssFloat = "left";
    reset.className = "button reset";
    reset.value = "Reset";
    reset.onclick = function(){
        var result = confirm("Do you really want to discard additions?");
        
        if(result){
            currentPage = 0;
            navigateTo(currentPage);
            
            document.forms[0].reset(); 
            addEncounters(__$('encounters').value); 
            if(__$('platform').value=='Other'){
                addOther('other_type', true);
            } else {
                addOther('other_type', false);
            }
        }
    }
    
    cell3_1.appendChild(reset);
}


function createApplicationDashboardForm(page){
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
    
    var row1 = document.createElement("tr");
    
    var cell1_1 = document.createElement("td");
    cell1_1.innerHTML = "<b>Number of tabs on dashboard</b>";
    
    row1.appendChild(cell1_1);
    
    var cell1_2 = document.createElement("td");
    
    row1.appendChild(cell1_2);
    
    var input = document.createElement("input");
    input.type = "number";
    input.className = "text";
    input.setAttribute("page", page);
    input.name = "tab_count_" + page
    input.onchange = function(){
        addTabs(this.getAttribute("page"), this.value);
    }
    
    cell1_2.appendChild(input);
    
    var rowCancel = document.createElement("tr");
    tbody.appendChild(rowCancel);
    
    var rowNext = document.createElement("tr");
    tbody.appendChild(rowNext);
    
    var cellCancel_1 = document.createElement("td");
    cellCancel_1.innerHTML = "<b>Cancel Destination</b>";
    
    rowCancel.appendChild(cellCancel_1);
    
    var cellCancel_2 = document.createElement("td");
    
    rowCancel.appendChild(cellCancel_2);
    
    var cancel = document.createElement("select");
    cancel.type = "text";
    cancel.name = "cancel_destination_" + page;
    cancel.id = "cancel_destination_" + page;
    cancel.className = "text";
    
    cellCancel_2.appendChild(cancel);
    
    var cellNext_1 = document.createElement("td");
    cellNext_1.innerHTML = "<b>Next Destination</b>";
    
    rowNext.appendChild(cellNext_1);
    
    var cellNext_2 = document.createElement("td");
    
    rowNext.appendChild(cellNext_2);
    
    var nexturl = document.createElement("select");
    nexturl.type = "text";
    nexturl.name = "next_destination_" + page;
    nexturl.id = "next_destination_" + page;
    nexturl.className = "text";
    
    cellNext_2.appendChild(nexturl);

    tbody.appendChild(row1);
    
    var row2 = document.createElement("tr");
    tbody.appendChild(row2);
    
    var cell2_1 = document.createElement("td");
    cell2_1.colSpan = "2";
    
    row2.appendChild(cell2_1);
    
    cell2_1.innerHTML = "<table style='float: right; width: 100%;' border='0' cellspacing='0' cellpadding='10'>" + 
    "<tbody id='tbodyAppDash_" + page + "'></tbody></table>";
    
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
 
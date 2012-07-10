
function createLoginForm(page){
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
    tbody.appendChild(row1);
    
    var row2 = document.createElement("tr");
    tbody.appendChild(row2);
    
    var cell1_1 = document.createElement("td");
    cell1_1.innerHTML = "Username";
    
    row1.appendChild(cell1_1);
    
    var cell1_2 = document.createElement("td");
    
    row1.appendChild(cell1_2);
    
    var input1 = document.createElement("input");
    input1.type = "text";
    input1.name = "username_" + page;
    input1.id = "username_" + page;
    input1.className = "text";
    
    cell1_2.appendChild(input1);
    
    var cell2_1 = document.createElement("td");
    cell2_1.innerHTML = "Password";
    
    row2.appendChild(cell2_1);
    
    var cell2_2 = document.createElement("td");
    
    row2.appendChild(cell2_2);
    
    var input2 = document.createElement("input");
    input2.type = "text";
    input2.name = "password_" + page;
    input2.id = "password_" + page;
    input2.className = "text";
    
    cell2_2.appendChild(input2);
    
    var row4 = document.createElement("tr");
    tbody.appendChild(row4);
    
    var cell4_1 = document.createElement("td");
    cell4_1.innerHTML = "Location";
    
    row4.appendChild(cell4_1);
    
    var cell4_2 = document.createElement("td");
    
    row4.appendChild(cell4_2);
    
    var input4 = document.createElement("input");
    input4.type = "text";
    input4.name = "location_" + page;
    input4.id = "location_" + page;
    input4.className = "text";
    
    cell4_2.appendChild(input4);
    
    var row3 = document.createElement("tr");
    tbody.appendChild(row3);
    
    var cell3_1 = document.createElement("td");
    cell3_1.colSpan = "2";
    
    row3.appendChild(cell3_1);
    
    var next = document.createElement("input");
    next.type = "button";
    next.id = "next" + page;
    next.className = "button next";    
    next.style.cssFloat = "right";
    if(page == pageCount - 1){
        next.value = "Finish";  
        next.onclick = function(){
            document.forms[0].submit();
        }  
    } else {
        next.value = "Next";
        next.onclick = function(){
            currentPage += 1;
        
            navigateTo(currentPage);
        }
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
   
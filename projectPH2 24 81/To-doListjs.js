var task = {
      name: "",
      id: 0,
      desciption: "",
      date: "",
      status: ""
    }


    var task = function task(id, name, date, des) { //constructor
      this.id = id;
      this.name = name;
      this.date = date;
      this.desciption = des;
    }

    var allTasksArray = [];
    var x = new task(0, " All TASKS", "", "");
    allTasksArray[0] = x;
    var inprogressArray = [];
    var x = new task(0, " IN PROGRESS", "", "");;
    inprogressArray[0] = x;
    var completedArray = [];
    var x = new task(0, " COMPLETED", "", "");
    completedArray[0] = x;
    var archivedArray = [];
    var x = new task(0, " ARCHIVED", "", "");
    archivedArray[0] = x;
    var edit = false;
    var idbutton = 9500;
    var idtask = 1;
    var counterAlltasks = 0;
    var counterInprogress = 0;
    var counterArchived = 0;
    var counterCompleted = 0;
    var state;
    var rowindex;
	
    /////////////////////////////////////
    $(document).ready(function() {
      redrawingtable(allTasksArray);
      state = "allTasks";

    });
/*
    function redrawingtable(array) {
      var theTable = "<table>"
      theTable += "<th>";
      // theTable += "<td></td>";
      theTable += "<td><b>" + array[0].name + "</b></td>";
      theTable += "<td><b>DUE DATE</b></td>";
      theTable += "<td></td>";
      theTable += "</th>";

      for (var i = 1; i < array.length; i++) {

        theTable += "<tr onmouseover='$(\"#button_" + idbutton + "\").show();' onmouseout='$(\"#button_" + idbutton + "\").hide(); $(\"#button_" + idbutton + "\").click();' >";
        theTable += "<td><input type=\"checkbox\" class=\"basic-kpi-row\"/></td>";

        if (array[i].status == 'c' && array[0] === allTasksArray[0]) {

          theTable += "<td data-toggle=\"tooltip\" data-html=\"true\"  data-placement=\"left\"  title=\"" + array[i].desciption + "\"><strike> " + array[i].name + "</strike></td>";

        } else {
          // window.alert(array[i].desciption);
          theTable += "<td data-toggle=\"tooltip\"  data-html=\"true\"  data-placement=\"left\" title=\"" + array[i].desciption + "\">" + array[i].name + "</td>";
        }
        theTable += "<td>" + array[i].date + "</td>";

        if (array[0] == allTasksArray[0] || array[0] === inprogressArray[0]) {

          theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
            "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"a\" class=\"clickMe\" onmousedown=\"list(id)\" ><a href=\"#\">Archieve</a></li><li id=\"b\" class=\"clickMe\"   data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li><li id=\"d\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Mark as Done</a></li></ul></div></td>";


        }
        if (array[0] == completedArray[0]) {

          theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
            "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"a\" class=\"clickMe\" onmousedown=\"list(id)\" ><a href=\"#\">Archieve</a></li><li id=\"b\" class=\"clickMe\"   data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li></ul></div></td>";


        }

        if (array[0] == archivedArray[0]) {

          theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
            "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"b\" class=\"clickMe\"  data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\"  onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li></ul></div></td>";
        }
        idbutton++;
        theTable += "</tr>";
      }

      theTable += "</table>";
      document.getElementById("mytable").innerHTML = theTable;
    }*/
	
	function redrawingtable(array) {
      var theTable = "<table>"
      theTable += "<th>";
      theTable += "<td><b>" + array[0].name + "</b></td>";
      theTable += "<td><b>DUE DATE</b></td>";
      theTable += "<td></td>";
      theTable += "</th>";

      for (var i = 1; i < array.length; i++) {

        theTable += "<tr onmouseover='$(\"#button_" + idbutton + "\").parent(\".dropdown\").show();' onmouseout='$(\"#button_" + idbutton + "\").parent(\".dropdown\").hide();' >";
        theTable += "<td><input type=\"checkbox\" class=\"basic-kpi-row\"/></td>";

        if (array[i].status == 'c' && array[0].name === allTasksArray[0].name) {

          theTable += "<td data-toggle=\"tooltip\" data-html=\"true\" title=\"" + array[i].desciption + "\"><strike> " + array[i].name + "</strike></td>";

        } else {
          // window.alert(array[i].desciption);
          theTable += "<td data-toggle=\"tooltip\" data-html=\"true\" title=\"" + array[i].desciption + "\">" + array[i].name + "</td>";
        }
        theTable += "<td>" + array[i].date + "</td>";


if(array[i].status=='c' && array[0].name === allTasksArray[0].name){
theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
 "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"a\" class=\"clickMe\" onmousedown=\"list(id)\" ><a href=\"#\">Archieve</a></li><li id=\"b\" class=\"clickMe\"   data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li></ul></div></td>";


}


else{

        if (array[0].name == allTasksArray[0].name || array[0].name === inprogressArray[0].name) {

          theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
            "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"a\" class=\"clickMe\" onmousedown=\"list(id)\" ><a href=\"#\">Archieve</a></li><li id=\"b\" class=\"clickMe\"   data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li><li id=\"d\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Mark as Done</a></li></ul></div></td>";


        }
       else if (array[0].name == completedArray[0].name) {

          theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
            "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"a\" class=\"clickMe\" onmousedown=\"list(id)\" ><a href=\"#\">Archieve</a></li><li id=\"b\" class=\"clickMe\"   data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\" onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li></ul></div></td>";


        }

       else if (array[0].name == archivedArray[0].name) {

          theTable += "<td> <div class=\"dropdown\"><button float=\"right\" class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"button_" + idbutton +
            "\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" onclick = \"getid(this.id)\" >Options <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"><li id=\"b\" class=\"clickMe\"  data-toggle=\"modal\" data-target=\"#myModal\" onmousedown=\"list(id)\" ><a href=\"#\">Edit</a></li><li id=\"c\" class=\"clickMe\"  onmousedown=\"list(id)\"><a href=\"#\">Delete</a></li></ul></div></td>";
        }
      }
        idbutton++;
        theTable += "</tr>";
      }

      theTable += "</table>";
      document.getElementById("mytable").innerHTML = theTable;
    }
	
	
	
	   function fillingArrays(id) {

      if (id == 'demo2' && edit == false) {
        var element = document.getElementById("inputEmail").value;
        document.getElementById("inputEmail").value = "";
        var date = document.getElementById("datepicker").value;
        document.getElementById("datepicker").value = "";
        var desciption = document.getElementById("textArea").value;

        document.getElementById("textArea").value = "";
        
		if(element==""){
		window.alert("You must enter a task with a name");	
			if(state=="allTasks"){
				redrawingtable(allTasksArray);
			}
		     else if(state=="inProgress"){
				 redrawingtable(inprogressArray);
			 }
		      else if (state=="completed"){
				  redrawingtable(completedArray);
			  }
			  else if(state=="archived"){
				  redrawingtable(archivedArray);
			  }
		
		}
       else {
          var x = new task(idtask, element, date, desciption);
          x.status = 'p';

          idtask++;

          allTasksArray.push(x);
          //console.log(idtask);
          counterAlltasks++;
          document.getElementById("no1").innerHTML = counterAlltasks;
          inprogressArray.push(x);
          counterInprogress++;
          document.getElementById("no2").innerHTML = counterInprogress;

        
       state="allTasks";
        redrawingtable(allTasksArray);
        edit = false;
}


      } else if (id == 'demo2' && edit == true) {

        var element = document.getElementById("inputEmail").value;
        document.getElementById("inputEmail").value = "";
        var date = document.getElementById("datepicker").value;
        document.getElementById("datepicker").value = "";
        var desciption = document.getElementById("textArea").value;
        document.getElementById("textArea").value = "";

		if(element==""){
		window.alert("You can't unname a task");	
			if(state=="allTasks"){
				redrawingtable(allTasksArray);
			}
		     else if(state=="inProgress"){
				 redrawingtable(inprogressArray);
			 }
		      else if (state=="completed"){
				  redrawingtable(completedArray);
			  }
			  else if(state=="archived"){
				  redrawingtable(archivedArray);
			  }
		
		}else{
		
		
		
		
        if (state == "allTasks") {

        if (element != "") {
          var y = allTasksArray[rowindex].id;
         var u=allTasksArray[rowindex].status;
          for (var i = 1; i < inprogressArray.length; i++) {
            if (allTasksArray[rowindex].id == inprogressArray[i].id) {
              inprogressArray[i] = new task(y, element, date, desciption);
              inprogressArray[i].status= u;
              break;
            }
          }


          for (var i = 1; i < completedArray.length; i++) {
            if (allTasksArray[rowindex].id == completedArray[i].id) {
              completedArray[i] = new task(y, element, date, desciption);
              completedArray[i].status=u;
              break;
            }
          }

          allTasksArray[rowindex] = new task(y, element, date, desciption);
          allTasksArray[rowindex].status=u;
        }
          redrawingtable(allTasksArray); ///3la 7sb kan wa2f fen
        } 
        else if (state == "inProgress") {
          if (element != "") {
          var y = inprogressArray[rowindex].id;
          var u=inprogressArray[rowindex].status;
          for (var i = 1; i < allTasksArray.length; i++) {
            if (inprogressArray[rowindex].id == allTasksArray[i].id) {
              allTasksArray[i] = new task(y, element, date, desciption);
              allTasksArray[i].status=u;
              break;
            }
          }
          inprogressArray[rowindex] = new task(y, element, date, desciption);
          inprogressArray[rowindex].status=u;
        }
          redrawingtable(inprogressArray);
        }
         else if (state == "completed") {
if (element != "") {
          var y = completedArray[rowindex].id;
          var u=completedArray[rowindex].status;
          for (var i = 1; i < allTasksArray.length; i++) {
            if (completedArray[rowindex].id == allTasksArray[i].id) {
              allTasksArray[i] = new task(y, element, date, desciption);
              allTasksArray[i].status = 'c';
              break;
            }
          }
          completedArray[rowindex] = new task(y, element, date, desciption);
          completedArray[rowindex].status='c';
        }
          redrawingtable(completedArray);

        }
         else if (state == "archived") {
          if (element != "") {
         var y= archivedArray[rowindex].id;
         var u=archivedArray[rowindex].status;
          archivedArray[rowindex] = new task(y, element, date, desciption);
          archivedArray[rowindex].status=u;
        }
          redrawingtable(archivedArray);
        }
		}
        edit = false;

      } 
      else if (id == 'demo3') {
        document.getElementById("inputEmail").value = "";
        document.getElementById("datepicker").value = "";
        document.getElementById("textArea").value = "";

      }

    }
	
	function list(id) {

      if (id == 'a') { //archive
        if (state == "allTasks") { // from all tasks to archive
          
          for (var i = 1; i < completedArray.length; i++) {
            if (allTasksArray[rowindex].id == completedArray[i].id) {
              completedArray.splice(i, 1);
              counterCompleted--;
              document.getElementById("no3").innerHTML = counterCompleted;
              break;
            }
          }
          for (var i = 1; i < inprogressArray.length; i++) {

            if (allTasksArray[rowindex].id== inprogressArray[i].id) {
	
              inprogressArray.splice(i, 1);
              counterInprogress--;
              document.getElementById("no2").innerHTML = counterInprogress;
              break;
            }
          }

          allTasksArray[rowindex].status = 'a';
          var tmp = allTasksArray[rowindex];
          archivedArray.push(tmp);
          counterArchived++;
          document.getElementById("no4").innerHTML = counterArchived;
          allTasksArray.splice(rowindex, 1);
          counterAlltasks--;
          document.getElementById("no1").innerHTML = counterAlltasks;
           redrawingtable(allTasksArray);
        } 
        else if (state == "inProgress") { //from inprogress to archive
          
          for (var i = 1; i < allTasksArray.length; i++) {
            if (inprogressArray[rowindex].id == allTasksArray[i].id) {
              allTasksArray.splice(i, 1);
              counterAlltasks--;
              document.getElementById("no1").innerHTML = counterAlltasks;
              break;
            }
          }
          inprogressArray[rowindex].status = 'a';
          archivedArray.push(inprogressArray[rowindex]);
          counterArchived++;
          document.getElementById("no4").innerHTML = counterArchived;
          inprogressArray.splice(rowindex, 1);
          counterInprogress--;
          document.getElementById("no2").innerHTML = counterInprogress;
          redrawingtable(inprogressArray);


        } 
        else if (state == "completed") { // completed to archive
          
          for (var i = 1; i < allTasksArray.length; i++) {
            if (completedArray[rowindex].id == allTasksArray[i].id) {
              allTasksArray.splice(i, 1);
              counterAlltasks--;
              document.getElementById("no1").innerHTML = counterAlltasks;
              break;
            }
          }
          completedArray[rowindex].status = 'a';
          archivedArray.push(completedArray[rowindex]);
          counterArchived++;
          document.getElementById("no4").innerHTML = counterArchived;
          completedArray.splice(rowindex, 1);
          counterCompleted--;
          document.getElementById("no3").innerHTML = counterCompleted;
          redrawingtable(completedArray);

        }

      } else if (id == 'b') { //edit

        if (state == "allTasks") { //edit all tasks
          edit = true;
          var element = allTasksArray[rowindex].name;
          var des = allTasksArray[rowindex].desciption;
          var date = allTasksArray[rowindex].date;

          document.getElementById("inputEmail").value = element;
          document.getElementById("datepicker").value = date;
          document.getElementById("textArea").value = des;


        } else if (state == "inProgress") { //edit  in progress

          edit = true;
          var element = inprogressArray[rowindex].name;
          var des = inprogressArray[rowindex].desciption;
          var date = inprogressArray[rowindex].date;

          document.getElementById("inputEmail").value = element;
          document.getElementById("datepicker").value = date;
          document.getElementById("textArea").value = des;


        } else if (state == "completed") { //edit completed

          edit = true;
          var element = completedArray[rowindex].name;
          var des = completedArray[rowindex].desciption;
          var date = completedArray[rowindex].date;

          document.getElementById("inputEmail").value = element;
          document.getElementById("datepicker").value = date;
          document.getElementById("textArea").value = des;


        } else if (state == "archived") { //edit archived

          edit = true;
          var element = archivedArray[rowindex].name;
          var des = archivedArray[rowindex].desciption;
          var date = archivedArray[rowindex].date;

          document.getElementById("inputEmail").value = element;
          document.getElementById("datepicker").value = date;
          document.getElementById("textArea").value = des;


        }


      } else if (id == 'c') { //delete
        if (state == "allTasks") { //delete from all tasks
          

          var result = confirm("Want to delete?");
          if (result) {

            for (var i = 1; i < completedArray.length; i++) {
              if (allTasksArray[rowindex].id == completedArray[i].id) {
                completedArray.splice(i, 1);
                counterCompleted--;
                document.getElementById("no3").innerHTML = counterCompleted;
                break;
              }
            }
            for (var i = 1; i < inprogressArray.length; i++) {
              if (allTasksArray[rowindex].id == inprogressArray[i].id) {
                inprogressArray.splice(i, 1);
                counterInprogress--;
                document.getElementById("no2").innerHTML = counterInprogress;
                break;
              }
            }
            allTasksArray.splice(rowindex, 1);
            counterAlltasks--;
            document.getElementById("no1").innerHTML = counterAlltasks;

          }
          redrawingtable(allTasksArray);
        } else if (state == "inProgress") { // delete from in progress
          var result = confirm("Want to delete?");
          if (result) {

            for (var i = 1; i < allTasksArray.length; i++) {
              if (inprogressArray[rowindex].id == allTasksArray[i].id) {
                allTasksArray.splice(i, 1);
                counterAlltasks--;
                document.getElementById("no1").innerHTML = counterAlltasks;
                break;
              }
            }
            inprogressArray.splice(rowindex, 1);
            counterInprogress--;
            document.getElementById("no2").innerHTML = counterInprogress;
          }
          redrawingtable(inprogressArray);

        } else if (state == "completed") { // delete from completed
          var result = confirm("Want to delete?");
          if (result) {

            for (var i = 1; i < allTasksArray.length; i++) {
              if (completedArray[rowindex].id == allTasksArray[i].id) {
                allTasksArray.splice(i, 1);
                counterAlltasks--;
                document.getElementById("no1").innerHTML = counterAlltasks;
                break;
              }
            }
            completedArray.splice(rowindex, 1);
            counterCompleted--;
            document.getElementById("no3").innerHTML = counterCompleted;

          }
          redrawingtable(completedArray);

        } else if (state == "archived") {
          var result = confirm("Want to delete?");
          if (result) {

            archivedArray.splice(rowindex, 1);
            counterArchived--;
            document.getElementById("no4").innerHTML = counterArchived;
          }
          redrawingtable(archivedArray);
        }

      }

      
      else if (id == 'd') { //completed
        if (state == "allTasks") { // all tasks to completed
          var flag = 0;
          for (var j = 0; j < completedArray.length; j++) {
            if (allTasksArray[rowindex].id == completedArray[j].id) {
              flag = 1;
              break;
            }
          }


          if (flag == 0) {
            
            for (var i = 1; i < inprogressArray.length; i++) {
              if (allTasksArray[rowindex].id == inprogressArray[i].id) {
                inprogressArray.splice(i, 1);
                counterInprogress--;
                document.getElementById("no2").innerHTML = counterInprogress;
                break;
              }
            }
             allTasksArray[rowindex].status = 'c';
            completedArray.push(allTasksArray[rowindex]);
            counterCompleted++;
            document.getElementById("no3").innerHTML = counterCompleted;
         
            redrawingtable(allTasksArray);
          }
        } else if (state == "inProgress") { //in progress to completed
          var flag = 0;

          for (var j = 0; j < completedArray.length; j++) {
            if (inprogressArray[rowindex].id == completedArray[j].id) {
              flag = 1;
              break;
            }
          }

          if (flag == 0) {

            
            for (var i = 1; i < allTasksArray.length; i++) {
              if (inprogressArray[rowindex].id == allTasksArray[i].id) {
                allTasksArray[i].status = 'c';
                break;
              }
            }
            inprogressArray[rowindex].status = 'c';
            completedArray.push(inprogressArray[rowindex]);
            counterCompleted++;
            document.getElementById("no3").innerHTML = counterCompleted;
           
            inprogressArray.splice(rowindex, 1);
            counterInprogress--;
            document.getElementById("no2").innerHTML = counterInprogress;
            redrawingtable(inprogressArray);
          }
        }
      }

    }

    /////////////////////////////////////////////////////

    function start(id) {

      if (id == 'allTasks') {
        state = "allTasks";
        //$("#add").show();
        redrawingtable(allTasksArray);

      } else if (id == 'inProgress') {

       // $("#add").hide();
        state = "inProgress";
        redrawingtable(inprogressArray);

      } else if (id == 'completed') {
        state = "completed";
       // $("#add").hide();
        redrawingtable(completedArray);
      } else if (id == 'archived') {
        //$("#add").hide();
        state = "archived";

        redrawingtable(archivedArray);
      }

    }


	function sort(id) { 

if (id == "byname") {

if(state=="allTasks"){ //fdely lw strikethrough
  allTasksArray.splice(0,1);
 allTasksArray.sort(function(a, b){

  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;

})
     var x = new task(0, "All TASKS", "","");
allTasksArray.unshift(x);
redrawingtable(allTasksArray);

}

else if(state=="inProgress"){

  inprogressArray.splice(0,1);
 inprogressArray.sort(function(a, b){

  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;

})
 var x = new task(0, " IN PROGRESS", "","");
inprogressArray.unshift(x);
redrawingtable(inprogressArray);

}
else if(state=="completed"){
  completedArray.splice(0,1);
completedArray.sort(function(a, b){

  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;

})
  var x = new task(0, " COMPLETED", "","");
completedArray.unshift(x);
redrawingtable(completedArray);

}
else if(state=="archived"){
  archivedArray.splice(0,1);
archivedArray.sort(function(a, b){

  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;

})
 var x = new task(0, " ARCHIVED", "","");
archivedArray.unshift(x);
redrawingtable(archivedArray);

}
  
      } 
      else if (id == "bydate") {
    if(state=="allTasks"){

  for(var i=allTasksArray.length-1;i>0;i--){

     if(allTasksArray[i].date==""){
         var x=allTasksArray[i];
         allTasksArray.splice(i,1);
         allTasksArray.push(x);
  }
  }
              allTasksArray.sort(function(a,b){
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c-d;
                });
           for(var i=allTasksArray.length-1;i>0;i--){
             if(allTasksArray[i].status=='c'){
                var x=allTasksArray[i];
                 allTasksArray.splice(i,1);
                allTasksArray.push(x);
                     }
                  }
              redrawingtable(allTasksArray);
            }
           else if(state=="inProgress"){
            for(var i=inprogressArray.length-1;i>0;i--){
          if(inprogressArray[i].date==""){
               var x=inprogressArray[i];
               inprogressArray.splice(i,1);
               inprogressArray.push(x);
             
  }
  }
             inprogressArray.sort(function(a,b){
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c-d;
                });

           for(var i=inprogressArray.length-1;i>0;i--){
             if(inprogressArray[i].status=='c'){
                var x=inprogressArray[i];
                 inprogressArray.splice(i,1);
                inprogressArray.push(x);
                     }

                     }
              redrawingtable(inprogressArray);
            }
        else  if(state=="completed"){

          for(var i=completedArray.length-1;i>0;i--){
              if(completedArray[i].date==""){
              var x=completedArray[i];
               completedArray.splice(i,1);
                  completedArray.push(x);
                  
  }

  }
             completedArray.sort(function(a,b){
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c-d;
                });
              redrawingtable(completedArray);
            }
       else if(state=="archived"){
       for(var i=archivedArray.length-1;i>0;i--){
           if(archivedArray[i].date==""){
           var x=archivedArray[i];
           archivedArray.splice(i,1);
           archivedArray.push(x);
  }

  }
              archivedArray.sort(function(a,b){
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c-d;
                });
              redrawingtable(archivedArray);
            }
 
      }

    }
	
    function getid(obj) {
      var indexf = $('#' + obj).closest("tr").index();

      rowindex = indexf;
    }
    $(function() {
      $("#datepicker").datepicker({
        minDate: 0,

      });
    });
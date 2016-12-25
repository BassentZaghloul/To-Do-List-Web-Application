var still = true;
 
 function copydelete(){
	  if (state == "allTasks") { //delete from all tasks
          

         

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

          
           redrawingtable(allTasksArray);
        } else if (state == "inProgress") { // delete from in progress
         

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
          
          redrawingtable(inprogressArray);

        } else if (state == "completed") { // delete from completed
         

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

          
          redrawingtable(completedArray);

        } else if (state == "archived") {
         

            archivedArray.splice(rowindex, 1);
            counterArchived--;
            document.getElementById("no4").innerHTML = counterArchived;
          
          redrawingtable(archivedArray);
        }

      }
	 
	 
	 
 







    function changebutton() {
      if (still) {
        document.getElementById("add").style.display = 'none';
        document.getElementById("delete").style.display = 'block';
      }


    }

    function dontchange() {
      document.getElementById("add").style.display = 'block';
      document.getElementById("delete").style.display = 'none';

    }



    var tempArray = [];
    $('#mytable').click(function() {
      var pass = false;
      //window.alert("toz fekko");
      tempArray = [];
      $('tr').each(function() {
        if ($(this).find('.basic-kpi-row').prop('checked')) {
          //  doEnableButton = true;
          //window.alert($(this).index());
          rowindex = $(this).index();
          tempArray.push(rowindex);
          pass = true;

        }


      });

      deletebuttonarray = [];
      deletebuttonarray = tempArray.slice();
      if (pass) {
        changebutton();
        
      } else {
        dontchange();
      }

    });

    function godelete() {
      var result = confirm("Want to delete?");
      if (result) {
     
        deletebuttonarray.sort();
        deletebuttonarray.reverse();

        for (var i = 0; i < deletebuttonarray.length; i++) {
          rowindex = (deletebuttonarray[i]);
          copydelete();

        }
        dontchange();

      } else {

        deletebuttonarray = [];
        dontchange();
        $('tr').each(function() {
          if ($(this).find('.basic-kpi-row').prop('checked')) {
            $(this).find('.basic-kpi-row').attr('checked', false);

          }


        });

      }
    }